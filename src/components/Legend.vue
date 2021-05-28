<template>
  <div class="flex flex-col rounded-2xl w-1/2 legend-background legend-position-mobile sm:w-1/6 sm:legend-position-desktop">
    <Switch id='rescue' name="Rescue" />
    <Switch id='transfert' name="Transfert" />
    <Switch id='medical' name="Medical Evacuation" />
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import Switch from './Switch.vue'

@Options({
  components: {
    Switch
  }
})
export default class extends Vue {
}
</script>
