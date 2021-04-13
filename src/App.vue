<template>
  <Header />
  <BaseMap/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BaseMap from './components/BaseMap.vue'
import Header from './components/Header.vue'

@Options({
  components: {
    Header,
    BaseMap
  }
})
export default class App extends Vue {}
</script>
