<template>
  <div class="flex flex-col rounded-2xl w-1/2 legend-background legend-position-mobile sm:w-1/6 sm:legend-position-desktop">
    <p class="text-xs text-center font-bold" :style=viewStyle>VIEW</p>
    <Switch id='rescue' name="Rescue" :markerStyle=rescueMarkerStyle />
    <Switch id='transfert' name="Transfert" :markerStyle=transfertMarkerStyle />
    <Switch id='medical' name="Medical Evacuation" :markerStyle=medicalMarkerStyle />
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import Switch from './Switch.vue'
import { blueColor, orangeColor, grayColor } from '../classes/colors'

@Options({
  components: {
    Switch
  }
})
export default class extends Vue {
  data () {
    return {
      rescueMarkerStyle: 'background-color:' + grayColor,
      transfertMarkerStyle: 'background-color:' + orangeColor,
      medicalMarkerStyle: 'background-color:' + blueColor,
      viewStyle: 'color:' + orangeColor
    }
  }
}
</script>
