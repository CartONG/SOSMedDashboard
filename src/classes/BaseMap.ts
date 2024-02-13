/* eslint-disable no-return-assign */
import { OpsData } from "./OpsData"
import { MapboxGLButtonControl } from "./MapboxGLButtonControl"
import { GeoJSONSource, GeoJSONSourceRaw, LngLatBounds, LngLatLike, Map, MapMouseEvent, Marker, NavigationControl, Popup } from "mapbox-gl"
import { showPopUp } from "./PopUpAndStats"
import { FeatureCollection, Point } from "geojson"
import { State } from "@/classes/State"
import "mapbox-gl/dist/mapbox-gl.css"
import { BaseMapPickerControl } from "./BaseMapPickerControl"
import { opsDataToGeoJSON } from "@/utils/arrayToGeojson"
import { ref } from "vue"

export interface SingleBasemap {
  id: number;
  name: string;
  img: string;
  style: string;
}

export const BASEMAPS: Array<SingleBasemap> = [{
  id: 0,
  name: "SOS Mediterranee",
  img: "/basemaps-icons/sosmed.png",
  style: "mapbox://styles/sosmediterranee/ckkdvswwr0ol117t7d91p7wac"
},
{
  id: 1,
  name: "Satellite Imagery",
  img: "/basemaps-icons/satellite.png",
  style: "mapbox://styles/mapbox/satellite-v9"
},
{
  id: 2,
  name: "Dark",
  img: "/basemaps-icons/dark.png",
  style: "mapbox://styles/mapbox/dark-v10"
}]

// Global variable used for setting on/off map event like click on operations layer
// Explanation here: https://stackoverflow.com/questions/63036623/how-to-disable-an-event-listener-in-mapbox
let map: Map
const popup = new Popup({ closeOnClick: false, closeButton: false })

export class BaseMap {
  private operationsData!: OpsData[]
  private filteredOperationsData!: OpsData[]

  private map!: Map
  private defaultExtent!: LngLatBounds
  private harbors!: FeatureCollection
  private sar!: GeoJSONSourceRaw
  private sarCenters!: GeoJSONSourceRaw
  private iconsLoaded = ref(false)
  private filtersState!: State["switch"]
  private sourcesLoaded = false

  currentBasemap = 0

  /// /////// PUBLIC METHODS TO SET/UPDATE DATA AND MOUNT MAP \\\\\\\
  public setData (harbors: FeatureCollection, ops: OpsData[], sar: GeoJSONSourceRaw, sarCenters: GeoJSONSourceRaw) {
    this.harbors = harbors
    this.operationsData = ops
    this.filteredOperationsData = ops
    this.sar = sar
    this.sarCenters = sarCenters
  }

  public initMap (): void {
    this.map = new Map({
      accessToken: "pk.eyJ1Ijoid2VzbGV5YmFuZmllbGQiLCJhIjoiY2pmMDRwb202MGlzNDJ3bm44cHA3YXZiNCJ9.b2yOf2vbWnWiV7mlsFAywg",
      container: "mapContainer",
      style: BASEMAPS[this.currentBasemap].style,
      center: [9, 35],
      zoom: 4
    })
    map = this.map
    this.defaultExtent = this.map.getBounds()
    const nav = new NavigationControl({
      showCompass: false,
      showZoom: true
    })
    this.map.addControl(nav)
    const viewResetter = new MapboxGLButtonControl("mapbox-gl-change_layer icon icon-view", "Reset view", this.resetView.bind(this), "")
    this.map.addControl(viewResetter, "top-right")
    const baseMapPickerControl = new BaseMapPickerControl()
    this.map.addControl(baseMapPickerControl, "top-right")
    this.map.once("load", () => {
      this.addIcons()
    })
  }

  public updateFiltersState (state: State["switch"]) {
    this.filtersState = state
    if (this.sourcesLoaded) this.updateLayers()
  }

  public updateOperationsData (opsData: OpsData[]) {
    this.operationsData = opsData
    this.filterOperationsData()
  }

  public setCurrentBasemap (index: number): void {
    this.currentBasemap = index
    this.map.setStyle(BASEMAPS[this.currentBasemap].style)
    this.map.once("load", () => {
      this.setSources()
    })
  }

  /// /////// PRIVATE METHODS TO SET IMAGES AND SOURCES BEFORE ADDING LAYERS \\\\\\\
  private addIcons () {
    if (!this.map.hasImage("harbor")) {
      this.map.loadImage(`${process.env.BASE_URL}/basemaps-icons/harbor.png`, (error, image) => {
        if (error) console.log(error)
        this.map.addImage("harbor", image as ImageBitmap)
        this.setSources()
      })
    } else {
      this.setSources()
    }
  }

