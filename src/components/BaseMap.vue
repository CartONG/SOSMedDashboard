<template>
  <div id='mapContainer' class='w-screen m-auto z-0 basemap-height-mobile sm:basemap-height-sm'></div>
</template>

<script lang='ts'>
import { Vue } from 'vue-class-component'
import { store } from '@/store'

export default class extends Vue {
  mounted () {
    store.displayMap()
  }

  beforeUnmount () {
    store.destroyMap()
  }
}
</script>
