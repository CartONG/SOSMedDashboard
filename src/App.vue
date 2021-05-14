<template>
  <Header />
  <BaseMap />
  <Slider />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BaseMap from './components/BaseMap.vue'
import Header from './components/Header.vue'
import Slider from './components/Slider.vue'
import { store } from './store'

@Options({
  components: {
    Header,
    BaseMap,
    Slider
  }
})
export default class App extends Vue {
  mounted () {
    store.initStore()
  }
}
</script>
