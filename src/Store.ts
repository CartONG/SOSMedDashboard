import { OpsData, fetchOpsData } from "./classes/OpsData"
import { updateStats } from "./classes/PopUpAndStats"
import { State } from "./classes/State"

// Constant to expose and manage the store
// It could be seen as a static class
export const store = {
  allData: [] as OpsData[],
  state: new State(),

  filterData (minDate: Date, maxDate: Date) {
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

  async initStore () {
    this.allData = await fetchOpsData()
    this.updateHistogramSlider()
    this.filterData(this.state.minDate, this.state.maxDate)
  },

  displayMap () {
    this.state.baseMap.display(this.state.timeFilteredData)
  },

  updateMap () {
    this.state.baseMap.update(this.state.timeFilteredData)
  },

  destroyMap () {
    this.state.baseMap.destroy()
  },

  displayHistogramSlider (askedWidth: number, askedMin: number, askedMax: number, data: number[]) {
    this.state.histogramSlider.display(askedWidth, askedMin, askedMax, data)
  },

  updateHistogramSlider () {
    this.state.histogramSlider.updateHistogram(this.allData.map(d => d.date.getTime()), this)
  },

  updateStats () {
    updateStats(this.state)
  }
}
