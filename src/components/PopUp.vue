<template>
  <div class="z-100 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50" :class="scaleClass"></div>
  <div id="popUp" :style="style"
       class="z-100 fixed top-0 left-0 w-screen h-screen flex items-center justify-center transform transition-transform duration-300"
       :class="scaleClass">
    <div class="bg-white rounded-3xl p-6">
      <div class="flex flex-col justify-around h-3/4">
        <div class="flex justify-between">
          <h1 id="popUpTypeOps" class="font-bold text-secondary"/>
          <button id="closeButton" type="button" class="focus:outline-none text-grayClose">X</button>
        </div>
        <p id="popUpDate"/>
        <hr class="border-dotted border-main border"/>
        <p class="text-sm"><span class="icon icon-lifebuoy text-xl mr-3"/>Boat in distress: <span id="popUpBoatType"
                                                                                                  class="font-bold"/>
        </p>
        <p class="text-sm"><span class="icon icon-rescue text-xl mr-3"/><span id="popUpNbSurvivor" class="font-bold"/>
          people rescued</p>
        <div class="flex flex-row">
          <div class="vertical-separator border-main ml-3"/>
          <div class="ml-3">
            <div class="flex flex-row justify-around mb-5">
              <div class="flex flex-col">
                <span class="icon icon-female text-6xl text-center md:text-5xl"/>
                <span id="popUpFemale" class="font-bold text-center"/>
                <p class="text-xs uppercase text-center">females</p>
              </div>
              <div class="flex flex-col">
                <span class="icon icon-male text-6xl text-center md:text-5xl"/>
                <span id="popUpMale" class="font-bold text-center"/>
                <p class="text-xs uppercase text-center">males</p>
              </div>
              <div class="flex flex-col">
                <span class="icon icon-kid text-6xl text-center md:text-5xl"/>
                <span id="popUpMinor" class="font-bold text-center"/>
                <p class="text-xs uppercase text-center">minors</p>
              </div>
            </div>
            <div class="flex flex-row justify-around border-dotted border-secondary border-2 rounded-xl p-4 mb-5">
              <div class="flex flex-row">
                <div class="flex flex-col">
                  <span id="popUpPregnant" class="font-bold text-right color-secondary"/>
                  <p class="text-3xs uppercase text-right color-secondary">pregnant</p>
                </div>
                <span class="icon icon-pregnant text-4xl text-right color-secondary"/>
              </div>
              <div class="flex flex-col">
                <span class="icon text-4xl text-center color-secondary"/>
                <span id="popUpUnaccompagnied" class="font-bold text-center color-secondary"/>
                <p class="text-3xs uppercase text-center color-secondary">unaccompagnied</p>
              </div>
              <div class="flex flex-row">
                <span class="icon icon-bib text-3xl text-left color-secondary"/>
                <div class="flex flex-col">
                  <span id="popUpChildren" class="font-bold text-left color-secondary"/>
                  <p class="text-3xs uppercase text-left color-secondary">children</p>
                </div>
              </div>
            </div>
            <p class="text-sm text-center"><span class="icon icon-planet text-sm mr-3"/><span id="popUpNationalities"/>
              nationalities</p>
          </div>
        </div>
        <p class="text-sm"><span class="icon icon-weather text-xl mr-3"/>Wind: <span id="popUpWind"/> knots - Wave
          height: <span id="popUpWave"/> m</p>
        <p class="text-sm"><span class="icon icon-marker text-xl mr-3"/>Lat: <span id="popUpLat"/> - Lon: <span
          id="popUpLon"/></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Colors } from "@/utils/Colors"
import { ReactiveStore, reactiveStore } from "@/Store"

export default {
  name: "PopUp",

  computed: {
    scaleClass (): string {
      if (reactiveStore.isPopUpVisible) {
        return "scale-100"
      }
      return "scale-0"
    },
    style (): string {
      return `
        --text-color: ${Colors.BLUE};
      `
    }
  },
  data (): { reactiveStore: ReactiveStore } {
    return { reactiveStore }
  },
  mounted (): void {
    const popUpMap = document.getElementById("popUp")
    const closeButton = document.getElementById("closeButton")
    if (closeButton && popUpMap) {
      closeButton.addEventListener("click", () => {
        reactiveStore.updatePopUpVisibility()
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: x-large;
}

p, span {
  color: var(--text-color);
}

.text-3xs {
  font-size: 0.5rem;
  line-height: 0.5rem;
}

.vertical-separator {
  border-right: 1px solid;
}

button {
  left: 100%;
}
</style>
