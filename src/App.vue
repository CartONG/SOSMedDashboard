<template>
  <Header />
  <BaseMap />
  <HistogramSlider />
  <Legend />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BaseMap from './components/BaseMap.vue'
import Header from './components/Header.vue'
import Legend from './components/Legend.vue'
import HistogramSlider from './components/HistogramSlider.vue'
import { store } from './store'

@Options({
  components: {
    Header,
    BaseMap,
    HistogramSlider,
    Legend
  }
})
export default class App extends Vue {
  mounted () {
    store.initStore()
  }
}
</script>
