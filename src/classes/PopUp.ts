import { OpsData } from './opsData'

const numberToString = function (n: number) {
  if (isNaN(n)) {
    return ''
  } else {
    return n.toString()
  }
}

const setInnerText = function (popUpElemId: string, textToAdd: string) {
  const popUpElem = document.getElementById(popUpElemId)
  if (popUpElem) {
    popUpElem.innerText = textToAdd
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
