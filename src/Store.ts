import { OpsData, fetchOpsData } from "./classes/data/OpsData"
import { updateStats } from "./classes/PopUpAndStats"
import { ApplicationState, DataState, PopUpType, SwitchType } from "./classes/State"
import { reactive } from "vue"
import { FeatureCollection } from "geojson"
import { BaseMap } from "@/classes/BaseMap"
import { HistogramSlider } from "@/classes/HistogramSlider"
import { getHarbors } from "./classes/data/Harbors"
import { OtherData, getOtherData } from "./classes/data/OtherData"

export class Store {
  // ////////////// ---------APP STATE---------- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  private appState: ApplicationState = reactive({
    isMenuVisible: false,
    isPopUpVisible: false,
    isImageModalVisible: false,
    imageModalUrl: "",
    popUpType: null,
    popUpData: null,
    virtualVisitAlreadyOpened: false,
    minDate: new Date(2016, 2, 7),
    maxDate: new Date(),
    switch: {
      rescue: true,
      transfer: true,
      medEvac: false,
      harbor: true,
      srr: true,
      incident: false,
      death: false,
      shipwreck: false,
      zone12Miles: true
    },
    informationTooltip: {
      visible: false,
      position: {
        orientation: "left",
        x: 0,
        y: 0
      },
      content: {
        title: "",
        text: ""
      }
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

  public updateImageModalVisibility (visibility: boolean) {
    this.appState.isImageModalVisible = visibility
  }

  public setImageModalUrl (url: string) {
    this.appState.imageModalUrl = url
  }

  public setPopUpData (data: OpsData | OtherData, type: PopUpType) {
    this.appState.popUpType = type
    this.appState.popUpData = data
    this.updatePopUpVisibility()
  }

  public switchVirtualVisitVisibility () {
    this.appState.virtualVisitAlreadyOpened = !this.appState.virtualVisitAlreadyOpened
  }

  public setInformationTooltipParameters (visible: boolean, position?: ApplicationState["informationTooltip"]["position"], content?: ApplicationState["informationTooltip"]["content"]) {
    if (position) this.appState.informationTooltip.position = position
    if (content) this.appState.informationTooltip.content = content
    this.appState.informationTooltip.visible = visible
  }

  public getTooltipPosition () {
    const position: any = {}
    this.appState.informationTooltip.position.orientation === "right"
      ? position.top = this.appState.informationTooltip.position.y - 15 + "px"
      : position.bottom = (window.innerHeight - this.appState.informationTooltip.position.y) + 5 + "px"
    this.appState.informationTooltip.position.orientation === "right"
      ? position.left = this.appState.informationTooltip.position.x + 15 + "px"
      : position.right = (window.innerWidth - this.appState.informationTooltip.position.x) + 15 + "px"
    return position
  }

  // ////////////// ---------DATA STATE---------- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  private dataState: DataState = reactive({
    OpsData: [],
    otherData: {} as DataState["otherData"],
    harbors: {} as FeatureCollection,
    sar: {} as FeatureCollection,
    sarCenters: {} as FeatureCollection,
    zones12Miles: {} as FeatureCollection,
    dataLoaded: false
  })

  private baseMap = new BaseMap()
  private histogramSlider = new HistogramSlider()

  public async initStore (): Promise<void> {
    this.dataState.harbors = await getHarbors()
    this.dataState.otherData = await getOtherData()
    this.dataState.sar = require("./assets/resources/SAR.json")
    this.dataState.sarCenters = require("./assets/resources/SAR_centers.json")
    this.dataState.zones12Miles = require("./assets/resources/zones_12_miles.json")
    this.dataState.OpsData = await fetchOpsData()
    this.dataState.dataLoaded = true
    this.updateHistogramSlider()
    this.updateStats(this.dataState.OpsData)
  }

  public getData () {
    return this.dataState
  }

  public filterData (minDate: Date, maxDate: Date): void {
    this.appState.minDate = new Date(minDate)
    this.appState.maxDate = new Date(maxDate)
    const timeFilteredData = this.dataState.OpsData.filter(currentOperation => this.appState.minDate <= currentOperation.date && currentOperation.date <= this.appState.maxDate)
    this.baseMap.updateOperationsData(timeFilteredData)
    this.updateStats(timeFilteredData)
  }

  public displayMap (): void {
    this.baseMap.setData(this.dataState.harbors, this.dataState.OpsData, this.dataState.otherData, this.dataState.sar, this.dataState.sarCenters, this.dataState.zones12Miles)
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
    this.histogramSlider.updateHistogram(this.dataState.OpsData.map(d => d.date.getTime()), this)
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
}