  private setSources () {
    // Add Operations source
    if (this.map.getLayer("Operation")) this.map.removeLayer("Operation")
    if (this.map.getSource("operations")) this.map.removeSource("operations")
    this.map.addSource("operations", {
      type: "geojson",
      data: opsDataToGeoJSON(this.filteredOperationsData.filter(operation => !isNaN(operation.longitude) && !isNaN(operation.latitude)))
    })
    // Add Sar sources
    if (this.map.getLayer("sar")) this.map.removeLayer("sar")
    if (this.map.getSource("sar")) this.map.removeSource("sar")
    if (this.map.getLayer("sarCenters")) this.map.removeLayer("sarCenters")
    if (this.map.getSource("sarCenters")) this.map.removeSource("sarCenters")
    this.map.addSource("sar", this.sar)
    this.map.addSource("sarCenters", this.sarCenters)
    // Add Harbors sources
    this.map.addSource("harbors", {
      type: "geojson",
      data: this.harbors
    })
    this.sourcesLoaded = true
    this.updateLayers()
  }

  /// /////// PRIVATE METHODS TO ADD EACH TYPE OF LAYER AND THEIR FUNCTIONNALITIES \\\\\\\
  private addOperationLayer () {
    this.map.addLayer({
      id: "Operation",
      type: "circle",
      source: "operations",
      paint: {
        "circle-radius": ["step", ["zoom"], 3, 6, 5, 7.5, 8, 9, 10],
        "circle-color": [
          "match",
          ["get", "typeOps"],
          "Rescue",
          "#F03E1B",
          "Transfer",
          "#9CA3AF",
          /* other */ "#000"
        ]
      }
    })
    this.map.on("mouseenter", "Operation", this.setMapCursorPointer)
    this.map.on("mouseleave", "Operation", this.removeMapCursorPointer)
    this.map.on("click", "Operation", this.catchClickOnOperation)
  }

  private setMapCursorPointer (): void {
    map.getCanvas().style.cursor = "pointer"
  }

  private removeMapCursorPointer (): void {
    map.getCanvas().style.cursor = ""
  }

  private catchClickOnOperation (e: MapMouseEvent): void {
    showPopUp(map.queryRenderedFeatures(e.point)[0].properties as OpsData)
  }

  private addHarborsLayer () {
    this.map.addLayer({
      id: "harbors",
      type: "symbol",
      source: "harbors",
      layout: {
        "icon-image": "harbor",
        "icon-size": 0.35,
        "icon-allow-overlap": true
      }
    })
    this.map.on("mouseenter", "harbors", this.setHarborsPopUp)
    this.map.on("mouseleave", "harbors", this.removeHarborsPopUp)
  }

  private setHarborsPopUp (e: MapMouseEvent) {
    const features = map.queryRenderedFeatures(e.point, { layers: ["harbors"] })
    popup
      .setLngLat((features[0].geometry as Point).coordinates as LngLatLike)
      .setHTML(`<h1>${features[0].properties?.name}</h1>`).addTo(map)
  }

  private removeHarborsPopUp () {
    popup.remove()
  }

  private addSarLayers () {
    this.map.addLayer({ id: "sar", type: "line", source: "sar", layout: {}, paint: { "line-color": "#999999", "line-width": 1, "line-dasharray": [1, 2] } })
    this.map.addLayer({
      id: "sar-name",
      type: "symbol",
      source: "sarCenters",
      layout: {
        "symbol-placement": "point",
        "text-font": ["Open Sans Regular"],
        "text-field": "{Nom}",
        "text-size": 10
      }
    })
  }

  /// /////// PRIVATE METHODS TO UPDATE LAYERS VISIBILITY AND SOURCES CONTENT \\\\\\\
  private updateLayers () {
    if (this.filtersState.harbor) {
      if (!this.map.getLayer("harbors")) this.addHarborsLayer()
    } else {
      if (this.map.getLayer("harbors")) this.map.removeLayer("harbors")
      this.map.off("mouseenter", "harbors", this.setHarborsPopUp)
      this.map.off("mouseleave", "harbors", this.removeHarborsPopUp)
    }
    if (this.filtersState.rescue || this.filtersState.transfer) {
      if (!this.map.getLayer("Operation")) this.addOperationLayer()
      this.filterOperationsData()
    } else {
      if (this.map.getLayer("Operation")) this.map.removeLayer("Operation")
      this.map.off("mouseenter", "Operation", this.setMapCursorPointer)
      this.map.off("mouseleave", "Operation", this.removeMapCursorPointer)
      this.map.off("click", "Operation", this.catchClickOnOperation)
    }
    if (this.filtersState.srr) {
      if (this.map.getLayer("sar")) this.map.removeLayer("sar")
      if (this.map.getLayer("sar-name")) this.map.removeLayer("sar-name")
      this.addSarLayers()
    } else {
      if (this.map.getLayer("sar")) this.map.removeLayer("sar")
      if (this.map.getLayer("sar-name")) this.map.removeLayer("sar-name")
    }
  }

  private filterOperationsData () {
    this.filteredOperationsData = [...this.operationsData]
    if (!this.filtersState.rescue) {
      this.filteredOperationsData = this.operationsData.filter(x => x.typeOps !== "Rescue")
    }
    if (!this.filtersState.transfer) {
      this.filteredOperationsData = this.operationsData.filter(x => x.typeOps !== "Transfer")
    }
    (this.map.getSource("operations") as GeoJSONSource).setData(opsDataToGeoJSON(this.filteredOperationsData))
  }

  resetView (): void {
    this.map.fitBounds(this.defaultExtent)
  }

  destroy (): void {
    this.map.remove()
  }
}
