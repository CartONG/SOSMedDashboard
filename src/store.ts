import { fetchOpsData } from './classes/opsData'
import { State } from './classes/state'
import { reactive, toRefs } from 'vue'

const state = reactive(new State())

export default function useStore () {
  const updateMap = function () {
    state.baseMap.update(state.timeFilteredData)
  }

  const filterData = function (minDate: Date, maxDate: Date) {
    state.timeFilteredData = []
    for (const data of state.allData) {
      if ((minDate <= data.date) && (data.date <= maxDate)) {
        state.timeFilteredData.push(data)
      }
    }
    updateMap()
  }

  const initStore = async function () {
    state.allData = await fetchOpsData()
    state.minDate = new Date('2016-01-01')
    state.maxDate = new Date()
    filterData(state.minDate, state.maxDate)
  }

  const displayMap = function () {
    state.baseMap.display(state.timeFilteredData)
  }

  const destroyMap = function () {
    state.baseMap.destroy()
  }

  return {
    ...toRefs(state),
    initStore,
    displayMap,
    destroyMap
  }
}
