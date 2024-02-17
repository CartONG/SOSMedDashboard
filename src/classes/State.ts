import { OpsData } from "./OpsData"
import { FeatureCollection } from "geojson"

export enum SwitchType {
  harbor = "harbor",
  rescue = "rescue",
  srr = "srr",
  transfer = "transfer"
}

export enum PopUpType {
  OPS = "OPS",
  DEAD = "DEAD",
  INCIDENT = "INCIDENT",
  SHIPWRECK = "SHIPWRECK"
}
export interface ApplicationState {
  isMenuVisible: boolean;
  isPopUpVisible: boolean;
  popUpType: PopUpType | null;
  popUpData: OpsData | null;
  virtualVisitAlreadyOpened: boolean;
  minDate: Date;
  maxDate: Date;
  switch: { [key in SwitchType]: boolean }
}

export interface DataState {
  allData: OpsData[]
  harbors: FeatureCollection
  sar: FeatureCollection
  sarCenters: FeatureCollection
  dataLoaded: boolean
}

export const CssClass: {
  [key in SwitchType]: { [key: string]: boolean }
} = {
  harbor: { icon: true, "icon-anchor-o": true, "text-black": true, "text-xs": true },
  rescue: { "bg-secondary": true },
  srr: { "text-grayClose": true, "legend-srr": true },
  transfer: { "bg-gray-400": true }
}
