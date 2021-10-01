<template>
  <div id="mapContainer" class="w-screen z-0 h-full"></div>
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
