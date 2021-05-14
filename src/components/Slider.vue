<template>
  <div><HistogramSlider
    :data='data'
    :prettify='prettify'
    :drag-interval='true'
    :min="new Date(2016, 1, 1).valueOf()"
    :max="new Date(2020, 12, 31).valueOf()"/></div>
</template>

<script lang='js'>
import { store } from '../store'
import { Options, Vue } from 'vue-class-component'
import HistogramSlider from './HistogramSlider'
import '../assets/styles/histogram-slider.css'

const dates = [
  '20016-11-23T22:00:00.000Z',
  '2020-02-28T22:00:00.000Z',
  '2020-03-09T22:00:00.000Z',
  '2020-03-21T22:00:00.000Z',
  '2020-05-06T21:00:00.000Z',
  '2020-06-01T21:00:00.000Z',
  '2020-06-13T21:00:00.000Z',
  '2020-06-30T21:00:00.000Z',
  '2020-07-03T21:00:00.000Z',
  '2020-07-14T21:00:00.000Z'
]

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
      data: dates.map(d => new Date(d)),
      // data: store.allData.map(d => d.date),
      prettify: prettifyDate
    }
  }
}
</script>
