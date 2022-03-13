import { OpsData, TypeOps } from "./OpsData"
import { MapboxGLButtonControl } from "./MapboxGLButtonControl"
import { Map, Marker, NavigationControl } from "mapbox-gl"
import { showPopUp } from "./PopUpAndStats"

export class BaseMap {
  private map!: Map;
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

    this.update(timeFilteredData)

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
    const changeLayers = new MapboxGLButtonControl("mapbox-gl-change_layer", "Change Layer", nextLayer, "L")

    /* Add Controls to the Map */
    this.map.addControl(changeLayers, "top-right")
  }

  update (timeFilteredData: OpsData[]): void {
    for (const marker of this.markers) {
      marker.remove()
    }
    const rescue = (document.getElementById("rescue") as HTMLInputElement).checked
    const transfer = (document.getElementById("transfer") as HTMLInputElement).checked
    this.markers = []
    for (const data of timeFilteredData) {
      if (!isNaN(data.longitude) && !isNaN(data.latitude) &&
           ((rescue && data.typeOps === TypeOps.Rescue) || (transfer && data.typeOps === TypeOps.Transfer))) {
        const el = document.createElement("div")
        el.className = "marker"
        if (data.typeOps === TypeOps.Rescue) {
          el.className += " bg-secondary"
        } else if (data.typeOps === TypeOps.Transfer) {
          el.className += " bg-gray-400"
        } else {
          el.className += " bg-main"
        }
        el.addEventListener("click", () => { showPopUp(data) })
        this.markers.push(
          new Marker(el)
            .setLngLat([data.longitude, data.latitude])
            .addTo(this.map)
        )
      }
    }
  }

  destroy (): void {
    this.map.remove()
  }
}
