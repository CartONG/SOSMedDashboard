<template>
  <div id='mapContainer' class='basemap'></div>
</template>

<script>
import { Vue } from 'vue-class-component'
import mapboxgl from 'mapbox-gl'
import { store } from '../store'

export default class extends Vue {
  currentState = store.state;
  data () {
    return {
      // This token was taken from the demo project we need to replace with a real token
      accessToken:
        'pk.eyJ1Ijoid2VzbGV5YmFuZmllbGQiLCJhIjoiY2pmMDRwb202MGlzNDJ3bm44cHA3YXZiNCJ9.b2yOf2vbWnWiV7mlsFAywg'
    }
  }

  mounted () {
    mapboxgl.accessToken = this.accessToken

    const layers = [
      'mapbox://styles/sosmediterranee/ckkdvswwr0ol117t7d91p7wac',
      'mapbox://styles/mapbox/satellite-v9',
      'mapbox://styles/mapbox/dark-v10'
    ]

    const map = new mapboxgl.Map({
      container: 'mapContainer',
      style: layers[0],
      center: [7.5956888, 41.4316886],
      zoom: 3.5
    })

    // Add data
    if (this.currentState.timeFilteredData) {
      for (const data of this.currentState.timeFilteredData) {
        if (!isNaN(data.longitude) && !isNaN(data.latitude)) {
          new mapboxgl.Marker().setLngLat([data.longitude, data.latitude]).addTo(map)
        }
      }
    }

    // Add zoom and rotation controls to the map.
    const nav = new mapboxgl.NavigationControl({
      showCompass: false,
      showZoom: true
    })
    map.addControl(nav)

    // Custom Buttons
    class MapboxGLButtonControl {
      constructor ({
        className = '',
        title = '',
        eventHandler = undefined,
        innerHTML = undefined
      }) {
        this._className = className
        this._title = title
        this._eventHandler = eventHandler
        this._innerHTML = innerHTML
      }

      onAdd (map) {
        this._btn = document.createElement('button')
        this._btn.className = 'mapboxgl-ctrl-icon' + ' ' + this._className
        this._btn.type = 'button'
        this._btn.title = this._title
        this._btn.onclick = this._eventHandler
        this._btn.innerHTML = this._innerHTML

        this._container = document.createElement('div')
        this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl'
        this._container.appendChild(this._btn)

        return this._container
      }

      onRemove () {
        this._container.parentNode.removeChild(this._container)
        this._map = undefined
      }
    }

    /* Event Handlers */
    let i = 0
    function nextLayer (event) {
      map.setStyle(layers[i % layers.length])
      i = i + 1
    }

    /* Instantiate new controls with custom event handlers */
    const changeLayers = new MapboxGLButtonControl({
      className: 'mapbox-gl-change_layer',
      title: 'Change Layer',
      eventHandler: nextLayer,
      innerHTML: 'L'
    })

    /* Add Controls to the Map */
    map.addControl(changeLayers, 'top-right')
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .basemap {
    width: 100vw;
    /* This needs to be made 100% or something to fill rest of vertical space */
    height: 80vh;
    /* This works to center horizontally we probably need to do something else to center vertically depending on where this sits */
    margin: auto;
  }
  #menu {
    position: absolute;
    background: #efefef;
    padding: 10px;
    font-family: 'Open Sans', sans-serif;
  }
</style>
