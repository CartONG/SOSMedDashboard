import { OpsData } from './opsData'
import { BaseMap } from './BaseMap'
import { HistogramSlider } from '../classes/HistogramSlider'

// State class which keeps the current state of the application
export class State {
  timeFilteredData: OpsData[] = [];
  minDate = new Date();
  maxDate = new Date();
  baseMap = new BaseMap();
  histogramSlider = new HistogramSlider()
}
