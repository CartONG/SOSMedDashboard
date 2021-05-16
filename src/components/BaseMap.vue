<template>
  <div id='mapContainer' class='basemap basemap-height-mobile sm:basemap-height-sm'></div>
</template>

<script>
import { Vue } from 'vue-class-component'
import { store } from '../store'

export default class extends Vue {
  mounted () {
    store.displayMap()
  }

  beforeDestroy () {
    store.destroyMap()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .basemap {
    width: 100vw;
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
