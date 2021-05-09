import { OpsData, fetchOpsData } from './classes/opsData'
import { State } from './classes/state'

// Constant to expose and manage the store
// It could be seen as a static class
export const store = {
  allData: [] as OpsData[],
  state: new State(),

  filterData (minDate: Date, maxDate: Date) {
    this.state.timeFilteredData = []
    for (const data of this.allData) {
      if ((minDate <= data.date) && (data.date <= maxDate)) {
        this.state.timeFilteredData.push(data)
      }
    }
  },

  async initStore () {
    this.allData = await fetchOpsData()
    this.state.minDate = new Date('2016-01-01')
    this.state.maxDate = new Date()
    this.filterData(this.state.minDate, this.state.maxDate)
  }
}
