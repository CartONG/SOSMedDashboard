import { OpsData, TypeOps } from "./OpsData"
import { MapboxGLButtonControl } from "./MapboxGLButtonControl"
import { Map, Marker, NavigationControl, Style } from "mapbox-gl"
import { showPopUp } from "./PopUpAndStats"

const basemaps: {
  currentBaseMapIndex: number,
  basemaps: Array<{
    id: number;
    name: string;
    img: string;
    style: string;
  }>
} = {
  currentBaseMapIndex: 0,
  basemaps: [{
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
}

export class BaseMap {
  private map!: Map;
  private markers: Marker[] = [];

  display (timeFilteredData: OpsData[]): void {
    // This token was taken from the demo project we need to replace with a real token
    this.map = new Map({
      accessToken: "pk.eyJ1Ijoid2VzbGV5YmFuZmllbGQiLCJhIjoiY2pmMDRwb202MGlzNDJ3bm44cHA3YXZiNCJ9.b2yOf2vbWnWiV7mlsFAywg",
      container: "mapContainer",
      style: basemaps.basemaps[basemaps.currentBaseMapIndex].style,
      center: [9, 35],
      zoom: 4
    })

    this.update(timeFilteredData)

    // Add zoom and rotation controls to the map.
    const nav = new NavigationControl({
      showCompass: false,
      showZoom: true
    })
    this.map.addControl(nav)

    /* Event Handlers */
    const map2 = this.map
    function nextLayer () {
      basemaps.currentBaseMapIndex = (basemaps.currentBaseMapIndex + 1) % basemaps.basemaps.length
      map2.setStyle(basemaps.basemaps[basemaps.currentBaseMapIndex].style)
    }

    /* Instantiate new controls with custom event handlers */
    const changeLayers = new MapboxGLButtonControl("mapbox-gl-change_layer icon icon-layers", "Change Layer", nextLayer, "")

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
