// Inspired from https://tailwindcomponents.com/component/very-simple-modal
<template>
  <div id='popUp' :style="style"
       class='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform scale-0 transition-transform duration-300'>
    <div class="bg-white w-screen h-screen sm:w-1/4 sm:h-1/2 p-12">
      <button id="closebutton" type="button" class="focus:outline-none relative">X</button>
      <div class="flex flex-col justify-around h-3/4">
        <h1 id='popUpTypeOps' class='font-bold'/>
        <p id='popUpDate'/>
        <p>Boat in distress: <span id='popUpBoatType' class='font-bold'/></p>
        <p><span id='popUpNbSurvivor'  class='font-bold'/> people rescued</p>
        <p>Wind: <span id='popUpWind'/> knots - Wave height: <span id='popUpWave'/> m</p>
        <p>Lat: <span id='popUpLat'/> - Lon: <span id='popUpLon'/></p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Colors } from '@/utils/Colors'

export default {
  name: 'PopUp',

  computed: {
    style () {
      return `
        z-index: 100;
        --title-color: ${Colors.ORANGE};
        --text-color: ${Colors.BLUE};
        --cross-color: ${Colors.GRAY};
      `
    }
  },

  mounted () {
    const popUpMap = document.getElementById('popUp')
    const closebutton = document.getElementById('closebutton')
    if (closebutton && popUpMap) {
      closebutton.addEventListener('click', () => popUpMap.classList.remove('scale-100'))
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: var(--title-color);
    font-size: x-large;
  }

  p {
    color: var(--text-color);
  }

  button {
    color: var(--cross-color);
    left: 100%;
  }
</style>
