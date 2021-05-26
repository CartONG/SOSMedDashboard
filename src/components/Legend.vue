<template>
  <div class="flex flex-col w-1/2 legend-position-and-background rounded-2xl">
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
