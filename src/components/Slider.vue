<template>
  <div><HistogramSlider
    :data='data'
    :min="new Date(2016, 1, 1).valueOf()"
    :max="new Date(2020, 12, 31).valueOf()"/></div>
</template>

<script lang='js'>
import { store } from '../store'
import { Options, Vue } from 'vue-class-component'
import HistogramSlider from './HistogramSlider'

@Options({
  components: {
    HistogramSlider
  }
})
export default class extends Vue {
  data () {
    return {
      data: store.allData.map(d => d.date)
    }
  }
}
</script>
