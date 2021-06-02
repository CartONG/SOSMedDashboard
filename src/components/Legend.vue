<template>
  <div class="flex flex-col rounded-2xl w-1/2 legend-background legend-position-mobile sm:w-60 lg:legend-position-desktop">
    <p class="text-xs text-center font-bold text-secondary">VIEW</p>
    <Switch id='rescue' name="Rescue" />
    <Switch id='transfer' name="Transfer" />
    <Switch id='medical' name="Medical Evacuation" />
    <svg class="h-7" viewBox="0 0 100 40">
      <line x1="0" y1="20" x2="100" y2="20" stroke="black" />
    </svg>
    <Switch id='harbor' name="Harbors" />
  </div>
</template>

<script lang='ts'>
import { Options, Vue } from 'vue-class-component'
import Switch from './Switch.vue'

@Options({
  components: {
    Switch
  }
})
export default class Legend extends Vue {}
</script>
