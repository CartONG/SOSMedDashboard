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
import useStore from './store'

@Options({
  components: {
    Header,
    BaseMap,
    Slider
  }
})
export default class App extends Vue {
  mounted () {
    const { initStore } = useStore()
    initStore()
  }
}
</script>
