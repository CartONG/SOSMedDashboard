import { OpsData, fetchOpsData } from "./classes/OpsData"
import { updateStats } from "./classes/PopUpAndStats"
import { ApplicationState, CssClass, DataState, PopUpType, SwitchType } from "./classes/State"
import { reactive } from "vue"
import { FeatureCollection } from "geojson"
import { BaseMap } from "@/classes/BaseMap"
import { HistogramSlider } from "@/classes/HistogramSlider"
import { convert } from "geo-coordinates-parser"

export class Store {
  // ////////////// ---------APP STATE---------- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  private appState: ApplicationState = reactive({
    isMenuVisible: false,
    isPopUpVisible: false,
    popUpType: null,
    popUpData: null,
    virtualVisitAlreadyOpened: false,
    minDate: new Date(2016, 0, 1),
    maxDate: new Date(),
    switch: {
      rescue: true,
      transfer: true,
      harbor: true,
      srr: true
    }
  })

  public getState () {
    return this.appState
  }

  public updateMenuVisibility () {
    this.appState.isMenuVisible = !this.appState.isMenuVisible
  }

  public updatePopUpVisibility () {
    this.appState.isPopUpVisible = !this.appState.isPopUpVisible
  }

  public setPopUpData (data: OpsData, type: PopUpType) {
    this.appState.popUpType = type
    this.appState.popUpData = data
  }

  public switchVirtualVisitVisibility () {
    this.appState.virtualVisitAlreadyOpened = !this.appState.virtualVisitAlreadyOpened
  }

  // ////////////// ---------DATA STATE---------- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  private dataState: DataState = reactive({
    allData: [],
    harbors: {} as FeatureCollection,
    sar: {} as FeatureCollection,
    sarCenters: {} as FeatureCollection,
    dataLoaded: false
  })

  private baseMap = new BaseMap()
  private histogramSlider = new HistogramSlider()

  public async initStore (): Promise<void> {
    this.dataState.harbors = await this.getHarbors()
    this.dataState.sar = require("./assets/resources/SAR.json")
    this.dataState.sarCenters = require("./assets/resources/SAR_centers.json")
    this.dataState.allData = await fetchOpsData()
    this.dataState.dataLoaded = true
    this.updateHistogramSlider()
    this.updateStats(this.dataState.allData)
  }

  public getData () {
    return this.dataState
  }

  public filterData (minDate: Date, maxDate: Date): void {
    this.appState.minDate = new Date(minDate)
    this.appState.maxDate = new Date(maxDate)
    const timeFilteredData = this.dataState.allData.filter(currentOperation => this.appState.minDate <= currentOperation.date && currentOperation.date <= this.appState.maxDate)
    this.baseMap.updateOperationsData(timeFilteredData)
    this.updateStats(timeFilteredData)
  }

  public displayMap (): void {
    this.baseMap.setData(this.dataState.harbors, this.dataState.allData, this.dataState.sar, this.dataState.sarCenters)
    this.baseMap.updateFiltersState(this.appState.switch)
    this.baseMap.initMap()
  }

  public updateBasemap (index: number): void {
    this.baseMap.setCurrentBasemap(index)
  }

  displayHistogramSlider (askedMin: number, askedMax: number, data: number[]): void {
    this.histogramSlider.display(askedMin, askedMax, data)
  }

  setWidthHistogramSlider (width: number): void {
    this.histogramSlider.setWidth(width)
  }

  updateHistogramSlider (): void {
    this.histogramSlider.updateHistogram(this.dataState.allData.map(d => d.date.getTime()), this)
  }

  updateHistogramSliderFromTo (): void {
    this.histogramSlider.updateSlider(this.appState.minDate.valueOf(), this.appState.maxDate.valueOf())
    this.updateHistogramSlider()
  }

  updateStats (timeFilteredData: OpsData[]): void {
    updateStats(this.appState.minDate, this.appState.maxDate, timeFilteredData)
  }

  toggleSwitch (switchId: keyof typeof SwitchType): void {
    this.appState.switch[switchId] = !this.appState.switch[switchId]
    this.baseMap.updateFiltersState(this.appState.switch)
  }

  getCssClass (id: keyof typeof SwitchType): {[key: string]: boolean} {
    return CssClass[id]
  }

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

  // setVideoAndPicturePopUpVisibility: (visible: boolean) => void;
  // isVideoAndPicturePopUpVisible: boolean;

  // setPopUpVideoUrls: (popUpVideoUrls: string) => void;
  // popUpVideoUrls: string[];

  // setPopUpImageUrls: (popUpImageUrls: string) => void;
  // popUpImageUrls: string[];

  // switchVirtualVisitVisibility: () => void;
  // virtualVisitVisibility: boolean;

  // virtualVisitAlreadyOpened: boolean;
}

// _isMenuVisible: false,

// updateMenuVisibility () {
//   this._isMenuVisible = !this._isMenuVisible
// },

// get isMenuVisible (): boolean {
//   return this._isMenuVisible
// },

// _isPopUpVisible: false,

// updatePopUpVisibility () {
//   this._isPopUpVisible = !this._isPopUpVisible
// },

// get isPopUpVisible (): boolean {
//   return this._isPopUpVisible
// },

// _popUpData: null,
// setPopUpData (data, type) {
//   this._popUpData = data
// },

// _isVideoAndPicturePopUpVisible: false,

// setVideoAndPicturePopUpVisibility (visible: boolean) {
//   this._isVideoAndPicturePopUpVisible = visible
// },

// get isVideoAndPicturePopUpVisible (): boolean {
//   return this._isVideoAndPicturePopUpVisible
// },

// _popUpVideoUrls: [""],

// setPopUpVideoUrls (popUpVideoUrls: string) {
//   this._popUpVideoUrls = popUpVideoUrls.split(",")
// },

// get popUpVideoUrls (): string[] {
//   return this._popUpVideoUrls
// },

// _popUpImageUrls: [""],

// setPopUpImageUrls (popUpImageUrls: string) {
//   this._popUpImageUrls = popUpImageUrls.split(",")
// },

// get popUpImageUrls (): string[] {
//   return this._popUpImageUrls
// },

// _virtualVisitVisibility: false,

// switchVirtualVisitVisibility (): void {
//   this._virtualVisitVisibility = !this._virtualVisitVisibility
//   this.updateVirtualVisitAlreadyOpened()
// },

// get virtualVisitVisibility (): boolean {
//   return this._virtualVisitVisibility
// },

// _virtualVisitAlreadyOpened: false,

// updateVirtualVisitAlreadyOpened (): void {
//   this._virtualVisitAlreadyOpened = true
// },

// get virtualVisitAlreadyOpened (): boolean {
//   return this._virtualVisitAlreadyOpened
// }
// })
