<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <Header/>
    <BaseMap/>
  </div>
  <PopUp/>
  <div class="absolute bottom-0 flex flex-col w-full items-center bg-white md:static md:block">
    <Stats/>
    <HistogramSlider/>
  </div>
  <MenuMobile/>
  <Legend/>
</template>

<script lang="ts">
import BaseMap from "./components/BaseMap.vue"
import PopUp from "./components/PopUp.vue"
import Header from "./components/Header.vue"
import Legend from "./components/Legend.vue"
import HistogramSlider from "./components/HistogramSlider.vue"
import Stats from "./components/Stats.vue"
import { store } from "./Store"
import { defineComponent, onMounted } from "vue"
import MenuMobile from "@/components/Mobile/Menu.vue"

export default defineComponent({
  components: {
    MenuMobile,
    Header,
    BaseMap,
    HistogramSlider,
    Legend,
    PopUp,
    Stats
  },
  setup () {
    onMounted(() => {
      store.initStore()
    })
  }
})
</script>
