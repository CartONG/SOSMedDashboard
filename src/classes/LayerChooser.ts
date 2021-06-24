import { MapboxGLButtonControl } from './MapboxGLButtonControl'
import mapboxgl from 'mapbox-gl'

export class LayerChooser {
  _container!: HTMLDivElement;
  _layerChooser!: HTMLDivElement;
  _btn!: HTMLButtonElement;
  _map: mapboxgl.Map;
  _layers: Array<string>;

  constructor (map: mapboxgl.Map) {
    this._map = map
    this._layers = [
      'mapbox://styles/sosmediterranee/ckkdvswwr0ol117t7d91p7wac',
      'mapbox://styles/mapbox/satellite-v9',
      'mapbox://styles/mapbox/dark-v10'
    ]
  }

  hover () {
    const lc = document.getElementById('layerChooser')!
    lc.animate([
      // keyframes
      { transform: 'translateX(10px)', opacity: 0 },
      { transform: 'translateX(0px)', opacity: 1 }
    ], {
      // timing options
      duration: 250,
      iterations: 1
    })
    lc.hidden = false
  }

  undoHover () {
    const lc = document.getElementById('layerChooser')!
    lc.hidden = true
  }

  onAdd () {
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl flex flex-row'
    this._container.style.background = 'None'
    this._container.style.boxShadow = 'None'

    this._layerChooser = document.createElement('div')
    this._layerChooser.hidden = true
    this._layerChooser.id = 'layerChooser'
    this._layerChooser.style.background = 'white'
    this._layerChooser.style.marginRight = '10px'
    this._layerChooser.style.border = '4px'
    this._layerChooser.innerHTML = '<h1>Hello Wesley</h1>'

    this._container.appendChild(this._layerChooser)

    this._btn = document.createElement('button')
    this._btn.className = 'mapboxgl-ctrl-icon' + ' ' + 'mapbox-gl-change_layer'
    this._btn.style.background = 'white'
    this._btn.style.border = '4px'
    this._btn.type = 'button'
    this._btn.title = 'Change Layer'
    this._btn.addEventListener('mouseenter', this.hover)
    this._btn.addEventListener('mouseleave', this.undoHover)
    // this._btn.onclick = this._eventHandler
    this._btn.innerHTML = "<span class ='icon icon-layers text-2xl detail-color'/>"

    this._container.appendChild(this._btn)

    return this._container
  }

  onRemove () {
    if (this._container.parentNode) {
      this._container.parentNode.removeChild(this._container)
    }
  }
}
