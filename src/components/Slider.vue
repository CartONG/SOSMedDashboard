<template>
  <div><HistogramSlider
    :data='sliderData'
    :prettify='prettify'
    :drag-interval='true'
    :min="new Date(2016, 1, 1).valueOf()"
    :max="new Date(2020, 12, 31).valueOf()"/></div>
</template>

<script lang='js'>
import { computed } from 'vue'
import { Options, Vue } from 'vue-class-component'
import useStore from '../store'
import HistogramSlider from './HistogramSlider'
import '../assets/styles/histogram-slider.css'

const prettifyDate = function (date) {
  return new Date(date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

@Options({
  components: {
    HistogramSlider
  }
})
export default class extends Vue {
  data () {
    return {
      prettify: prettifyDate,
      sliderData: computed({
        get: () => {
          const { allData } = useStore()
          console.log(allData.value)
          return allData.value.map(d => d.date)
        }
      })
    }
  }
}
</script>
