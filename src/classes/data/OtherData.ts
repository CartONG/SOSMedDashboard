import { convert } from "geo-coordinates-parser"
import { Feature } from "geojson"
import { DataState } from "../State"
import { parse } from "@formkit/tempo"

export enum OtherDataTypes {
    SHIPWRECK = "Shipwreck",
    DEATH = "Dead & Missing",
    INCIDENT = "Incident"
}

export async function getOtherData (): Promise<DataState["otherData"]> {
  try {
    const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/1opF61Qq2DgrJIP-kQD5-KHzC4xZkp2u_zqigTGk3V0I/values/Other_data?key=${process.env.VUE_APP_GOOGLE_API_KEY}`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            date: parse(x[0], "DD-MM-YYYY"),
            type: x[1],
            latitude: coordinates.decimalLatitude,
            longitude: coordinates.decimalLongitude,
            windForce: x[4],
            waveHeight: x[5],
            boatType: x[6],
            deathNumber: x[7],
            incAction: x[8],
            shipwreckNumber: x[9],
            boatInvolved: x[10],
            testimonyName: x[11],
            testimonySrc: x[12],
            imageSrc: x[13],
            videoSrc: x[14]
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
        // eslint-disable-next-line no-console
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
    windForce: number;
    waveHeight: number;
    boatType: string;
    deathNumber: number;
    incAction: string;
    shipwreckNumber: number;
    boatInvolved: string;
    testimonyName: string;
    testimonySrc: string;
    imageSrc: string[];
    videoSrc: string[];
}
