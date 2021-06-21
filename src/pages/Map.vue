<template>
  <BaseMap />
  <PopUp />
  <HistogramSlider />
  <Legend />
  <Stats />
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import BaseMap from '@/components/BaseMap.vue'
import PopUp from '@/components/PopUp.vue'
import Legend from '@/components/Legend.vue'
import HistogramSlider from '@/components/HistogramSlider.vue'
import Stats from '@/components/Stats.vue'

@Options({
  components: {
    BaseMap,
    PopUp,
    Legend,
    HistogramSlider,
    Stats
  }
})
export default class Map extends Vue {}
</script>

<style scoped>
</style>
