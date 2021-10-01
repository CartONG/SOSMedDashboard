<template>
  <div class="flex flex-col rounded-2xl w-1/2 legend-background absolute top-24 ml-4 legend-position-mobile sm:w-60 md:right-5 md:absolute md:bottom-5 md:top-auto">
    <p class="text-xs text-center font-bold text-secondary">VIEW</p>
    <Switch switch-id='rescue' switch-title="Rescue" />
    <Switch switch-id='transfer' switch-title="Transfer" />
    <Switch switch-id='medical' switch-title="Medical Evacuation" />
    <svg class="h-7" viewBox="0 0 100 40">
      <line x1="0" y1="20" x2="100" y2="20" stroke="black" />
    </svg>
    <Switch switch-id='harbor' switch-title="Harbors" />
  </div>
</template>

<script lang='ts'>
import Switch from "./Switch.vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    Switch
  }
})
</script>
