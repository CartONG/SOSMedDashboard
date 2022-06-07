import { OpsData } from "./OpsData"
import { MapboxGLButtonControl } from "./MapboxGLButtonControl"
import { LngLatBounds, Map, Marker, NavigationControl, GeoJSONSource, MapMouseEvent } from "mapbox-gl"
import { showPopUp } from "./PopUpAndStats"
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson"
import { store } from "@/Store"

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
}
]

export class BaseMap {
  private map!: Map;
  private defaultExtent!: LngLatBounds
  private markers: Marker[] = [];
  currentBasemap = 0;

  display (timeFilteredData: OpsData[]): void {
    // This token was taken from the demo project we need to replace with a real token
    this.map = new Map({
      accessToken: "pk.eyJ1Ijoid2VzbGV5YmFuZmllbGQiLCJhIjoiY2pmMDRwb202MGlzNDJ3bm44cHA3YXZiNCJ9.b2yOf2vbWnWiV7mlsFAywg",
      container: "mapContainer",
      style: BASEMAPS[this.currentBasemap].style,
      center: [9, 35],
      zoom: 4
    })
    this.defaultExtent = this.map.getBounds()
    this.map.on("load", () => {
      this.setSource(timeFilteredData)
    })

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

    // Warning: The button for changing the basemap is added elsewhere --> Basemap.vue.
    // This is because the button needed to trigger a popup, with multiple button.
  }

  setCurrentBasemap (index: number): void {
    this.currentBasemap = index
    this.map.setStyle(BASEMAPS[this.currentBasemap].style)
    this.map.on("style.load", () => {
      this.map.off("click", "Ops", this.setMapPopUp)
      this.map.off("mouseenter", "Ops", this.setMapCursorPointer.bind(this))
      this.map.off("mouseleave", "Ops", this.removeMapCursorPointer.bind(this))
      this.setSource(store.state.timeFilteredData)
    })
  }

  setSource (timeFilteredData: OpsData[]): void {
    if (this.map.getLayer("Ops")) this.map.removeLayer("Ops")
    if (this.map.getSource("OpsData")) this.map.removeSource("OpsData")
    if (timeFilteredData.length > 0) {
      this.map.addSource("OpsData", {
        type: "geojson",
        data: this.datasetToGeoJSON(timeFilteredData)
      })
      this.setData()
    }
  }

  setData (): void {
    if (this.map.getLayer("Ops")) this.map.removeLayer("Ops")
    this.map.addLayer({
      id: "Ops",
      type: "circle",
      source: "OpsData",
      paint: {
        "circle-radius": {
          base: 1.75,
          stops: [
            [8, 3],
            [12, 20]
          ]
        },
        "circle-color": [
          "match",
          ["get", "typeOps"],
          "Rescue",
          "#F03E1B",
          "Transfer",
          "#9CA3AF",
          "Medical Evacuation",
          "#1A2747",
          "#ccc"
        ]
      }
    })
    this.map.on("click", "Ops", this.setMapPopUp)
    this.map.on("mouseenter", "Ops", this.setMapCursorPointer.bind(this))
    this.map.on("mouseleave", "Ops", this.removeMapCursorPointer.bind(this))
  }

  update (timeFilteredData: OpsData[]): void {
    const source: GeoJSONSource = this.map.getSource("OpsData") as GeoJSONSource
    source.setData(this.datasetToGeoJSON(timeFilteredData))
  }

  resetView (): void {
    this.map.fitBounds(this.defaultExtent)
  }

  setMapPopUp (e:MapMouseEvent & {
    features?: Feature<Geometry, GeoJsonProperties>[] | undefined;
  } & unknown): void {
    if (e.features && e.features?.length > 0) {
      showPopUp(store.state.timeFilteredData.filter(x => x.id === e.features![0].properties!.id).pop() as OpsData)
    }
  }

  setMapCursorPointer (): void {
    this.map.getCanvas().style.cursor = "pointer"
  }

  removeMapCursorPointer (): void {
    this.map.getCanvas().style.cursor = ""
  }

  datasetToGeoJSON (timeFilteredData: OpsData[]): FeatureCollection<Geometry, GeoJsonProperties> {
    const geojson: FeatureCollection<Geometry, GeoJsonProperties> = {
      type: "FeatureCollection",
      features: []
    }
    // eslint-disable-next-line array-callback-return
    timeFilteredData.map(x => {
      geojson.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [x.longitude, x.latitude]
        },
        properties: { ...x }
      })
    })
    return geojson
  }

  destroy (): void {
    this.map.remove()
  }
}
