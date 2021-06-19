<template>
  <Header />
  <BaseMap />
  <PopUp />
  <HistogramSlider />
  <Legend />
  <Stats />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BaseMap from './components/BaseMap.vue'
import PopUp from './components/PopUp.vue'
import Header from './components/Header.vue'
import Legend from './components/Legend.vue'
import HistogramSlider from './components/HistogramSlider.vue'
import Stats from './components/Stats.vue'
import { store } from './store'

@Options({
  components: {
    Header,
    BaseMap,
    HistogramSlider,
    Legend,
    PopUp,
    Stats
  }
})
export default class App extends Vue {
  mounted () {
    store.initStore()
  }
}
</script>
