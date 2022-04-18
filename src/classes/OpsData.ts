import convert from "geo-coordinates-parser"

const dataRequestUrl = `https://sheets.googleapis.com/v4/spreadsheets/1mK5tq3gfnc0OckQnArz1TXhh4YINAWfF7ilYa5PhOw8/values/data_sos?key=${process.env.VUE_APP_GOOGLE_API_KEY}`

export enum TypeOps {
  Rescue = "Rescue",
  Transfer = "Transfer"
}

export class OpsData {
  date = new Date()
  typeOps = TypeOps.Rescue
  nbOps = NaN
  nbSurvivor = NaN
  male = NaN
  female = NaN
  under18 = NaN
  under18unacc = NaN
  under5 = NaN
  pregnantWomen = NaN
  latitude = NaN
  longitude = NaN
  windForce = NaN
  waveHeight = NaN
  boatType = ""
  nbNationalities = NaN
  transfertType = ""
  portDisembarkation = ""
}

const createDate = function (dateDayFirst: string) {
  const dateSplit = dateDayFirst.split("/")
  return new Date(parseInt(dateSplit[2]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[0]))
}

const convertOpsData = function (rawOpsData: {[key: string]: string}, metadataErrorLog?: string) {
  const res = new OpsData()
  res.date = createDate(rawOpsData.date)
  res.typeOps = rawOpsData.typeOps as TypeOps
  res.nbOps = parseInt(rawOpsData.nbOps)
  res.nbSurvivor = parseInt(rawOpsData.nbSurvivor)
  res.male = parseInt(rawOpsData.male)
  res.female = parseInt(rawOpsData.female)
  res.under18 = parseInt(rawOpsData.under18)
  res.under18unacc = parseInt(rawOpsData.under18unacc)
  res.under5 = parseInt(rawOpsData.under5)
  res.pregnantWomen = parseInt(rawOpsData.pregnantWomen)
  const rawCoordinates = rawOpsData.latitude.concat(" ").concat(rawOpsData.longitude)
  try {
    const coordinates = convert(rawCoordinates)
    res.latitude = coordinates.decimalLatitude
    res.longitude = coordinates.decimalLongitude
  } catch {
    console.error(`Invalid coordinates ${rawCoordinates} for ${metadataErrorLog}`)
  }
  res.windForce = parseInt(rawOpsData.windForce)
  res.waveHeight = parseInt(rawOpsData.waveHeight)
  res.boatType = rawOpsData.boatType
  res.nbNationalities = parseInt(rawOpsData.nbNationalities)
  res.transfertType = rawOpsData.transfertType
  res.portDisembarkation = rawOpsData.PortDisembarkation
  return res
}

export const fetchOpsData = async function (): Promise<OpsData[]> {
  const sheet: { majorDimension: string; range: string; values: string[][] } = await (await fetch(dataRequestUrl)).json()

  const model = sheet.values.splice(0, 1)[0].map(value => {
    let valueFound
    while ((valueFound = /_([a-zA-Z0-9])/g.exec(value)) !== null) {
      value = value.replace(valueFound[0], valueFound[1].toLocaleUpperCase())
    }
    return value
  })

  return sheet.values.map((value, valueIndex) => {
    const newValue: { [key: string]: string } = {}
    model.forEach((currentProperty, index) => {
      newValue[currentProperty] = value[index]
    })

    return convertOpsData(newValue, `line ${valueIndex}`)
  })
}
