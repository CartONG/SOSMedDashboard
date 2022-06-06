<template>
  <div id="mapContainer" class="mapContainer w-screen z-0 h-full">
    <BaseMapPicker class="basemap-picker" />
  </div>
</template>

<script lang="ts">
import { store } from "@/Store"
import { defineComponent } from "vue"

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
  }
})
</script>
<style scoped>
.mapContainer{
  position: relative;
}

.basemap-picker{
  position: absolute;
  top: 70px;
  right: 2px;
  z-index: 2048;
}

</style>
