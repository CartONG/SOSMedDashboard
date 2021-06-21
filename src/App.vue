<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Header from './components/Header.vue'
import { store } from './store'

@Options({
  components: {
    Header
  }
})
export default class App extends Vue {
  mounted () {
    store.initStore()
  }
}
</script>
