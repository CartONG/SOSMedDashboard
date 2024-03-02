<template>
  <div v-if="visible">
    <div class="z-100 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50"></div>
    <div id="popUpDate"
      class="z-100 fixed top-0 left-0 w-screen h-screen flex items-center justify-center transform transition-transform duration-300">
      <div class="bg-white rounded-3xl p-6">
        <div class="flex justify-between mb-5">
          <h1 class="font-bold text-secondary">{{ $t("popup.dateFilter") }}</h1>
          <button id="dateCloseButton" type="button" class="focus:outline-none text-grayClose" @click="toggleVisible">X</button>
        </div>
        <Datepicker v-model="date" @update:modelValue="handleDate" inline autoApply :enable-time-picker="false"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { store } from "@/main"
import Datepicker from "@vuepic/vue-datepicker"
import { defineComponent } from "vue"
import "@vuepic/vue-datepicker/dist/main.css"

export default defineComponent({
  components: {
    Datepicker
  },
  name: "Date-picker",

  props: {
    visible: Boolean,
    toggleVisible: Function,
    isMinDate: Boolean
  },
  data (): { date: Date, isVisible: boolean } {
    if (this.isMinDate) {
      return { date: store.getState().minDate, isVisible: false }
    } else {
      return { date: store.getState().maxDate, isVisible: false }
    }
  },
  methods: {
    handleDate (modelData: Date): void {
      if (this.isMinDate) {
        store.getState().minDate = modelData
      } else {
        store.getState().maxDate = modelData
      }
      store.filterData(store.getState().minDate, store.getState().maxDate)
      store.updateHistogramSliderFromTo()
    }
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: x-large;
}

p, span {
  color: var(--text-color);
}

.text-3xs {
  font-size: 0.5rem;
  line-height: 0.5rem;
}

.vertical-separator {
  border-right: 1px solid;
}

button {
  left: 100%;
}
</style>
