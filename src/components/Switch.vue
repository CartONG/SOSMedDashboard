<template>
  <div class="flex flex-row justify-between">
    <label :for="id" class="text-xs label-color">{{name}}</label>
    <div class="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
            type="checkbox"
            :name="id"
            :id="id"
            class="toggle-checkbox absolute block w-3 h-3 rounded-full bg-white border-2 appearance-none cursor-pointer"
            @change="toggle"
        />
        <label
            :for="id"
            class="toggle-label block overflow-hidden h-3 rounded-full bg-gray-300 cursor-pointer"
        ></label>
    </div>
  </div>
</template>

<script>
import { store } from '../store'
import { blueColor, orangeColor } from '../classes/colors'

export default {
  name: 'Switch',
  props: ['id', 'name'],
  methods: {
    toggle () {
      store.updateMap()
    }
  },
  data () {
    return {
      blueColor: blueColor,
      orangeColor: orangeColor
    }
  }
}
</script>

<style scoped>
  .label-color {
    color: v-bind(blueColor)
  }

  .toggle-checkbox:checked {
    right: 0;
    border-color: v-bind(orangeColor);
  }

  .toggle-checkbox:checked + .toggle-label {
    background-color: v-bind(orangeColor);
  }
</style>
