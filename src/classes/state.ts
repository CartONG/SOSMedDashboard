import { OpsData } from './opsData'

// State class which keeps the current state of the application
export class State {
  timeFilteredData: OpsData[] = [];
  minDate = new Date();
  maxDate = new Date()
}
