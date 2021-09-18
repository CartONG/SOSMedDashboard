<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row items-baseline">
      <div class="legend-marker mr-2" :class="markerStyle"></div>
      <label :for="id" class="text-xs label-color">{{title}}</label>
    </div>
    <div class="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
            type="checkbox"
            :name="id"
            :id="id"
            class="toggle-checkbox absolute block w-3 h-3 rounded-full bg-white border-2 appearance-none cursor-pointer"
            @change="toggle"
            checked
        />
        <label
            :for="id"
            class="toggle-label block overflow-hidden h-3 rounded-full bg-gray-300 cursor-pointer"
        ></label>
    </div>
  </div>
</template>

<script lang='ts'>
import { store } from "@/store"
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    switchId: {
      type: String,
      required: true
    },
    switchTitle: {
      type: String,
      required: true
    }
  },
  data () {
    return { id: this.switchId, title: this.switchTitle }
  },
  computed: {
    markerStyle () {
      switch (this.id) {
        case "harbor":
          return { icon: true, "icon-anchor-o": true, "text-black": true }
        case "rescue":
          return { "bg-gray-400": true }
        case "transfer":
          return { "bg-secondary": true }
        default:
          return { "bg-main": true }
      }
    }
  },
  methods: {
    toggle () {
      store.updateMap()
    }
  }
})
</script>

<style scoped>
  .label-color {
    color: theme('colors.main')
  }

  .toggle-checkbox:checked {
    right: 0;
    border-color: theme('colors.secondary');
  }

  .toggle-checkbox:checked + .toggle-label {
    background-color: theme('colors.secondary');
  }
</style>
