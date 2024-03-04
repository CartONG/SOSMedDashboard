/* eslint-disable no-return-assign */
import { OpsData } from "./data/OpsData"
import { MapboxGLButtonControl } from "./MapboxGLButtonControl"
import { GeoJSONSource, LngLatBounds, LngLatLike, Map, MapMouseEvent, NavigationControl, Popup } from "mapbox-gl"
// import { showOperationPopUp } from "./PopUpAndStats"
import { FeatureCollection, Point } from "geojson"
import "mapbox-gl/dist/mapbox-gl.css"
import { BaseMapPickerControl } from "./BaseMapPickerControl"
import { opsDataToGeoJSON } from "@/utils/arrayToGeojson"
import { ref } from "vue"
import { Store } from "@/Store"
import { store } from "@/main"
import { DataState, PopUpType } from "./State"
import { loadImage } from "@/utils/loadImage"
import { OtherData, OtherDataTypes } from "./data/OtherData"

export interface SingleBasemap {
  id: number;
  name: string;
  img: string;
  style: string;
}

export const BASEMAPS: Array<SingleBasemap> = [{
  id: 0,
  name: "SOS Mediterranee",
  img: "./basemaps-icons/sosmed.png",
  style: "mapbox://styles/sosmediterranee/ckkdvswwr0ol117t7d91p7wac"
},
{
  id: 1,
  name: "Satellite Imagery",
  img: "./basemaps-icons/satellite.png",
  style: "mapbox://styles/mapbox/satellite-v9"
},
{
  id: 2,
  name: "Dark",
  img: "./basemaps-icons/dark.png",
  style: "mapbox://styles/mapbox/dark-v10"
}]

// Global variable used for setting on/off map event like click on operations layer
// Explanation here: https://stackoverflow.com/questions/63036623/how-to-disable-an-event-listener-in-mapbox
let map: Map
const popup = new Popup({ closeOnClick: false, closeButton: false })

export class BaseMap {
  private map!: Map
  private defaultExtent!: LngLatBounds
  private operationsData!: OpsData[]
  private filteredOperationsData!: OpsData[]
  private incidents!: FeatureCollection
  private deaths!: FeatureCollection
  private shipwrecks!: FeatureCollection
  private harbors!: FeatureCollection
  private sar!: FeatureCollection
  private sarCenters!: FeatureCollection
  private iconsLoaded = ref(false)
  private filtersState!: Store["appState"]["switch"]
  private sourcesLoaded = false

  currentBasemap = 0

