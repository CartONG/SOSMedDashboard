<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row items-baseline">
      <div class="legend-marker mr-2" :class="cssClass"></div>
      <label :for="id" class="text-xs label-color">{{title}}</label>
    </div>
    <div class="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
            type="checkbox"
            :name="id"
            :id="id"
            class="toggle-checkbox absolute block w-3 h-3 rounded-full bg-white border-2 appearance-none cursor-pointer"
            @change="toggle()"
            :checked="checked"
        />
        <label
            :for="id"
            class="toggle-label block overflow-hidden h-3 rounded-full bg-gray-300 cursor-pointer"
        ></label>
    </div>
  </div>
</template>

<script lang='ts'>
import { store } from "@/Store"
import { defineComponent } from "vue"
import { SwitchType } from "@/classes/State"

export default defineComponent({
  props: {
    checked: {
      type: Boolean,
      required: true
    },
    id: {
      type: String as () => SwitchType,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      cssClass: store.getCssClass(this.id)
    }
  },
  methods: {
    toggle () {
      store.toggleSwitch(this.id)
    }
  },
  name: "Legend-Switch"
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
