<template>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row items-start legend-label">
      <div v-if="color" class="legend-marker mr-2" :style="{ backgroundColor: color}"></div>
      <div v-if="iconName" class="legend-marker mr-2"><img :src="`./basemaps-icons/${iconName}`" alt=""></div>
      <label :for="id" class="text-xs label-color">{{title}}</label>
      <img v-if="tooltip" class="more-information-button ml-1" src="@/assets/question.svg" alt="" @mouseenter="setInformationTooltip($event, tooltip[0], tooltip[1])" @mouseleave="removeInformationTooltip">
    </div>
    <div class="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in" v-if="switchable">
        <input
            type="checkbox"
            :name="id"
            :id="id"
            class="toggle-checkbox absolute block w-3 h-3 rounded-full bg-white border-2 appearance-none cursor-pointer"
            @change="toggle(id)"
            :checked="checked"
        />
        <label
            :for="id"
            class="toggle-label block overflow-hidden h-3 rounded-full bg-gray-300 cursor-pointer"
        ></label>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { store } from "@/main"
import { SwitchType } from "@/classes/State"

defineProps<{
  switchable: boolean
  checked: boolean
  id: SwitchType
  title: string
  iconName? : string
  color?: string
  tooltip?: [string, string]
}>()
const url = process.env.BASE_URL
function toggle (id: SwitchType) {
  store.toggleSwitch(id)
}
function setInformationTooltip (event: MouseEvent, title: string, text: string) {
  store.setInformationTooltipParameters(true, { orientation: "left", x: event.clientX, y: event.clientY }, { title, text })
}
function removeInformationTooltip () {
  store.setInformationTooltipParameters(false)
}
</script>

<style>
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

  .legend-label{
    width: 70%;
  }
</style>
