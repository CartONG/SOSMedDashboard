import { convert } from "geo-coordinates-parser"
import { FeatureCollection } from "geojson"

export async function getHarbors (): Promise<FeatureCollection> {
  const harborsUrl = `https://sheets.googleapis.com/v4/spreadsheets/1opF61Qq2DgrJIP-kQD5-KHzC4xZkp2u_zqigTGk3V0I/values/Data_ports?key=${process.env.VUE_APP_GOOGLE_API_KEY}`
  const sheet: { values: [string, string, string][] } = await (await fetch(harborsUrl)).json()
  sheet.values.shift()
  const harbors: FeatureCollection = {
    type: "FeatureCollection",
    features: []
  }
  // eslint-disable-next-line array-callback-return
  sheet.values.map(x => {
    const rawCoordinates = x[1] + ", " + x[2]
    try {
      const coordinates = convert(rawCoordinates)
      harbors.features.push({
        type: "Feature",
        properties: { name: x[0] },
        geometry: {
          coordinates: [
            coordinates.decimalLongitude,
            coordinates.decimalLatitude
          ],
          type: "Point"
        }
      })
    } catch (error) {
      console.error("Error on ports:" + x)
    }
  })
  return Promise.resolve(harbors)
}
