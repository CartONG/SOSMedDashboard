import { OpsData, TypeOps } from "./OpsData"
import { MapboxGLButtonControl } from "./MapboxGLButtonControl"
import { LngLatBounds, Map, Marker, NavigationControl } from "mapbox-gl"
import { showPopUp } from "./PopUpAndStats"

export interface SingleBasemap {
  id: number;
  name: string;
  img: string;
  style: string;
}

export const BASEMAPS: Array<SingleBasemap> = [{
  id: 0,
  name: "SOS Mediterranee",
  img: "https://raw.githubusercontent.com/CartONG/opsmap-icons/main/basemap_opsmap.png",
  style: "mapbox://styles/sosmediterranee/ckkdvswwr0ol117t7d91p7wac"
},
{
  id: 1,
  name: "Satellite Imagery",
  img: "https://raw.githubusercontent.com/CartONG/opsmap-icons/main/basemap_satellite.png",
  style: "mapbox://styles/mapbox/satellite-v9"
},
{
  id: 2,
  name: "Dark",
  img: "https://raw.githubusercontent.com/CartONG/opsmap-icons/main/basemap_osm.png",
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

    this.update(timeFilteredData)

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

  resetView (): void {
    this.map.fitBounds(this.defaultExtent)
  }

  destroy (): void {
    this.map.remove()
  }
}
