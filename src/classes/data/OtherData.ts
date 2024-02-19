import { convert } from "geo-coordinates-parser"
import { Feature, FeatureCollection } from "geojson"
import { DataState } from "../State"

export enum OtherDataTypes {
    SHIPWRECK = "Shipwreck",
    DEATH = "Missing_death",
    INCIDENT = "Incident"
}

export async function getOtherData (): Promise<DataState["otherData"]> {
  try {
    const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/1opF61Qq2DgrJIP-kQD5-KHzC4xZkp2u_zqigTGk3V0I/values/Other_data?key=${process.env.VUE_APP_GOOGLE_API_KEY}`
    const sheet: { values: any[] } = await (await fetch(dataUrl)).json()
    sheet.values.shift()
    const dataset:DataState["otherData"] = {
      incidents: {
        type: "FeatureCollection",
        features: []
      },
      deaths: {
        type: "FeatureCollection",
        features: []
      },
      shipwrecks: {
        type: "FeatureCollection",
        features: []
      }
    }
    // eslint-disable-next-line array-callback-return
    sheet.values.map((x, i) => {
      const rawCoordinates = x[2] + ", " + x[3]
      try {
        const coordinates = convert(rawCoordinates)
        const data: Feature = {
          type: "Feature",
          properties: {
            date: new Date(x[0]),
            type: x[1],
            latitude: coordinates.decimalLatitude,
            longitude: coordinates.decimalLongitude,
            windForce: x[3],
            waveHeight: x[4],
            boatType: x[5],
            deathNumber: x[6],
            incAction: x[7],
            shipwreckNumber: x[8],
            boatInvolved: x[9],
            testimonyName: x[10],
            testimonySrc: x[11],
            imageSrc: x[12],
            videoSrc: x[13]
          },
          geometry: {
            coordinates: [
              coordinates.decimalLongitude,
              coordinates.decimalLatitude
            ],
            type: "Point"
          }
        }
        if (data.properties?.type === OtherDataTypes.INCIDENT) dataset.incidents.features.push(data)
        if (data.properties?.type === OtherDataTypes.DEATH) dataset.deaths.features.push(data)
        if (data.properties?.type === OtherDataTypes.SHIPWRECK) dataset.shipwrecks.features.push(data)
      } catch (error) {
        console.log(x)
        console.log("error on other data for line " + i)
      }
    })
    return Promise.resolve(dataset)
  } catch (error) {
    return Promise.reject(error)
  }
}

export interface OtherData {
    date: Date;
    type: OtherDataTypes;
    latitude: number;
    longitude: number;
    windForce: number | null;
    waveHeight: number | null;
    boatType: string | null;
    deathNumber: number | null;
    incAction: string | null;
    shipwreckNumber: number | null;
    boatInvolved: string;
    testimonyName: string | null;
    testimonySrc: string | null;
    imageSrc: string | null;
    videoSrc: string | null;
}
