/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpsData } from "@/classes/OpsData"
import { FeatureCollection } from "geojson"

export function opsDataToGeoJSON (rawData: OpsData[]): FeatureCollection {
  const featuresCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: []
  }
  // eslint-disable-next-line array-callback-return
  rawData.map(x => {
    if (x.imageSrc.length === 0) {
      (x as any).imageSrc = ""
    }
    if (x.videoSrc.length === 0) {
      (x as any).videoSrc = ""
    }
    if (x.imageSrc.length > 0 && typeof (x.imageSrc) !== "string") {
      (x as any).imageSrc = x.imageSrc.join()
    }
    if (x.videoSrc.length > 0 && typeof (x.videoSrc) !== "string") {
      (x as any).videoSrc = x.videoSrc.join()
    }
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
  })

  return featuresCollection
}
