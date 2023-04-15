import { IControl, Map } from "mapbox-gl"
import { BASEMAPS } from "@/classes/BaseMap"
import { store } from "@/Store"

export class BaseMapPickerControl implements IControl {
  private map?: Map
  private readonly container: HTMLDivElement

  constructor () {
    this.container = document.createElement("div")
  }

  onAdd (map: Map): HTMLElement {
    this.map = map
    this.container.className = "BaseMapPicker"
    const buttonGroup = document.createElement("div")
    buttonGroup.className = "mapboxgl-ctrl-group mapboxgl-ctrl"

    const button = document.createElement("button")
    button.className = "mapboxgl-ctrl-icon mapbox-gl-change_layer icon icon-layers BaseMapPicker__btn"
    button.onclick = () => {
      BaseMapPickerControl.toggleDropDownButtonVisibility()
    }
    buttonGroup.append(button)
    const dropDown = document.createElement("div")

    dropDown.id = "BaseMapPicker__dropdownItem"
    dropDown.className = "BaseMapPicker__dropdownContent"
    for (const basemap of BASEMAPS) {
      const currentBaseMapContainer = document.createElement("div")
      currentBaseMapContainer.className = "mapboxgl-ctrl-group mapboxgl-ctrl BaseMapPicker__itemBtnGrp"
      const baseMapButton = document.createElement("button")

      baseMapButton.className = "mapboxgl-ctrl-icon BaseMapPicker__btn"
      baseMapButton.style.backgroundImage = `url(${process.env.BASE_URL}${basemap.img})`
      baseMapButton.onclick = () => {
        BaseMapPickerControl.toggleDropDownButtonVisibility()
        store.updateBasemap(basemap.id)
      }
      currentBaseMapContainer.append(baseMapButton)
      dropDown.appendChild(currentBaseMapContainer)
    }
    this.container.append(buttonGroup, dropDown)

    BaseMapPickerControl.hideOnClickOutside(this.container)

    return this.container
  }

  onRemove (): void {
    this.container?.parentNode?.removeChild(this.container)
    this.map = undefined
  }

  private static toggleDropDownButtonVisibility () {
    const item = document.getElementById("BaseMapPicker__dropdownItem")
    if (!item) {
      throw new Error("Could not find base map picker")
    }
    item.classList.toggle("BaseMapPicker__show")
  }

  private static hideOnClickOutside (element:HTMLElement) {
    const outsideClickListener = (event: MouseEvent) => {
      const item = document.getElementById("BaseMapPicker__dropdownItem")
      if (!element.contains(event.target as HTMLElement) && BaseMapPickerControl.isVisible(element) &&
          item && item.classList.contains("BaseMapPicker__show")) { // or use: event.target.closest(selector) === null
        BaseMapPickerControl.toggleDropDownButtonVisibility()
      }
    }

    document.addEventListener("click", outsideClickListener)
  }

  private static isVisible (elem:HTMLElement) {
    return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
  }
}
