<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <!-- <AppHeader/> -->
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
  <VirtualVisit v-if="reactiveStore.virtualVisitAlreadyOpened"/>
</template>

<script lang="ts">
import { store, reactiveStore } from "./Store"
import { defineAsyncComponent, defineComponent, onMounted } from "vue"

export default defineComponent({
  components: {
    // AppHeader: defineAsyncComponent(() => import("./components/Header.vue")),
    AppLegend: defineAsyncComponent(() => import("./components/Legend.vue")),
    BaseMap: defineAsyncComponent(() => import("./components/BaseMap.vue")),
    HistogramSlider: defineAsyncComponent(() => import("./components/HistogramSlider.vue")),
    KeyNumbers: defineAsyncComponent(() => import("./components/KeyNumbers.vue")),
    KeyNumbersMobile: defineAsyncComponent(() => import("./components/KeyNumbersMobile.vue")),
    PopUp: defineAsyncComponent(() => import("./components/PopUp.vue")),
    Stats: defineAsyncComponent(() => import("./components/Stats.vue")),
    VirtualVisit: defineAsyncComponent(() => import("./components/VirtualVisit.vue"))
  },
  setup () {
    onMounted(() => {
      store.initStore()
    })

    return { reactiveStore }
  }
})

</script>
