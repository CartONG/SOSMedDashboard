import { Map } from "mapbox-gl"

export function loadImage (map:Map, url: string): Promise<ImageBitmap> {
  return new Promise((resolve, reject) => {
    map.loadImage(url, (error, image) => {
      if (error) {
        reject(error)
      } else {
        resolve(image as ImageBitmap)
      }
    })
  })
}
