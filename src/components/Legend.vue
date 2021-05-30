<template>
  <div class="flex flex-col rounded-2xl w-1/2 legend-background legend-position-mobile sm:w-1/6 sm:legend-position-desktop">
    <p class="text-xs text-center font-bold text-secondary">VIEW</p>
    <Switch id='rescue' name="Rescue" />
    <Switch id='transfer' name="Transfer" />
    <Switch id='medical' name="Medical Evacuation" />
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
