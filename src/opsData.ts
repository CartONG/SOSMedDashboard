import convert from 'geo-coordinates-parser'

export class RawOpsData {
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
  typeOps = ''
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

export function convertOpsData (rawOpsData: RawOpsData, metadataErrorLog?: string) {
  const res = new OpsData()
  res.date = new Date(rawOpsData.gsx$date.$t)
  res.typeOps = rawOpsData.gsx$typeops.$t
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
