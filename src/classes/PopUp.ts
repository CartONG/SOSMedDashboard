import { OpsData } from './opsData'

const numberToString = function (n: number) {
  if (isNaN(n)) {
    return ''
  } else {
    return n.toString()
  }
}

const fillPopUp = function (data: OpsData) {
  const popUpTypeOps = document.getElementById('popUpTypeOps')
  if (popUpTypeOps) {
    popUpTypeOps.innerText = data.typeOps
  }
  const popUpDate = document.getElementById('popUpDate')
  if (popUpDate) {
    popUpDate.innerText = data.date.toDateString()
  }
  const popUpBoatType = document.getElementById('popUpBoatType')
  if (popUpBoatType) {
    popUpBoatType.innerText = data.boatType
  }
  const popUpNbSurvivor = document.getElementById('popUpNbSurvivor')
  if (popUpNbSurvivor) {
    popUpNbSurvivor.innerText = numberToString(data.nbSurvivor)
  }
  const popUpWind = document.getElementById('popUpWind')
  if (popUpWind) {
    popUpWind.innerText = numberToString(data.windForce)
  }
  const popUpWave = document.getElementById('popUpWave')
  if (popUpWave) {
    popUpWave.innerText = numberToString(data.waveHeight)
  }
  const popUpLat = document.getElementById('popUpLat')
  if (popUpLat) {
    popUpLat.innerText = numberToString(data.latitude)
  }
  const popUpLon = document.getElementById('popUpLon')
  if (popUpLon) {
    popUpLon.innerText = numberToString(data.longitude)
  }
}

export const showPopUp = function (data: OpsData) {
  const popUp = document.getElementById('popUp')
  if (popUp) {
    popUp.classList.add('scale-100')
  }
  fillPopUp(data)
}
