import * as d3Scale from "d3-scale"
import * as d3Array from "d3-array"
import * as d3Select from "d3-selection"
import * as d3Trans from "d3-transition"

import { Colors } from "@/utils/Colors"

const prettifyDate = function (date: string) {
  return new Date(date).toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}

/* eslint-disable */
export class HistogramSlider {
  private readonly histColor = Colors.BLUE
  private readonly holderColor = Colors.GRAY
  private readonly transitionDuration = 80
  private readonly barHeight = 50
  private readonly barWidth = 6
  private readonly id = "vue-histogram"
  private ionRangeSlider: any
  private min = new Date(2016, 1, 1).valueOf()
  private max = new Date(2020, 12, 31).valueOf()
  // x scale for time
  private x = d3Scale
    .scaleLinear()
    .clamp(true)
  // y scale for histogram
  private y = d3Scale.scaleLinear().range([this.barHeight, 0])
  private hist: any
  private width = 300

  constructor() {
    console.log("constructor")
  }

  setWidth(width: number) {
    this.width = width - 20
    this.x.range([0, this.width])
  }

  updateBarColor (val: any) {
    const transition = d3Trans.transition().duration(this.transitionDuration)
    d3Trans
      .transition(transition as any)
      .selectAll(`.vue-histogram-slider-bar-${this.id}`)
      .attr('fill', (d: any) => {
        return d.x0 <= val.to && d.x0 >= val.from ? this.histColor : this.holderColor
      })
  }

  display (askedMin: number, askedMax: number, data: number[]) {
    this.min = (askedMin || d3Array.min(data))!
    this.max = (askedMax || d3Array.max(data))!

    // x scale for time
    this.x.domain([this.min, this.max])

    const svg = d3Select
      .select(`#${this.id}`)
      .attr('height', this.barHeight)

    this.hist = svg.append('g').attr('class', 'histogram')
  }

  updateHistogram (data: number[], store: any) {
    const $ = require('jquery')
    const transition = d3Trans.transition().duration(this.transitionDuration)
    this.hist.selectAll(`.vue-histogram-slider-bar-${this.id}`).remove()

    const histogram = d3Array
      .bin()
      .domain(this.x.domain() as [number, number])
      .thresholds(this.width / (this.barWidth + 5))

    // group data for bars
    let bins: d3Array.Bin<number, number>[]
    if (data) {
      bins = histogram(data)
    } else {
      bins = histogram([])
    }

    this.y.domain([0, d3Array.max(bins, d => d.length)] as [number, number])

    this.hist
      .selectAll(`.vue-histogram-slider-bar-${this.id}`)
      .data(bins)
      .enter()
      .insert('rect', 'rect.overlay')
      .attr('class', `vue-histogram-slider-bar-${this.id}`)
      .attr('x', (d: { x0: any }) => this.x(d.x0))
      .attr('y', (d: string | any[]) => this.y(d.length))
      .attr('rx', 4)
      .attr('width', this.barWidth)
      .transition(transition)
      .attr('height', (d: string | any[]) => this.barHeight - this.y(d.length))
      .attr('fill', (_: { x0: any }) => this.histColor)

    if (this.ionRangeSlider) {
      this.ionRangeSlider.destroy()
    }

    const histSlider = $("#histogram-slider").ionRangeSlider({
      skin: 'round',
      min: this.min,
      max: this.max,
      from: this.min,
      to: this.max,
      type: "double",
      grid: true,
      step: 1,
      from_fixed: false,
      to_fixed: false,
      hide_min_max: true,
      hide_from_to: false,
      force_edges: false,
      drag_interval: true,
      grid_num: 5,
      block: false,
      keyboard: true,
      prettify: prettifyDate,
      onChange: (val: any) => {
        store.filterData(val.from, val.to)
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
      this.transitionDuration + 10
    )
  }

  updateSlider(from: number, to: number): void {
    this.ionRangeSlider.options.from = from
    this.ionRangeSlider.options.to = to
    this.ionRangeSlider.updateResult()
    this.ionRangeSlider.update(this.ionRangeSlider.options)
  }
}
