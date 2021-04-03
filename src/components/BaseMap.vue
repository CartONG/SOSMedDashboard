<template>
  <div id='mapContainer' class='basemap'></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  name: 'BaseMap',
  data () {
    return {
      // This token was taken from the demo project we need to replace with a real token
      accessToken: 'pk.eyJ1Ijoid2VzbGV5YmFuZmllbGQiLCJhIjoiY2pmMDRwb202MGlzNDJ3bm44cHA3YXZiNCJ9.b2yOf2vbWnWiV7mlsFAywg'
    }
  },
  mounted () {
    mapboxgl.accessToken = this.accessToken

    const map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/sosmediterranee/ckkdvswwr0ol117t7d91p7wac',
      center: [7.5956888, 41.4316886],
      zoom: 3.5
    })

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl())
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.basemap {
  width: 100vw;
  /* This needs to be made 100% or something to fill rest of vertical space */
  height: 80vh;
  /* This works to center horizontally we probably need to do something else to center vertically depending on where this sits */
  margin: auto;
}
</style>
