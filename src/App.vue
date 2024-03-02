<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <AppHeader/>
    <KeyNumbersMobile/>
    <BaseMap/>
  </div>
  <PopUp/>
  <div class="absolute bottom-0 flex flex-col w-full items-center bg-white md:static md:block">
    <Stats/>
    <KeyNumbers/>
    <HistogramSlider/>
  </div>
  <AppLegend/>
  <VirtualVisit v-if="store.getState().virtualVisitAlreadyOpened"/>
</template>

<script lang="ts" setup>
import { store } from "./main"
import { onMounted } from "vue"
import AppHeader from "./components/Header.vue"
import AppLegend from "./components/MapLegend.vue"
import BaseMap from "./components/BaseMap.vue"
import HistogramSlider from "./components/HistogramSlider.vue"
import KeyNumbers from "./components/KeyNumbers.vue"
import PopUp from "./components/PopUp.vue"
import Stats from "./components/Stats.vue"
import VirtualVisit from "./components/VirtualVisit.vue"

onMounted(() => {
  store.initStore()
})

</script>
