/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpsData } from "@/classes/data/OpsData"
import { FeatureCollection } from "geojson"

export function opsDataToGeoJSON (rawData: OpsData[]): FeatureCollection {
  const featuresCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: []
  }
  // eslint-disable-next-line array-callback-return
  rawData.map(x => {
    if (!isNaN(x.latitude) || !isNaN(x.longitude)) {
      featuresCollection.features.push({
        type: "Feature",
        properties: { ...x },
        geometry: {
          coordinates: [
            x.longitude,
            x.latitude
          ],
          type: "Point"
        }
      })
    }
  })

  return featuresCollection
}
