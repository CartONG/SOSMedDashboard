import { OpsData } from './opsData'
import { State } from './state'

const numberToString = function (n: number) {
  if (isNaN(n)) {
    return ''
  } else {
    return n.toString()
  }
}

const setInnerText = function (elemId: string, textToAdd: string) {
  const elem = document.getElementById(elemId)
  if (elem) {
    elem.innerText = textToAdd
  }
}

const fillPopUp = function (data: OpsData) {
  setInnerText('popUpTypeOps', data.typeOps)
  setInnerText('popUpDate', data.date.toDateString())
  setInnerText('popUpBoatType', data.boatType)
  setInnerText('popUpNbSurvivor', numberToString(data.nbSurvivor))
  setInnerText('popUpFemale', numberToString(data.female))
  setInnerText('popUpMale', numberToString(data.male))
  setInnerText('popUpMinor', numberToString(data.under18))
  setInnerText('popUpPregnant', numberToString(data.pregnantwomen))
  setInnerText('popUpUnaccompagnied', numberToString(data.under18unacc))
  setInnerText('popUpChildren', numberToString(data.under5))
  setInnerText('popUpNationalities', numberToString(data.nbNationalities))
  setInnerText('popUpWind', numberToString(data.windForce))
  setInnerText('popUpWave', numberToString(data.waveHeight))
  setInnerText('popUpLat', numberToString(data.latitude))
  setInnerText('popUpLon', numberToString(data.longitude))
}

export const showPopUp = function (data: OpsData) {
  const popUp = document.getElementById('popUp')
  if (popUp) {
    popUp.classList.add('scale-100')
  }
  fillPopUp(data)
}

export const updateStats = function (state: State) {
  setInnerText('statsMinDate', state.minDate.toDateString())
  setInnerText('statsMaxDate', state.maxDate.toDateString())
  let nbSurvivor = 0
  let female = 0
  let male = 0
  let under18 = 0
  let pregnantwomen = 0
  let under18unacc = 0
  let under5 = 0
  let nbNationalities = 0
  const days = new Set()
  for (const data of state.timeFilteredData) {
    nbSurvivor = data.nbSurvivor ? nbSurvivor + data.nbSurvivor : nbSurvivor
    female = data.female ? female + data.female : female
    male = data.male ? male + data.male : male
    under18 = data.under18 ? under18 + data.under18 : under18
    pregnantwomen = data.pregnantwomen ? pregnantwomen + data.pregnantwomen : pregnantwomen
    under18unacc = data.under18unacc ? under18unacc + data.under18unacc : under18unacc
    under5 = data.under5 ? under5 + data.under5 : under5
    nbNationalities = data.nbNationalities ? Math.max(nbNationalities, data.nbNationalities) : nbNationalities
    days.add(data.date)
  }
  setInnerText('statsNbSurvivor', numberToString(nbSurvivor))
  setInnerText('statsFemale', numberToString(female))
  setInnerText('statsMale', numberToString(male))
  setInnerText('statsMinor', numberToString(under18))
  setInnerText('statsPregnant', numberToString(pregnantwomen))
  setInnerText('statsUnaccompagnied', numberToString(under18unacc))
  setInnerText('statsChildren', numberToString(under5))
  setInnerText('statsNationalities', numberToString(nbNationalities))
  setInnerText('statsNbDays', numberToString(days.size))
  // Mobile view
  setInnerText('statsMinDate2', state.minDate.toDateString())
  setInnerText('statsMaxDate2', state.maxDate.toDateString())
  setInnerText('statsNbSurvivor2', numberToString(nbSurvivor))
  setInnerText('statsNbDays2', numberToString(days.size))
}
