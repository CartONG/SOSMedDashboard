import * as d3Scale from 'd3-scale'
import * as d3Array from 'd3-array'
import * as d3Select from 'd3-selection'
import * as d3Trans from 'd3-transition'

const transitionDuration = 80
const color = '#0091ff'
const holderColor = '#dee4ec'
const barHeight = 100
const barWidth = 6
const barGap = 5
const barRadius = 4
const type = 'double'
const grid = true
const gridNum = 4
const step = 1
const hideMinMax = true
const hideFromTo = false
const toFixed = false
const fromFixed = false
const forceEdges = false
const dragInterval = true
const block = false
const keyboard = true
const id = 'vue-histogram'
const histogramId = 'histogram-slider'

const prettifyDate = function (date: string) {
  return new Date(date).toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/* eslint-disable */
export class HistogramSlider {
  private ionRangeSlider: any
  private min = new Date(2016, 1, 1).valueOf()
  private max = new Date(2020, 12, 31).valueOf()
  private x: any
  private y: any
  private hist: any
  private width = 300

  updateBarColor (val: any) {
    const transition = d3Trans.transition().duration(transitionDuration as number)
    d3Trans
      .transition(transition as any)
      .selectAll(`.vue-histogram-slider-bar-${id}`)
      .attr('fill', (d: any) => {
        return d.x0 <= val.to && d.x0 >= val.from ? color : holderColor
      })
  }

  display (askedWidth: number, askedMin: number, askedMax: number, data: number[]) {
    this.width = askedWidth - 20
    this.min = (askedMin || d3Array.min(data))!
    this.max = (askedMax || d3Array.max(data))!

    // x scale for time
    this.x = d3Scale
      .scaleLinear()
      .domain([this.min, this.max] as any)
      .range([0, this.width])
      .clamp(true)

    // y scale for histogram
    this.y = d3Scale.scaleLinear().range([barHeight, 0])

    const svg = d3Select
      .select(`#${id}`)
      .attr('width', this.width)
      .attr('height', barHeight)

    this.hist = svg.append('g').attr('class', 'histogram')

    this.ionRangeSlider = this.updateHistogram(data)
  }

  updateHistogram (data: number[]) {
    const $ = require('jquery')
    const transition = d3Trans.transition().duration(transitionDuration)
    this.hist.selectAll(`.vue-histogram-slider-bar-${id}`).remove()

    const histogram = d3Array
      .bin()
      .domain(this.x.domain())
      .thresholds(this.width / (barWidth + barGap))

    // group data for bars
    let bins: d3Array.Bin<number, number>[]
    if (data) {
      bins = histogram(data)
    } else {
      bins = histogram([])
    }

    this.y.domain([0, d3Array.max(bins, d => d.length)])

    this.hist
      .selectAll(`.vue-histogram-slider-bar-${id}`)
      .data(bins)
      .enter()
      .insert('rect', 'rect.overlay')
      .attr('class', `vue-histogram-slider-bar-${id}`)
      .attr('x', (d: { x0: any }) => this.x(d.x0))
      .attr('y', (d: string | any[]) => this.y(d.length))
      .attr('rx', barRadius)
      .attr('width', barWidth)
      .transition(transition)
      .attr('height', (d: string | any[]) => barHeight - this.y(d.length))
      .attr('fill', (d: { x0: any }) => color)

    if (this.ionRangeSlider) {
      this.ionRangeSlider.destroy()
    }

    const histSlider = $(`#${histogramId}`).ionRangeSlider({
      skin: 'round',
      min: this.min,
      max: this.max,
      from: this.min,
      to: this.max,
      type: type,
      grid: grid,
      step: step,
      from_fixed: fromFixed,
      to_fixed: toFixed,
      hide_min_max: hideMinMax,
      hide_from_to: hideFromTo,
      force_edges: forceEdges,
      drag_interval: dragInterval,
      grid_num: gridNum,
      block: block,
      keyboard: keyboard,
      prettify: prettifyDate,
      onChange: (val: any) => {
        console.log(data)
        this.updateBarColor(val)
      }
    })

    this.ionRangeSlider = histSlider.data('ionRangeSlider')

    setTimeout(
      () => { 
        if (this.ionRangeSlider) {
          this.updateBarColor(this.ionRangeSlider.result)
        }
      },
      transitionDuration + 10
    )
  }
}
