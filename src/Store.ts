import { OpsData, fetchOpsData } from "./classes/OpsData"
import { updateStats } from "./classes/PopUpAndStats"
import { State, SwitchType } from "./classes/State"
import { reactive } from "vue"
import { FeatureCollection } from "geojson"
import { BaseMap } from "@/classes/BaseMap"
import { HistogramSlider } from "@/classes/HistogramSlider"

const CssClass: {
  [key in SwitchType]: { [key: string]: boolean }
} = {
  rescue: { "bg-secondary": true },
  transfer: { "bg-gray-400": true },
  medical: { "bg-main": true },
  harbor: { icon: true, "icon-anchor-o": true, "text-black": true }
}

export interface ReactiveStore {
  updateMenuVisibility: () => void;
  isMenuVisible: boolean;

  updatePopUpVisibility: () => void;
  isPopUpVisible: boolean;

  setVideoAndPicturePopUpVisibility: (visible: boolean) => void;
  isVideoAndPicturePopUpVisible: boolean;

  setPopUpVideoUrls: (popUpVideoUrls: string[]) => void;
  popUpVideoUrls: string[];

  setPopUpImageUrls: (popUpImageUrls: string[]) => void;
  popUpImageUrls: string[];

  switchVirtualVisitVisibility: () => void;
  virtualVisitVisibility: boolean;
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

  setPopUpVideoUrls (popUpVideoUrls: string[]) {
    this._popUpVideoUrls = popUpVideoUrls
  },

  get popUpVideoUrls (): string[] {
    return this._popUpVideoUrls
  },

  _popUpImageUrls: [""],

  setPopUpImageUrls (popUpImageUrls: string[]) {
    this._popUpImageUrls = popUpImageUrls
  },

  get popUpImageUrls (): string[] {
    return this._popUpImageUrls
  },

  _virtualVisitVisibility: false,

  switchVirtualVisitVisibility (): void {
    this._virtualVisitVisibility = !this._virtualVisitVisibility
  },

  get virtualVisitVisibility (): boolean {
    return this._virtualVisitVisibility
  }
})

// Constant to expose and manage the store
// It could be seen as a static class
export const store = {
  allData: [] as OpsData[],
  harbors: {} as FeatureCollection,
  state: new State(),
  baseMap: new BaseMap(),
  histogramSlider: new HistogramSlider(),

  filterData (minDate: Date, maxDate: Date): void {
    this.state.minDate = new Date(minDate)
    this.state.maxDate = new Date(maxDate)
    for (const switchTypeKey in SwitchType) {
      this.updateMap(switchTypeKey as SwitchType, this.state.switch[switchTypeKey as SwitchType])
    }
    this.updateStats()
  },

  async initStore (): Promise<void> {
    this.harbors = require("./assets/resources/harbors_mediterranee.json")
    this.allData = await fetchOpsData()
    this.updateHistogramSlider()
    this.baseMap.createMarkers(this.harbors, this.allData)
    this.filterData(this.state.minDate, this.state.maxDate)
  },

  displayMap (): void {
    this.baseMap.init()
  },

  updateBasemap (index: number): void {
    this.baseMap.setCurrentBasemap(index)
  },

  updateMap (id: keyof typeof SwitchType, isChecked: boolean): void {
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

  updateStats (): void {
    const timeFilteredData = this.allData.filter(currentOperation => this.state.minDate <= currentOperation.date && currentOperation.date <= this.state.maxDate)

    updateStats(this.state.minDate, this.state.maxDate, timeFilteredData)
  },

  toggleSwitch (switchId: keyof typeof SwitchType): void {
    this.state.switch[switchId] = !this.state.switch[switchId]
    this.updateMap(switchId, this.state.switch[switchId])
  },

  getCssClass (id: keyof typeof SwitchType): {[key: string]: boolean} {
    return CssClass[id]
  }
}
