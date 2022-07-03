import { OpsData, TypeOps } from "./OpsData"
import { MapboxGLButtonControl } from "./MapboxGLButtonControl"
import { LngLatBounds, Map as Mapbox, Marker, NavigationControl } from "mapbox-gl"
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
  private map!: Mapbox;
  private defaultExtent!: LngLatBounds
  // private markers: Marker[] = [];
  private harborMarkers: Marker[] = []
  private markers: {[key in TypeOps]: Map<Date, Marker>} = { Rescue: new Map<Date, Marker>(), Transfer: new Map<Date, Marker>() };
  // private markers: {Harbor: Marker[], rescue: Marker[], transfer: Marker[]} = { Harbor: [], rescue: [], transfer: [] };
  currentBasemap = 0;

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

    // Warning: The button for changing the basemap is added elsewhere --> Basemap.vue.
    // This is because the button needed to trigger a popup, with multiple button.
  }

  setCurrentBasemap (index: number): void {
    this.currentBasemap = index
    this.map.setStyle(BASEMAPS[this.currentBasemap].style)
  }

  createMarkers (harbors: FeatureCollection, ops: OpsData[]): void {
    this.createHarborsMarkers(harbors)
    this.createOperationMarkers(ops)
  }

  createOperationMarkers (timeFilteredData: OpsData[]): void {
    const rescue = (document.getElementById("rescue") as HTMLInputElement).checked
    const transfer = (document.getElementById("transfer") as HTMLInputElement).checked
    timeFilteredData.filter(operation => !isNaN(operation.longitude) && !isNaN(operation.latitude) &&
      ((rescue && operation.typeOps === TypeOps.rescue) || (transfer && operation.typeOps === TypeOps.transfer)))
      .forEach(operation =>
        this.markers[operation.typeOps].set(operation.date,
          this.createMarker(BaseMap.getClassFromOperationType(operation.typeOps), operation.longitude, operation.latitude, () => showPopUp(operation))
        )
      )
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

  private static getClassFromOperationType (typeOps: TypeOps) {
    switch (typeOps) {
      case TypeOps.rescue:
        return "bg-secondary"
      case TypeOps.transfer:
        return "bg-gray-400"
      default:
        return "bg-main"
    }
  }

  resetView (): void {
    this.map.fitBounds(this.defaultExtent)
  }

  destroy (): void {
    this.map.remove()
  }

  displayMarkers (timeFilteredData: OpsData[]): void {
    this.displayHarbors()

    this.displayOperations(timeFilteredData)
  }

  displayHarbors (): void {
    if ((document.getElementById("harbor") as HTMLInputElement).checked) {
      this.harborMarkers.forEach(marker => marker.addTo(this.map))
    } else {
      this.harborMarkers.forEach(marker => marker.remove())
    }
  }

  private displayOperations (timeFilteredData: OpsData[]) {
    const dateOperationsToKeep = timeFilteredData.map(op => op.date)
    this.updateMarkersVisibilityAccordingToCheckboxValue("rescue", dateOperationsToKeep, TypeOps.rescue)
    this.updateMarkersVisibilityAccordingToCheckboxValue("transfer", dateOperationsToKeep, TypeOps.transfer)
  }

  private updateMarkersVisibilityAccordingToCheckboxValue (htmlElementId: string, dateOperationsToKeep: Date[], markersType: TypeOps) {
    const isChecked = (document.getElementById(htmlElementId) as HTMLInputElement).checked
    if (isChecked) {
      this.updateMarkerVisibility(dateOperationsToKeep, this.markers[markersType])
    } else {
      this.markers[markersType].forEach(op => op.remove())
    }
  }

  private updateMarkerVisibility (dateOperationsToKeep: Date[], markers: Map<Date, Marker>) {
    for (const [date, op] of markers) {
      if (dateOperationsToKeep.findIndex(dateOp => date === dateOp) === -1) {
        op.remove()
      } else {
        op.addTo(this.map)
      }
    }
  }
}
