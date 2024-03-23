import { OpsData } from "./data/OpsData"
import { store } from "@/main"

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

export const updateStats = function (minDate: Date, maxDate: Date, timeFilteredData: OpsData[]): void {
  setInnerText("statsMinDate", minDate.toLocaleDateString())
  setInnerText("statsMaxDate", maxDate.toLocaleDateString())
  let nbSurvivor = 0
  let female = 0
  let male = 0
  let under18 = 0
  let pregnantwomen = 0
  let under18unacc = 0
  let under5 = 0
  let nbNationalities = 0
  const nbRescueOps = store.getData().OpsData.map(x => x.nbOps).reduce((acc, currentVal) => acc + currentVal, 0)
  let filteredNbRescueOps = 0
  const nbPeopleAssisted = store.getData().OpsData.filter(el => el.nbSurvivor).map(
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
