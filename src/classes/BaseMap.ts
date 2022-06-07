import { OpsData } from "./OpsData"
import { MapboxGLButtonControl } from "./MapboxGLButtonControl"
import { LngLatBounds, Map, Marker, NavigationControl, GeoJSONSource } from "mapbox-gl"
import { showPopUp } from "./PopUpAndStats"
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson"
import { store } from "@/Store"

export class BaseMap {
  private map!: Map;
  private defaultExtent!: LngLatBounds
  private markers: Marker[] = [];

  display (timeFilteredData: OpsData[]): void {
    const layers = [
      "mapbox://styles/sosmediterranee/ckkdvswwr0ol117t7d91p7wac",
      "mapbox://styles/mapbox/satellite-v9",
      "mapbox://styles/mapbox/dark-v10"
    ]

    // This token was taken from the demo project we need to replace with a real token
    this.map = new Map({
      accessToken: "pk.eyJ1Ijoid2VzbGV5YmFuZmllbGQiLCJhIjoiY2pmMDRwb202MGlzNDJ3bm44cHA3YXZiNCJ9.b2yOf2vbWnWiV7mlsFAywg",
      container: "mapContainer",
      style: layers[0],
      center: [7.5956888, 41.4316886],
      zoom: 3.5
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

    /* Event Handlers */
    let i = 0
    const map2 = this.map
    function nextLayer () {
      map2.setStyle(layers[i % layers.length])
      i = i + 1
    }

    /* Instantiate new controls with custom event handlers */
    const changeLayers = new MapboxGLButtonControl("mapbox-gl-change_layer icon icon-layers", "Change Layer", nextLayer, "")
    const viewResetter = new MapboxGLButtonControl("mapbox-gl-change_layer icon icon-view", "Reset view", this.resetView.bind(this), "")

    /* Add Controls to the Map */
    this.map.addControl(viewResetter, "top-right")
    this.map.addControl(changeLayers, "top-right")
  }

  setSource (timeFilteredData: OpsData[]): void {
    if (timeFilteredData.length > 0) {
      this.map.addSource("OpsData", {
        type: "geojson",
        data: this.datasetToGeoJSON(timeFilteredData)
      })
      this.setData()
    }
  }

  setData (): void {
    this.map.addLayer({
      id: "Ops",
      type: "circle",
      source: "OpsData",
      paint: {
        // Make circles larger as the user zooms from z12 to z22.
        "circle-radius": {
          base: 1.75,
          stops: [
            [8, 3],
            [12, 20]
          ]
        },
        // Color circles by ethnicity, using a `match` expression.
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
    this.map.on("click", "Ops", (e) => {
      if (e.features && e.features?.length > 0) {
        showPopUp(store.state.timeFilteredData.filter(x => x.id === e.features![0].properties!.id).pop() as OpsData)
      }
    })
    this.map.on("mouseenter", "Ops", () => { this.map.getCanvas().style.cursor = "pointer" })
    this.map.on("mouseleave", "Ops", () => { this.map.getCanvas().style.cursor = "" })
  }

  update (timeFilteredData: OpsData[]): void {
    const source: GeoJSONSource = this.map.getSource("OpsData") as GeoJSONSource
    source.setData(this.datasetToGeoJSON(timeFilteredData))
  }

  resetView (): void {
    this.map.fitBounds(this.defaultExtent)
  }

  datasetToGeoJSON (timeFilteredData: OpsData[]): FeatureCollection<Geometry, GeoJsonProperties> {
    const geojson: FeatureCollection<Geometry, GeoJsonProperties> = {
      type: "FeatureCollection",
      features: []
    }
    console.log(timeFilteredData)
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
