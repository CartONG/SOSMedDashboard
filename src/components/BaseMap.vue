<template>
  <div id="mapContainer" class="w-screen z-0 h-full"></div>
</template>

<script setup lang="ts">
import { store } from "@/main"
import { watch } from "vue"

watch(() => store.getData().dataLoaded, () => {
  if (store.getData().dataLoaded) store.displayMap()
})
</script>
