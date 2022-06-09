import { OpsData, fetchOpsData } from "./classes/OpsData"
import { updateStats } from "./classes/PopUpAndStats"
import { State } from "./classes/State"
import { reactive } from "vue"

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
  }
})

// Constant to expose and manage the store
// It could be seen as a static class
export const store = {
  allData: [] as OpsData[],
  state: new State(),

  filterData (minDate: Date, maxDate: Date): void {
    this.state.minDate = new Date(minDate)
    this.state.maxDate = new Date(maxDate)
    this.state.timeFilteredData = []
    for (const data of this.allData) {
      if ((this.state.minDate <= data.date) && (data.date <= this.state.maxDate)) {
        this.state.timeFilteredData.push(data)
      }
    }
    this.updateMap()
    this.updateStats()
  },

  async initStore (): Promise<void> {
    this.allData = await fetchOpsData()
    this.updateHistogramSlider()
    this.filterData(this.state.minDate, this.state.maxDate)
  },

  displayMap (): void {
    this.state.baseMap.display(this.state.timeFilteredData)
  },

  updateBasemap (index: number): void {
    this.state.baseMap.setCurrentBasemap(index)
  },

  updateMap (): void {
    this.state.baseMap.update(this.state.timeFilteredData)
  },

  destroyMap (): void {
    this.state.baseMap.destroy()
  },

  displayHistogramSlider (askedMin: number, askedMax: number, data: number[]): void {
    this.state.histogramSlider.display(askedMin, askedMax, data)
  },

  setWidthHistogramSlider (width: number): void {
    this.state.histogramSlider.setWidth(width)
  },

  updateHistogramSlider (): void {
    this.state.histogramSlider.updateHistogram(this.allData.map(d => d.date.getTime()), this)
  },

  updateHistogramSliderFromTo (): void {
    this.state.histogramSlider.updateSlider(this.state.minDate.valueOf(), this.state.maxDate.valueOf())
    this.updateHistogramSlider()
  },

  updateStats (): void {
    updateStats(this.state)
  }
}
