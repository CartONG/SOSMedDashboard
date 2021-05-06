<template>
  <Header />
  <BaseMap :opsData="opsData"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BaseMap from './components/BaseMap.vue'
import Header from './components/Header.vue'
import { RawOpsData, OpsData, convertOpsData } from './opsData'

const dataRequestUrl = 'https://spreadsheets.google.com/feeds/list/1mK5tq3gfnc0OckQnArz1TXhh4YINAWfF7ilYa5PhOw8/1/public/values?alt=json'

const fetchOpsData = function () {
  return new Promise<OpsData[]>(function (resolve, reject) {
    fetch(dataRequestUrl)
      .then(res => res.json())
      .then((out) => {
        const rawOpsData: RawOpsData[] = out.feed.entry
        const opsData: OpsData[] = []
        let i = 0
        for (const data of rawOpsData) {
          opsData.push(convertOpsData(data, `line ${i}`))
          i += 1
        }
        resolve(opsData)
      })
      .catch(err => reject(err))
  })
}

const opsData = fetchOpsData()

@Options({
  components: {
    Header,
    BaseMap
  }
})
export default class App extends Vue {
  data () {
    return {
      opsData: opsData
    }
  }
}
</script>
