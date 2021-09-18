<template>
  <Header />
  <BaseMap />
  <PopUp />
  <HistogramSlider />
  <Legend />
  <Stats />
</template>

<script lang="ts">
import BaseMap from "./components/BaseMap.vue"
import PopUp from "./components/PopUp.vue"
import Header from "./components/Header.vue"
import Legend from "./components/Legend.vue"
import HistogramSlider from "./components/HistogramSlider.vue"
import Stats from "./components/Stats.vue"
import { store } from "./store"
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
