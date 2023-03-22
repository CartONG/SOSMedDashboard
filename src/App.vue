<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <Header/>
    <KeyNumbersMobile/>
    <BaseMap/>
  </div>
  <PopUp/>
  <div class="absolute bottom-0 flex flex-col w-full items-center bg-white md:static md:block">
    <Stats/>
    <KeyNumbers/>
    <HistogramSlider/>
  </div>
  <Legend/>
  <VirtualVisit v-show="reactiveStore.virtualVisitVisibility"/>
</template>

<script lang="ts" setup>
// Import are needed otherwise components are buggued
import BaseMap from "./components/BaseMap.vue"
import PopUp from "./components/PopUp.vue"
import Header from "./components/Header.vue"
import Legend from "./components/Legend.vue"
import HistogramSlider from "./components/HistogramSlider.vue"
import Stats from "./components/Stats.vue"
import KeyNumbers from "./components/KeyNumbers.vue"
import KeyNumbersMobile from "./components/KeyNumbersMobile.vue"
import VirtualVisit from "./components/VirtualVisit.vue"
import { store, reactiveStore } from "./Store"
import { onMounted } from "vue"

onMounted(() => {
  store.initStore()
})

</script>
