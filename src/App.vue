<template>
  <Header />
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'

@Options({
  components: {
    Header,
    HelloWorld
  }
})
export default class App extends Vue {}
</script>
