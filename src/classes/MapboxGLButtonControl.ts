// Custom Buttons
export class MapboxGLButtonControl {
  _className: string
  _title: string
  _eventHandler!: (event: MouseEvent) => unknown
  _innerHTML: string
  _btn!: HTMLButtonElement
  _container!: HTMLDivElement

  constructor (className: string, title: string, eventHandler: (event: MouseEvent) => unknown, innerHTML: string) {
    this._className = className
    this._title = title
    this._eventHandler = eventHandler
    this._innerHTML = innerHTML
  }

  onAdd (): HTMLDivElement {
    this._btn = document.createElement("button")
    this._btn.className = "mapboxgl-ctrl-icon" + " " + this._className
    this._btn.type = "button"
    this._btn.title = this._title
    this._btn.onclick = this._eventHandler
    this._btn.innerHTML = this._innerHTML

    this._container = document.createElement("div")
    this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl"
    this._container.appendChild(this._btn)

    return this._container
  }

  onRemove (): void{
    if (this._container.parentNode) {
      this._container.parentNode.removeChild(this._container)
    }
  }
}
