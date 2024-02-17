<template>
  <div :style="style" class="histo h-16 mx-auto flex md:h-32 md:absolute md:bottom-5 md:bg-white md:opacity-80 md:p-6 md:rounded-2xl">
    <span class="hidden md:block icon icon-calendar text-4xl text-right color-secondary cursor-pointer" @click="toggleMinDateVisibility"/>
    <div class="w-full">
      <svg :id="'vue-histogram'" class="hidden md:block md:w-full"/>
      <div class="slider-wrapper">
        <input type="text" :id="'histogram-slider'" :name="'histogram-slider'" value=""/>
      </div>
    </div>
    <span class="hidden md:block icon icon-calendar text-4xl text-right color-secondary cursor-pointer" @click="toggleMaxDateVisibility"/>
  </div>
  <Date :visible="minDateVisibility" :toggleVisible="toggleMinDateVisibility" :isMinDate="true"/>
  <Date :visible="maxDateVisibility" :toggleVisible="toggleMaxDateVisibility" :isMinDate="false" />
</template>

<script lang='ts'>
import "../js/range-slider"
import { store } from "@/main"
import { Colors } from "@/utils/Colors"
import { computed, defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, ref } from "vue"

// eslint-disable-next-line
import $ from "jquery"

export default defineComponent({
  components: {
    Date: defineAsyncComponent(() => import("./Date.vue"))
  },
  setup () {
    const getWidth = () => {
      return 0.75 * window.innerWidth
    }

    const width = ref(getWidth())
    const minDateVisibility = ref(false)
    const maxDateVisibility = ref(false)

    const onResize = () => {
      width.value = getWidth()
      store.setWidthHistogramSlider(width.value)
      store.updateHistogramSlider()
    }

    const toggleMinDateVisibility = () => {
      minDateVisibility.value = !minDateVisibility.value
    }

    const toggleMaxDateVisibility = () => {
      maxDateVisibility.value = !maxDateVisibility.value
    }

    const style = computed(() => {
      return `
        width: ${width.value}px;
        --primary-color: ${Colors.ORANGE};
        --label-color: ${Colors.BLUE};
        --holder-color: ${Colors.GRAY};
        --handle-color: #3c3c3b;
        --grid-text-color: ${Colors.BLUE};
        --line-height: 6px;
        --font-family: Arial, sans-serif;
        --font-size: 8px;
        --hist-slider-gap: -20px;
        --handle-size: 18px;
      `
    })

    onMounted(() => {
      window.addEventListener("resize", onResize)
      store.setWidthHistogramSlider(width.value)
      store.displayHistogramSlider(store.getState().minDate.valueOf(), store.getState().maxDate.valueOf(), [])
    })

    onBeforeUnmount(() => {
      window.removeEventListener("resize", onResize)
    })

    return {
      style, minDateVisibility, toggleMinDateVisibility, maxDateVisibility, toggleMaxDateVisibility
    }
  }
})
</script>

<style>
  .histo{
    margin-left: 3%;
  }

.vue-histogram-view {
  z-index: 15;
}

.slider-wrapper {
  width: 100%;
  margin-top: var(--hist-slider-gap);
}

.vue-histogram-slider-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.vue-histogram-slider-bar {
  pointer-events: none;
}

.irs {
  font-family: var(--font-family);
  font-size: var(--font-size);
  position: relative;
  display: block;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.irs-line {
  position: relative;
  display: block;
  overflow: hidden;
  outline: none !important;
  cursor: pointer;
}

.irs-bar {
  cursor: pointer;
  position: absolute;
  display: block;
  left: 0;
  width: 0;
  z-index: 11;
}

.irs-shadow {
  position: absolute;
  display: none;
  left: 0;
  width: 0;
}

.irs-handle {
  position: absolute;
  display: block;
  box-sizing: border-box;
  cursor: default;
  z-index: 11;
}

.irs-handle.type_last {
  z-index: 12;
}

.irs-min,
.irs-max {
  position: absolute;
  display: block;
  cursor: default;
}

.irs-min {
  left: 0;
}

.irs-max {
  right: 0;
}

.irs-from,
.irs-to,
.irs-single {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  cursor: default;
  white-space: nowrap;
  z-index: 99;
}

.irs-grid {
  position: absolute;
  display: none;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
}

.irs-with-grid .irs-grid {
  display: block;
}

.irs-grid-pol {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 8px;
  background: #000;
}

.irs-grid-pol.small {
  height: var(--line-height);
}

.irs-grid-text {
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  text-align: center;
  font-size: 9px;
  line-height: 9px;
  padding: 0 3px;
  color: #000;
}

.irs-disable-mask {
  position: absolute;
  display: block;
  top: 0;
  left: -1%;
  width: 102%;
  height: 100%;
  cursor: default;
  background: rgba(0, 0, 0, 0);
  z-index: 12;
}

.lt-ie9 .irs-disable-mask {
  background: #000;
  filter: alpha(opacity=0);
  cursor: not-allowed;
}

.irs-disabled {
  opacity: 0.4;
}

.irs-hidden-input {
  position: absolute !important;
  display: block !important;
  top: 0 !important;
  left: 0 !important;
  width: 0 !important;
  height: 0 !important;
  font-size: 0 !important;
  line-height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  outline: none !important;
  z-index: -9999 !important;
  background: none !important;
  border-style: solid !important;
  border-color: transparent !important;
}

.irs--round {
  height: 50px;
}

.irs--round.irs-with-grid {
  height: 65px;
}

.irs--round .irs-line {
  top: 36px;
  height: var(--line-height);
  background-color: var(--holder-color);
  border-radius: var(--line-height);
}

.irs--round .irs-bar {
  top: 36px;
  height: var(--line-height);
  background-color: var(--primary-color);
}

.irs--round .irs-bar--single {
  border-radius: 4px 0 0 4px;
}

.irs--round .irs-shadow {
  height: var(--line-height);
  bottom: 21px;
  background-color: rgba(222, 228, 236, 0.5);
}

.irs--round .irs-handle {
  cursor: pointer;
  top: calc(50% - var(--handle-size) / 2 + 5px);
  width: var(--handle-size);
  height: var(--handle-size);
  background-color: var(--handle-color);
  z-index: 11;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 255, 0.3);
}

.irs--round .irs-handle.state_hover,
.irs--round .irs-handle:hover {
  background-color: #f0f6ff;
}

.irs--round .irs-min,
.irs--round .irs-max {
  color: #333;
  font-size: 14px;
  line-height: 1;
  top: 0;
  padding: 3px 5px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.irs--round .irs-from,
.irs--round .irs-to,
.irs--round .irs-single {
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  text-shadow: none;
  padding: 3px 5px;
  background-color: var(--label-color);
  color: white;
  border-radius: 4px;
}

.irs--round .irs-from:before,
.irs--round .irs-to:before,
.irs--round .irs-single:before {
  position: absolute;
  display: block;
  content: '';
  bottom: -6px;
  left: 50%;
  width: 0;
  height: 0;
  margin-left: -3px;
  overflow: hidden;
  border: 3px solid transparent;
  border-top-color: var(--label-color);
}

.irs--round .irs-grid {
  height: 25px;
}

.irs--round .irs-grid-pol {
  background-color: #dedede;
}

.irs--round .irs-grid-text {
  color: var(--grid-text-color);
  font-size: 13px;
}
</style>
