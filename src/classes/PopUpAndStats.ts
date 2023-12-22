import { OpsData } from "./OpsData"
import { reactiveStore, store } from "@/Store"

const numberToString = function (n: number) {
  if (isNaN(n)) {
    return "0"
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
  setInnerText("popUpTypeOps", data.typeOps)
  setInnerText("popUpDate", new Date(data.date).toDateString())
  setInnerText("popUpBoatType", data.boatType)
  setInnerText("popUpPort", data.portDisembarkation)
  setInnerText("popUpNbSurvivor", numberToString(data.nbSurvivor))
  setInnerText("popUpFemale", numberToString(data.female))
  setInnerText("popUpMale", numberToString(data.male))
  setInnerText("popUpMinor", numberToString(data.under18))
  setInnerText("popUpPregnant", numberToString(data.pregnantWomen))
  setInnerText("popUpUnaccompagnied", numberToString(data.under18unacc))
  setInnerText("popUpChildren", numberToString(data.under5))
  setInnerText("popUpNationalities", numberToString(data.nbNationalities ? data.nbNationalities.split(";").length : 0))
  setInnerText("popUpWind", numberToString(data.windForce))
  setInnerText("popUpWave", numberToString(data.waveHeight))
  setInnerText("popUpLat", numberToString(data.latitude))
  setInnerText("popUpLon", numberToString(data.longitude))
}

export const showPopUp = function (data: OpsData): void {
  reactiveStore.updatePopUpVisibility()
  fillPopUp(data)
  reactiveStore.setVideoAndPicturePopUpVisibility(data.imageSrc.length > 0 || data.videoSrc.length > 0)
  reactiveStore.setPopUpVideoUrls(data.videoSrc as unknown as string)
  reactiveStore.setPopUpImageUrls(data.imageSrc as unknown as string)
}

export const updateStats = function (minDate: Date, maxDate: Date, timeFilteredData: OpsData[]): void {
  setInnerText("statsMinDate", getFormattedDate(minDate))
  setInnerText("statsMaxDate", getFormattedDate(maxDate))
  let nbSurvivor = 0
  let female = 0
  let male = 0
  let under18 = 0
  let pregnantwomen = 0
  let under18unacc = 0
  let under5 = 0
  let nbNationalities = 0
  const nbRescueOps = store.allData.map(x => x.nbOps).reduce((acc, currentVal) => acc + currentVal, 0)
  let filteredNbRescueOps = 0
  const nbPeopleAssisted = store.allData.filter(el => el.nbSurvivor).map(
    el => el.nbSurvivor).reduce((partialSum, a) => partialSum + a, 0)
  const nationalitiesList = []
  for (const data of timeFilteredData) {
    nbSurvivor = data.nbSurvivor ? nbSurvivor + data.nbSurvivor : nbSurvivor
    female = data.female ? female + data.female : female
    male = data.male ? male + data.male : male
    under18 = data.under18 ? under18 + data.under18 : under18
    pregnantwomen = data.pregnantWomen ? pregnantwomen + data.pregnantWomen : pregnantwomen
    under18unacc = data.under18unacc ? under18unacc + data.under18unacc : under18unacc
    under5 = data.under5 ? under5 + data.under5 : under5
    // nbRescueOps += data.nbOps
    if (data.nbNationalities) nationalitiesList.push(data.nbNationalities.split(";"))
    filteredNbRescueOps += data.nbOps
  }
  nbNationalities = [...new Set(nationalitiesList.flat())].length
  setInnerText("statsNbSurvivor", numberToString(nbSurvivor))
  setInnerText("statsFemale", numberToString(female))
  setInnerText("statsMale", numberToString(male))
  setInnerText("statsMinor", numberToString(under18))
  setInnerText("statsPregnant", numberToString(pregnantwomen))
  setInnerText("statsUnaccompagnied", numberToString(under18unacc))
  setInnerText("statsChildren", numberToString(under5))
  setInnerText("statsNationalities", numberToString(nbNationalities))
  setInnerText("statsOps3", numberToString(filteredNbRescueOps))
  setInnerText("statsNbOperations", numberToString(nbRescueOps))
  setInnerText("statsNbOperationsMobile", numberToString(nbRescueOps))
  setInnerText("statsNbPeopleAssisted", numberToString(nbPeopleAssisted))
  setInnerText("statsNbPeopleAssistedMobile", numberToString(nbPeopleAssisted))
  // Mobile view
  setInnerText("statsMinDate2", getFormattedDate(minDate))
  setInnerText("statsMaxDate2", getFormattedDate(maxDate))
  setInnerText("statsNbSurvivor2", numberToString(nbSurvivor))
  setInnerText("statsOps2", numberToString(filteredNbRescueOps))
}

function getFormattedDate (date: Date) {
  const year = date.getFullYear()
  const month = (1 + date.getMonth()).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")

  return month + "/" + day + "/" + year
}
