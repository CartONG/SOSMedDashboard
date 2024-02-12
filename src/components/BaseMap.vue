<template>
  <div id="mapContainer" class="w-screen z-0 h-full"></div>
</template>

<script setup lang="ts">
import { store } from "@/Store"
import { watch } from "vue"

watch(store.dataLoaded, () => {
  if (store.dataLoaded) store.displayMap()
})
</script>
