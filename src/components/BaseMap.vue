<template>
  <div id="mapContainer" class="w-screen m-auto z-0 basemap-height-mobile sm:basemap-height-sm"></div>
</template>

<script lang="ts">
import { store } from "@/Store"
import { defineComponent } from "vue"

export default defineComponent({
  mounted () {
    store.displayMap()
  },
  beforeUnmount () {
    store.destroyMap()
  }
})
</script>
