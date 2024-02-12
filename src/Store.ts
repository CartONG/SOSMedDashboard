import { OpsData, fetchOpsData } from "./classes/OpsData"
import { updateStats } from "./classes/PopUpAndStats"
import { State, SwitchType } from "./classes/State"
import { reactive, ref } from "vue"
import { FeatureCollection } from "geojson"
import { BaseMap } from "@/classes/BaseMap"
import { HistogramSlider } from "@/classes/HistogramSlider"
import { GeoJSONSourceRaw } from "mapbox-gl"
import { convert } from "geo-coordinates-parser"

const CssClass: {
  [key in SwitchType]: { [key: string]: boolean }
} = {
  harbor: { icon: true, "icon-anchor-o": true, "text-black": true, "text-xs": true },
  rescue: { "bg-secondary": true },
  srr: { "text-grayClose": true, "legend-srr": true },
  transfer: { "bg-gray-400": true }
}

export interface ReactiveStore {
  updateMenuVisibility: () => void;
  isMenuVisible: boolean;

  updatePopUpVisibility: () => void;
  isPopUpVisible: boolean;

  setVideoAndPicturePopUpVisibility: (visible: boolean) => void;
  isVideoAndPicturePopUpVisible: boolean;

  setPopUpVideoUrls: (popUpVideoUrls: string) => void;
  popUpVideoUrls: string[];

  setPopUpImageUrls: (popUpImageUrls: string) => void;
  popUpImageUrls: string[];

  switchVirtualVisitVisibility: () => void;
  virtualVisitVisibility: boolean;

  virtualVisitAlreadyOpened: boolean;
}

export const reactiveStore : ReactiveStore = reactive({
  _isMenuVisible: false,

  updateMenuVisibility () {
    this._isMenuVisible = !this._isMenuVisible
  },

  get isMenuVisible (): boolean {
    return this._isMenuVisible
  },

  _isPopUpVisible: false,

  updatePopUpVisibility () {
    this._isPopUpVisible = !this._isPopUpVisible
  },

  get isPopUpVisible (): boolean {
    return this._isPopUpVisible
  },

  _isVideoAndPicturePopUpVisible: false,

  setVideoAndPicturePopUpVisibility (visible: boolean) {
    this._isVideoAndPicturePopUpVisible = visible
  },

  get isVideoAndPicturePopUpVisible (): boolean {
    return this._isVideoAndPicturePopUpVisible
  },

  _popUpVideoUrls: [""],

  setPopUpVideoUrls (popUpVideoUrls: string) {
    this._popUpVideoUrls = popUpVideoUrls.split(",")
  },

  get popUpVideoUrls (): string[] {
    return this._popUpVideoUrls
  },

  _popUpImageUrls: [""],

  setPopUpImageUrls (popUpImageUrls: string) {
    this._popUpImageUrls = popUpImageUrls.split(",")
  },

  get popUpImageUrls (): string[] {
    return this._popUpImageUrls
  },

  _virtualVisitVisibility: false,

  switchVirtualVisitVisibility (): void {
    this._virtualVisitVisibility = !this._virtualVisitVisibility
    this.updateVirtualVisitAlreadyOpened()
  },

  get virtualVisitVisibility (): boolean {
    return this._virtualVisitVisibility
  },

  _virtualVisitAlreadyOpened: false,

  updateVirtualVisitAlreadyOpened (): void {
    this._virtualVisitAlreadyOpened = true
  },

  get virtualVisitAlreadyOpened (): boolean {
    return this._virtualVisitAlreadyOpened
  }
})

