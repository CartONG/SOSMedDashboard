// Inspired from https://tailwindcomponents.com/component/very-simple-modal
<template>
  <div id='popUp' :style="style"
       class='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform scale-0 transition-transform duration-300'>
    <div class="bg-white w-screen h-screen sm:w-1/4 sm:h-1/2 p-12">
      <button id="closebutton" type="button" class="focus:outline-none relative">X</button>
      <div class="flex flex-col justify-around h-3/4">
        <h1 id='popUpTypeOps' class='font-bold'/>
        <p id='popUpDate'/>
        <hr class='border-dotted separator-color'/>
        <p class='text-sm'><span class ='icon icon-lifebuoy text-xl mr-3'/>Boat in distress: <span id='popUpBoatType' class='font-bold'/></p>
        <p class='text-sm'><span class ='icon icon-rescue text-xl mr-3'/><span id='popUpNbSurvivor' class='font-bold'/> people rescued</p>
        <div class="flex flex-row">
          <div class="vertical-separator separator-color ml-3"/>
          <div class="ml-3">
            <div class="flex flex-row justify-around mb-5">
              <div class="flex flex-col">
                <span class ='icon icon-female text-6xl text-center'/>
                <span id='popUpFemale' class='font-bold text-center'/>
                <p class='text-xs uppercase text-center'>females</p>
              </div>
              <div class="flex flex-col">
                <span class ='icon icon-male text-6xl text-center'/>
                <span id='popUpMale' class='font-bold text-center'/>
                <p class='text-xs uppercase text-center'>males</p>
              </div>
              <div class="flex flex-col">
                <span class ='icon icon-kid text-6xl text-center'/>
                <span id='popUpMinor' class='font-bold text-center'/>
                <p class='text-xs uppercase text-center'>minors</p>
              </div>
            </div>
            <div class="flex flex-row justify-around border-dotted border-color border-2 rounded-xl p-4 mb-5">
              <div class="flex flex-row">
                <div class="flex flex-col">
                  <span id='popUpPregnant' class='font-bold text-right detail-color'/>
                  <p class='text-3xs uppercase text-right detail-color'>pregnant</p>
                </div>
                <span class ='icon icon-pregnant text-4xl text-right detail-color'/>
              </div>
              <div class="flex flex-col">
                <span class ='icon text-4xl text-center detail-color'/>
                <span id='popUpUnaccompagnied' class='font-bold text-center detail-color'/>
                <p class='text-3xs uppercase text-center detail-color'>unaccompagnied</p>
              </div>
              <div class="flex flex-row">
                <span class ='icon icon-bib text-3xl text-left detail-color'/>
                <div class="flex flex-col">
                <span id='popUpChildren' class='font-bold text-left detail-color'/>
                <p class='text-3xs uppercase text-left detail-color'>children</p>
                </div>
              </div>
            </div>
            <p class='text-sm text-center'><span class ='icon icon-planet text-sm mr-3'/><span id='popUpNationalities'/> nationalities</p>
          </div>
        </div>
        <p class='text-sm'><span class ='icon icon-weather text-xl mr-3'/>Wind: <span id='popUpWind'/> knots - Wave height: <span id='popUpWave'/> m</p>
        <p class='text-sm'><span class ='icon icon-marker text-xl mr-3'/>Lat: <span id='popUpLat'/> - Lon: <span id='popUpLon'/></p>
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
        --detail-color: ${Colors.ORANGE};
        --separator-color: ${Colors.BLUE};
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

  p, span {
    color: var(--text-color);
  }

  .detail-color {
    color: var(--detail-color);
  }

  .separator-color {
    border-color: var(--separator-color);
  }

  .border-color {
    border-color: var(--detail-color);
  }

  .text-3xs {
    font-size: 0.5rem;
    line-height: 0.5rem;
  }

  .vertical-separator {
    border-right: 1px solid;
  }

  button {
    color: var(--cross-color);
    left: 100%;
  }
</style>
