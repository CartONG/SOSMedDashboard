<template>
  <div class="flex flex-col">
    <Header />
    <BaseMap />
    <PopUp />
    <Legend />
    <div class="absolute bottom-0 flex flex-col w-full items-center bg-white md:static md:block">
      <Stats />
      <HistogramSlider />
    </div>
  </div>
</template>

<script lang="ts">
import BaseMap from "./components/BaseMap.vue"
import PopUp from "./components/PopUp.vue"
import Header from "./components/Header.vue"
import Legend from "./components/Legend.vue"
import HistogramSlider from "./components/HistogramSlider.vue"
import Stats from "./components/Stats.vue"
import { store } from "./Store"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    Header,
    BaseMap,
    HistogramSlider,
    Legend,
    PopUp,
    Stats
  },
  mounted () {
    store.initStore()
  }
})
</script>
