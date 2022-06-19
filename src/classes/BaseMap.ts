import { OpsData, TypeOps } from "./OpsData"
import { MapboxGLButtonControl } from "./MapboxGLButtonControl"
import { LngLatBounds, Map, Marker, NavigationControl } from "mapbox-gl"
import { showPopUp } from "./PopUpAndStats"
import { FeatureCollection } from "geojson"

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

  init (): void {
    // This token was taken from the demo project we need to replace with a real token
    this.map = new Map({
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

    // Warning: The button for changing the basemap is added elsewhere --> Basemap.vue.
    // This is because the button needed to trigger a popup, with multiple button.
  }

  setCurrentBasemap (index: number): void {
    this.currentBasemap = index
    this.map.setStyle(BASEMAPS[this.currentBasemap].style)
  }

  removeMarkers (): void {
    if (this.markers.length === 0) {
      return
    }
    for (const marker of this.markers) {
      marker.remove()
    }
  }

  addMarkers (timeFilteredData: OpsData[]): void {
    const rescue = (document.getElementById("rescue") as HTMLInputElement).checked
    const transfer = (document.getElementById("transfer") as HTMLInputElement).checked
    for (const data of timeFilteredData) {
      if (!isNaN(data.longitude) && !isNaN(data.latitude) &&
           ((rescue && data.typeOps === TypeOps.Rescue) || (transfer && data.typeOps === TypeOps.Transfer))) {
        this.createMarker(BaseMap.getClassFromOperationType(data.typeOps), data.longitude, data.latitude, () => showPopUp(data))
      }
    }
  }

  addHarbors (harbors: FeatureCollection):void {
    if (!(document.getElementById("harbor") as HTMLInputElement).checked) {
      return
    }
    harbors.features.forEach(feature => {
      this.createMarker("icon icon-anchor-o", feature.properties?.longitude, feature.properties?.latitude)
    })
  }

  private createMarker (className: string, longitude: number, latitude: number, showPopUp?: () => void) {
    const el = document.createElement("div")
    el.className = `marker ${className}`
    if (showPopUp) {
      el.addEventListener("click", () => {
        showPopUp()
      })
    }
    this.markers.push(
      new Marker(el)
        .setLngLat([longitude, latitude])
        .addTo(this.map)
    )
  }

  private static getClassFromOperationType (typeOps: TypeOps) {
    if (typeOps === TypeOps.Rescue) {
      return " bg-secondary"
    } else if (typeOps === TypeOps.Transfer) {
      return " bg-gray-400"
    } else {
      return " bg-main"
    }
  }

  resetView (): void {
    this.map.fitBounds(this.defaultExtent)
  }

  destroy (): void {
    this.map.remove()
  }
}
