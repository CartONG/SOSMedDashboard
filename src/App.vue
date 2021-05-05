<template>
  <Header />
  <BaseMap :rescueData="rescueData"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BaseMap from './components/BaseMap.vue'
import Header from './components/Header.vue'
import { RawRescueData } from './rescueData'

/* TODO : Add url for the real test data */
const dataUrl = 'https://spreadsheets.google.com/feeds/list/1hnTmN_bKoFQiqO8hoeW7TXatPYsXoaCBu4pP1vf1cy4/1/public/values?alt=json'

const fetchRescueData = function () {
  return new Promise<RawRescueData>(function (resolve, reject) {
    fetch(dataUrl)
      .then(res => res.json())
      .then((out) => {
        resolve(out.feed.entry)
      })
      .catch(err => reject(err))
  })
}

const rescueData = fetchRescueData()

@Options({
  components: {
    Header,
    BaseMap
  }
})
export default class App extends Vue {
  data () {
    return {
      rescueData: rescueData
    }
  }
}
</script>