// Constant to expose and manage the store
// It could be seen as a static class
export const store = {
  allData: [] as OpsData[],
  harbors: {} as FeatureCollection,
  sar: {} as GeoJSONSourceRaw,
  sarCenters: {} as GeoJSONSourceRaw,
  state: new State(),
  baseMap: new BaseMap(),
  histogramSlider: new HistogramSlider(),
  dataLoaded: ref(false),

  filterData (minDate: Date, maxDate: Date): void {
    this.state.minDate = new Date(minDate)
    this.state.maxDate = new Date(maxDate)
    for (const switchTypeKey in SwitchType) {
      if (switchTypeKey === SwitchType.srr) {
        continue
      }
      this.updateMap(switchTypeKey as SwitchType, this.state.switch[switchTypeKey as SwitchType])
    }
    const timeFilteredData = this.allData.filter(currentOperation => this.state.minDate <= currentOperation.date && currentOperation.date <= this.state.maxDate)
    this.baseMap.updateOperationsLayer(this.state.switch, timeFilteredData)
    this.updateStats(timeFilteredData)
  },

  async initStore (): Promise<void> {
    this.harbors = await this.getHarbors()
    this.sar = require("./assets/resources/SAR.json")
    this.sarCenters = require("./assets/resources/SAR_centers.json")
    this.allData = await fetchOpsData()
    this.dataLoaded.value = true
    this.updateHistogramSlider()
    // this.baseMap.createMarkers(this.harbors, this.allData)
    // this.baseMap.createSarRegions(this.sar, this.sarCenters)
  },

  displayMap (): void {
    this.baseMap.setData(this.harbors, this.allData, this.sar, this.sarCenters)
    this.baseMap.init()
    // this.filterData(this.state.minDate, this.state.maxDate)
  },

  updateBasemap (index: number): void {
    this.baseMap.setCurrentBasemap(index)
  },

  updateMap (id: keyof typeof SwitchType, isChecked: boolean): void {
    this.baseMap.updateOperationsLayer(this.state.switch)
    isChecked
      ? this.baseMap.displayMarkers(id, this.state.minDate, this.state.maxDate)
      : this.baseMap.hideMarkers(id)
  },

  destroyMap (): void {
    this.baseMap.destroy()
  },

  displayHistogramSlider (askedMin: number, askedMax: number, data: number[]): void {
    this.histogramSlider.display(askedMin, askedMax, data)
  },

  setWidthHistogramSlider (width: number): void {
    this.histogramSlider.setWidth(width)
  },

  updateHistogramSlider (): void {
    this.histogramSlider.updateHistogram(this.allData.map(d => d.date.getTime()), this)
  },

  updateHistogramSliderFromTo (): void {
    this.histogramSlider.updateSlider(this.state.minDate.valueOf(), this.state.maxDate.valueOf())
    this.updateHistogramSlider()
  },

  updateStats (timeFilteredData: OpsData[]): void {
    updateStats(this.state.minDate, this.state.maxDate, timeFilteredData)
  },

  toggleSwitch (switchId: keyof typeof SwitchType): void {
    this.state.switch[switchId] = !this.state.switch[switchId]
    this.updateMap(switchId, this.state.switch[switchId])
  },

  getCssClass (id: keyof typeof SwitchType): {[key: string]: boolean} {
    return CssClass[id]
  },

  async getHarbors (): Promise<FeatureCollection> {
    const harborsUrl = `https://sheets.googleapis.com/v4/spreadsheets/1opF61Qq2DgrJIP-kQD5-KHzC4xZkp2u_zqigTGk3V0I/values/Data_ports?key=${process.env.VUE_APP_GOOGLE_API_KEY}`
    const sheet: { values: [string, string, string][] } = await (await fetch(harborsUrl)).json()
    sheet.values.shift()
    const harbors: FeatureCollection = {
      type: "FeatureCollection",
      features: []
    }
    // eslint-disable-next-line array-callback-return
    sheet.values.map(x => {
      const rawCoordinates = x[1] + ", " + x[2]
      try {
        const coordinates = convert(rawCoordinates)
        harbors.features.push({
          type: "Feature",
          properties: { name: x[0] },
          geometry: {
            coordinates: [
              coordinates.decimalLongitude,
              coordinates.decimalLatitude
            ],
            type: "Point"
          }
        })
      } catch (error) {
        console.error("Error on ports:" + x)
      }
    })
    return Promise.resolve(harbors)
  }
}
