import convert from 'geo-coordinates-parser'

const dataRequestUrl = 'https://spreadsheets.google.com/feeds/list/1mK5tq3gfnc0OckQnArz1TXhh4YINAWfF7ilYa5PhOw8/1/public/values?alt=json'

export enum TypeOps {
  Rescue = 'Rescue',
  Transfer = 'Transfer'
}

class RawOpsData {
  gsx$date: {$t: string} = { $t: '' }
  gsx$typeops: {$t: string} = { $t: '' }
  gsx$nbops: {$t: string} = { $t: '' }
  gsx$nbsurvivor: {$t: string} = { $t: '' }
  gsx$male: {$t: string} = { $t: '' }
  gsx$female: {$t: string} = { $t: '' }
  gsx$under18: {$t: string} = { $t: '' }
  gsx$under18unacc: {$t: string} = { $t: '' }
  gsx$under5: {$t: string} = { $t: '' }
  gsx$pregnantwomen: {$t: string} = { $t: '' }
  gsx$latitude: {$t: string} = { $t: '' }
  gsx$longitude: {$t: string} = { $t: '' }
  gsx$windforce: {$t: string} = { $t: '' }
  gsx$waveheight: {$t: string} = { $t: '' }
  gsx$boattype: {$t: string} = { $t: '' }
  gsx$nbnationalities: {$t: string} = { $t: '' }
  gsx$transfertype: {$t: string} = { $t: '' }
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
  pregnantwomen = NaN
  latitude = NaN
  longitude = NaN
  windForce = NaN
  waveHeight = NaN
  boatType = ''
  nbNationalities = NaN
  transfertType = ''
}

const createDate = function (dateDayFirst: string) {
  const dateSplit = dateDayFirst.split('/')
  return new Date(parseInt(dateSplit[2]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[0]))
}

const convertOpsData = function (rawOpsData: RawOpsData, metadataErrorLog?: string) {
  const res = new OpsData()
  res.date = createDate(rawOpsData.gsx$date.$t)
  res.typeOps = rawOpsData.gsx$typeops.$t as TypeOps
  res.nbOps = parseInt(rawOpsData.gsx$nbops.$t)
  res.nbSurvivor = parseInt(rawOpsData.gsx$nbsurvivor.$t)
  res.male = parseInt(rawOpsData.gsx$male.$t)
  res.female = parseInt(rawOpsData.gsx$female.$t)
  res.under18 = parseInt(rawOpsData.gsx$under18.$t)
  res.under18unacc = parseInt(rawOpsData.gsx$under18unacc.$t)
  res.under5 = parseInt(rawOpsData.gsx$under5.$t)
  res.pregnantwomen = parseInt(rawOpsData.gsx$pregnantwomen.$t)
  const rawCoordinates = rawOpsData.gsx$latitude.$t.concat(' ').concat(rawOpsData.gsx$longitude.$t)
  try {
    const coordinates = convert(rawCoordinates)
    res.latitude = coordinates.decimalLatitude
    res.longitude = coordinates.decimalLongitude
  } catch {
    console.error(`Invalid coordinates ${rawCoordinates} for ${metadataErrorLog}`)
  }
  res.windForce = parseInt(rawOpsData.gsx$windforce.$t)
  res.waveHeight = parseInt(rawOpsData.gsx$waveheight.$t)
  res.boatType = rawOpsData.gsx$boattype.$t
  res.nbNationalities = parseInt(rawOpsData.gsx$nbnationalities.$t)
  res.transfertType = rawOpsData.gsx$transfertype.$t
  return res
}

export const fetchOpsData = function () {
  return new Promise<OpsData[]>(function (resolve, reject) {
    fetch(dataRequestUrl)
      .then(res => res.json())
      .then((out) => {
        const rawOpsData: RawOpsData[] = out.feed.entry
        const opsData: OpsData[] = []
        let i = 0
        for (const data of rawOpsData) {
          opsData.push(convertOpsData(data, `line ${i}`))
          i += 1
        }
        resolve(opsData)
      })
      .catch(err => reject(err))
  })
}