  /// /////// PUBLIC METHODS TO SET/UPDATE DATA AND MOUNT MAP \\\\\\\
  public setData (harbors: FeatureCollection, ops: OpsData[], otherData: DataState["otherData"], sar: FeatureCollection, sarCenters: FeatureCollection) {
    this.harbors = harbors
    this.incidents = otherData.incidents
    this.deaths = otherData.deaths
    this.shipwrecks = otherData.shipwrecks
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
      this.map.on("click", ["Operation", "Incidents", "Deaths", "Shipwrecks"], this.clickOnDataLayer)
      this.map.on("mouseenter", ["Operation", "Incidents", "Deaths", "Shipwrecks"], this.setMapCursorPointer)
      this.map.on("mouseleave", ["Operation", "Incidents", "Deaths", "Shipwrecks"], this.removeMapCursorPointer)
    })
  }

  public updateFiltersState (state: Store["appState"]["switch"]) {
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
  private async addIcons () {
    const harbor: ImageBitmap = await loadImage(this.map, "./basemaps-icons/harbor.png")
    this.map.addImage("harbor", harbor as ImageBitmap)
    const incident: ImageBitmap = await loadImage(this.map, "./basemaps-icons/incident.png")
    this.map.addImage("incident", incident as ImageBitmap)
    const shipwreck: ImageBitmap = await loadImage(this.map, "./basemaps-icons/shipwreck.png")
    this.map.addImage("shipwreck", shipwreck as ImageBitmap)
    this.setSources()
  }

  private setSources () {
    // Add Operations source
    if (this.map.getLayer("Operation")) this.map.removeLayer("Operation")
    if (this.map.getSource("operations")) this.map.removeSource("operations")
    this.map.addSource("operations", {
      type: "geojson",
      data: opsDataToGeoJSON(this.filteredOperationsData.filter(operation => !isNaN(operation.longitude) && !isNaN(operation.latitude)))
    })
    // Add Other data sources
    if (this.map.getLayer("Incidents")) this.map.removeLayer("Incidents")
    if (this.map.getSource("Incidents")) this.map.removeSource("Incidents")
    this.map.addSource("Incidents", {
      type: "geojson",
      data: this.incidents
    })
    if (this.map.getLayer("Deaths")) this.map.removeLayer("Deaths")
    if (this.map.getSource("Deaths")) this.map.removeSource("Deaths")
    this.map.addSource("Deaths", {
      type: "geojson",
      data: this.deaths
    })
    if (this.map.getLayer("Shipwrecks")) this.map.removeLayer("Shipwrecks")
    if (this.map.getSource("Shipwrecks")) this.map.removeSource("Shipwrecks")
    this.map.addSource("Shipwrecks", {
      type: "geojson",
      data: this.shipwrecks
    })
    // Add Sar sources
    if (this.map.getLayer("sar")) this.map.removeLayer("sar")
    if (this.map.getSource("sar")) this.map.removeSource("sar")
    if (this.map.getLayer("sarCenters")) this.map.removeLayer("sarCenters")
    if (this.map.getSource("sarCenters")) this.map.removeSource("sarCenters")
    this.map.addSource("sar", {
      type: "geojson",
      data: this.sar
    })
    this.map.addSource("sarCenters", {
      type: "geojson",
      data: this.sarCenters
    })
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
        "circle-radius": ["step", ["zoom"], 4, 6, 6, 7.5, 8, 9, 10],
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
  }

  private setMapCursorPointer (): void {
    map.getCanvas().style.cursor = "pointer"
  }

  private removeMapCursorPointer (): void {
    map.getCanvas().style.cursor = ""
  }

  private addIncidentsLayer () {
    this.map.addLayer({
      id: "Incidents",
      type: "symbol",
      source: "Incidents",
      layout: {
        "icon-image": "incident",
        "icon-size": 0.5,
        "icon-allow-overlap": true
      }
    })
  }

  private addDeathsLayer () {
    this.map.addLayer({
      id: "Deaths",
      type: "circle",
      source: "Deaths",
      paint: {
        "circle-radius": ["step", ["zoom"], 6, 6, 8, 7.5, 10, 9, 12],
        "circle-color": "#000000"
      }
    })
    this.map.addLayer({
      id: "DeathsCount",
      type: "symbol",
      source: "Deaths",
      paint: {
        "text-color": "white"
      },
      layout: {
        "text-field": ["get", "deathNumber"],
        // "text-size": ["step", ["zoom"], 0, 13, 15],
        "text-size": 12,
        "text-justify": "auto",
        "text-font": ["Open Sans Semibold"]
      }
    })
  }

  private addShipwrecksLayer () {
    this.map.addLayer({
      id: "Shipwrecks",
      type: "symbol",
      source: "Shipwrecks",
      layout: {
        "icon-image": "shipwreck",
        "icon-size": 0.5,
        "icon-allow-overlap": true
      }
    })
  }

  private clickOnDataLayer (e: MapMouseEvent) {
    const data = map.queryRenderedFeatures(e.point)[0].properties
    data!.imageSrc = data!.imageSrc ? data!.imageSrc.split(";").filter((x: any) => x !== "") : ""
    data!.videoSrc = data!.videoSrc ? data!.videoSrc.split(";").filter((x: any) => x !== "") : ""
    let type = PopUpType.OPS
    if (data?.type && data.type === OtherDataTypes.INCIDENT) type = PopUpType.INCIDENT
    if (data?.type && data.type === OtherDataTypes.DEATH) type = PopUpType.DEAD
    if (data?.type && data.type === OtherDataTypes.SHIPWRECK) type = PopUpType.SHIPWRECK
    store.setPopUpData(data as OtherData, type)
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
    this.map.addLayer({ id: "sar", type: "line", source: "sar", layout: {}, paint: { "line-color": "#1A2747", "line-width": 2, "line-dasharray": [3, 3] } })
    this.map.addLayer({
      id: "sar-name",
      type: "symbol",
      source: "sarCenters",
      paint: {
        "text-color": "#1A2747"
      },
      layout: {
        "symbol-placement": "point",
        "text-font": ["Open Sans Semibold"],
        "text-field": "{Nom}",
        "text-size": 13
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
    }
    if (this.filtersState.incident) {
      if (!this.map.getLayer("Incidents")) this.addIncidentsLayer()
    } else {
      if (this.map.getLayer("Incidents")) this.map.removeLayer("Incidents")
    }
    if (this.filtersState.death) {
      if (!this.map.getLayer("Deaths")) this.addDeathsLayer()
    } else {
      if (this.map.getLayer("DeathsCount")) this.map.removeLayer("DeathsCount")
      if (this.map.getLayer("Deaths")) this.map.removeLayer("Deaths")
    }
    if (this.filtersState.shipwreck) {
      if (!this.map.getLayer("Shipwrecks")) this.addShipwrecksLayer()
    } else {
      if (this.map.getLayer("Shipwrecks")) this.map.removeLayer("Shipwrecks")
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
