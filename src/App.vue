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
    <Chart/>
  </div>
  <AppLegend/>
  <VirtualVisit v-if="store.getState().virtualVisitAlreadyOpened"/>
  <div
    v-if="store.getState().informationTooltip.visible"
    class="information-tooltip"
    :style="tooltipPosition"
  >
    <p class="information-tooltip-title">{{ store.getState().informationTooltip.content.title }}</p>
    <p class="information-tooltip-text">{{ store.getState().informationTooltip.content.text }}</p>
  </div>
</template>

<script lang="ts" setup>
import { store } from "./main"
import { computed, onMounted } from "vue"
import AppHeader from "./components/Header.vue"
import AppLegend from "./components/MapLegend.vue"
import BaseMap from "./components/BaseMap.vue"
import Chart from "./components/Chart.vue"
import KeyNumbers from "./components/KeyNumbers.vue"
import PopUp from "./components/PopUp.vue"
import Stats from "./components/Stats.vue"
import VirtualVisit from "./components/VirtualVisit.vue"

onMounted(() => {
  store.initStore()
})

const tooltipPosition = computed(() => {
  return store.getTooltipPosition()
})

</script>
