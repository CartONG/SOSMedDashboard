/* eslint-disable no-return-assign */
import { OpsData, TypeOps } from "./OpsData"
import { MapboxGLButtonControl } from "./MapboxGLButtonControl"
import { GeoJSONSource, GeoJSONSourceRaw, LngLatBounds, Map as Mapbox, Marker, NavigationControl } from "mapbox-gl"
import { showPopUp } from "./PopUpAndStats"
import { FeatureCollection } from "geojson"
import { State, SwitchType } from "@/classes/State"
import "mapbox-gl/dist/mapbox-gl.css"
import { BaseMapPickerControl } from "./BaseMapPickerControl"
import { opsDataToGeoJSON } from "@/utils/arrayToGeojson"

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

export class BaseMap {
  private static SAR_LAYER_ID = "sar"
  private static SAR_NAME_LAYER_ID = "sar-name"
  private operationsData!: OpsData[]
  private filteredOperationsData!: OpsData[]

  private map!: Mapbox
  private defaultExtent!: LngLatBounds
  private harborMarkers: Marker[] = []
  private markers: {[key in TypeOps]: Map<Date, Marker>} = { Medical: new Map<Date, Marker>(), Rescue: new Map<Date, Marker>(), Transfer: new Map<Date, Marker>() }

  currentBasemap = 0

  init (): void {
    // This token was taken from the demo project we need to replace with a real token
    this.map = new Mapbox({
      accessToken: "pk.eyJ1Ijoid2VzbGV5YmFuZmllbGQiLCJhIjoiY2pmMDRwb202MGlzNDJ3bm44cHA3YXZiNCJ9.b2yOf2vbWnWiV7mlsFAywg",
      container: "mapContainer",
      style: BASEMAPS[this.currentBasemap].style,
      center: [9, 35],
      zoom: 4
    })
    this.defaultExtent = this.map.getBounds()

    // Add zoom and rotation controls to the map.
    const nav = new NavigationControl({
      showCompass: false,
      showZoom: true
    })
    this.map.addControl(nav)

    /* Instantiate new controls with custom event handlers */
    const viewResetter = new MapboxGLButtonControl("mapbox-gl-change_layer icon icon-view", "Reset view", this.resetView.bind(this), "")

    /* Add Controls to the Map */
    this.map.addControl(viewResetter, "top-right")

    const baseMapPickerControl = new BaseMapPickerControl()

    /* Add Controls to the Map */
    this.map.addControl(baseMapPickerControl, "top-right")

    // Warning: The button for changing the basemap is added elsewhere --> Basemap.vue.
    // This is because the button needed to trigger a popup, with multiple button.
  }

  setCurrentBasemap (index: number): void {
    this.currentBasemap = index
    this.map.setStyle(BASEMAPS[this.currentBasemap].style)
  }

  createMarkers (harbors: FeatureCollection, ops: OpsData[]): void {
    this.createHarborsMarkers(harbors)
    this.createOperationLayer(ops)
  }

  createOperationLayer (timeFilteredData: OpsData[]): void {
    this.operationsData = timeFilteredData
    this.filteredOperationsData = [...timeFilteredData]
    this.map.addSource("operations", {
      type: "geojson",
      data: opsDataToGeoJSON(timeFilteredData.filter(operation => !isNaN(operation.longitude) && !isNaN(operation.latitude)))
    })
    this.map.addLayer({
      id: "Operation",
      type: "circle",
      source: "operations",
      paint: {
        "circle-radius": ["step", ["zoom"], 3, 6, 5, 7.5, 8, 9, 10],
        "circle-color": [
          "match",
          ["get", "typeOps"],
          "Medical",
          "#1A2747",
          "Rescue",
          "#F03E1B",
          "Transfer",
          "#9CA3AF",
          /* other */ "#000"
        ]
      }
    })
    this.map.on("mouseenter", "Operation", () => this.map.getCanvas().style.cursor = "pointer")
    this.map.on("mouseleave", "Operation", () => this.map.getCanvas().style.cursor = "")
    this.map.on("click", "Operation", (e) => {
      showPopUp(this.map.queryRenderedFeatures(e.point)[0].properties as OpsData)
    })
  }

  updateOperationsLayer (switchs: State["switch"], timeFilteredData?: OpsData[]): void {
    console.log(switchs)
    if (timeFilteredData) {
      this.operationsData = timeFilteredData
    }
    this.filteredOperationsData = [...this.operationsData]
    if (!switchs.medical) {
      this.filteredOperationsData = this.filteredOperationsData.filter(x => x.typeOps !== "Medical")
    }
    if (!switchs.rescue) {
      this.filteredOperationsData = this.filteredOperationsData.filter(x => x.typeOps !== "Rescue")
    }
    if (!switchs.transfer) {
      this.filteredOperationsData = this.filteredOperationsData.filter(x => x.typeOps !== "Transfer")
    }

    (this.map.getSource("operations") as GeoJSONSource).setData(opsDataToGeoJSON(this.filteredOperationsData))
  }

  createHarborsMarkers (harbors: FeatureCollection): void {
    harbors.features.forEach(feature => {
      this.harborMarkers.push(this.createMarker("icon icon-anchor-o", feature.properties?.longitude, feature.properties?.latitude))
    })
  }

  private createMarker (className: string, longitude: number, latitude: number, showPopUp?: () => void): Marker {
    const el = document.createElement("div")
    el.className = `marker ${className}`
    if (showPopUp) {
      el.addEventListener("click", () => {
        showPopUp()
      })
    }
    return new Marker(el)
      .setLngLat([longitude, latitude])
  }

  createSarRegions (sar: GeoJSONSourceRaw, sarCenters: GeoJSONSourceRaw): void {
    this.map.addSource("sar", sar)
    this.map.addSource("sarCenters", sarCenters)
    this.displaySarRegions()
  }

  resetView (): void {
    this.map.fitBounds(this.defaultExtent)
  }

  destroy (): void {
    this.map.remove()
  }

  displayMarkers (id: keyof typeof SwitchType, minDate: Date, maxDate: Date): void {
    switch (id) {
      case "harbor":
        this.displayHarbors()
        break
      case "srr":
        this.displaySarRegions()
        break
    }
  }

  displayHarbors (): void {
    this.harborMarkers.forEach(marker => marker.addTo(this.map))
  }

  private displaySarRegions () {
    this.map.addLayer({ id: BaseMap.SAR_LAYER_ID, type: "line", source: "sar", layout: {}, paint: { "line-color": "#999999", "line-width": 1, "line-dasharray": [1, 2] } })
    this.map.addLayer({
      id: BaseMap.SAR_NAME_LAYER_ID,
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

  hideMarkers (id: keyof typeof SwitchType): void {
    switch (id) {
      case "harbor":
        this.hideHarbors()
        break
      case "srr":
        this.hideSarRegions()
        break
    }
  }

  private hideHarbors (): void {
    this.harborMarkers.forEach(BaseMap.remove)
  }

  private hideSarRegions () {
    this.map.removeLayer(BaseMap.SAR_LAYER_ID)
    this.map.removeLayer(BaseMap.SAR_NAME_LAYER_ID)
  }

  private static remove (marker: Marker) {
    marker.remove()
  }
}
