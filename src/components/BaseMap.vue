<template>
  <div id="mapContainer" class="w-screen z-0 h-full">
    <div v-if="harborPopUp.visible" class="customPopUp" :style="{ left: harborPopUp.coordinates.x + 'px', top: harborPopUp.coordinates.y + 'px' }"> {{ harborPopUp.content }} </div>
  </div>
</template>

<script setup lang="ts">
import { harborPopUp } from "@/classes/BaseMap"
import { store } from "@/main"
import { watch } from "vue"

watch(() => store.getData().dataLoaded, () => {
  if (store.getData().dataLoaded) store.displayMap()
})
</script>

<style>
.customPopUp {
  position: absolute;
  background-color: rgba(26, 39, 71, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
}
</style>
