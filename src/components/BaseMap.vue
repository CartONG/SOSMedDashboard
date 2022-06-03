<template>
  <div id="mapContainer" class="mapContainer w-screen z-0 h-full">
    <BaseMapPicker class="basemap-picker" :basemaps="basemaps" />
  </div>
</template>

<script lang="ts">
import { store } from "@/Store"
import { defineComponent } from "vue"

import { BASEMAPS } from "@/classes/BaseMap"
import BaseMapPicker from "@/components/BaseMapPicker.vue"

export default defineComponent({
  components: {
    BaseMapPicker
  },

  mounted () {
    store.displayMap()
  },

  beforeUnmount () {
    store.destroyMap()
  },

  data () {
    return {
      basemaps: BASEMAPS
    }
  }
})
</script>
<style scoped>
.mapContainer{
  position: relative;
}

.basemap-picker{
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2048;
}

</style>
