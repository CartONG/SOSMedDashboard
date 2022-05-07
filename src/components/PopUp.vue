<template>
  <div class="z-100 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50" :class="scaleClass"></div>
  <div id="popUp" :style="style"
       class="z-100 fixed top-0 left-0 w-screen h-screen flex items-center justify-center transform transition-transform duration-300"
       :class="scaleClass">
    <div class="bg-white rounded-3xl p-6 max-w-[90%] sm:max-w-[20%] max-h-[80%] overflow-auto">
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
        <p class="text-sm"><span class="icon icon-anchor text-xl mr-3"/>Disembarkation port: <span id="popUpPort"
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
        <p v-if="videoAndPictures" class="text-sm"><span class="icon icon-camera text-xl mr-3"/>Videos and pictures</p>
        <div v-if="videoAndPictures" class="flex flex-wrap">
          <video class="max-w-[50%] p-1" controls>
            <source src="https://d2csxpduxe849s.cloudfront.net/media/66EA9C7F-A9A4-42AD-8C599E61222580B8/CF8BA4CF-3922-460B-B37355D9887EC364/880E034F-BA4E-406F-B450BF326C36083E.mp4" type="video/mp4">
          </video>
          <video class="max-w-[50%] p-1" controls>
            <source src="https://d2csxpduxe849s.cloudfront.net/media/66EA9C7F-A9A4-42AD-8C599E61222580B8/9545FBE7-DD24-44CD-87CA3EBB7311A116/229DFEAD-7920-4F7E-ADF5AEB2A2230295.mp4" type="video/mp4">
          </video>
          <img class="max-w-[50%] p-1" src="https://d2csxpduxe849s.cloudfront.net/media/66EA9C7F-A9A4-42AD-8C599E61222580B8/8313313F-E4A6-4A2E-82D5BCCF624CEF15/webimage-129E7C51-85BF-4015-B4FFF9BBCA7501EE.jpg">
          <img class="max-w-[50%] p-1" src="https://d2csxpduxe849s.cloudfront.net/media/66EA9C7F-A9A4-42AD-8C599E61222580B8/0914427E-16A0-4A79-A88D3794C591F6BC/webimage-58805A86-F14C-47D1-80E4ABC4C2263277.jpg">
          <img class="max-w-[50%] p-1" src="https://d2csxpduxe849s.cloudfront.net/media/66EA9C7F-A9A4-42AD-8C599E61222580B8/E853768A-7AAA-45B5-B20E7CAB6539D14F/webimage-402339B5-B0C4-4CE8-999BD0503CDC9C5F.jpg">
          <img class="max-w-[50%] p-1" src="https://d2csxpduxe849s.cloudfront.net/media/66EA9C7F-A9A4-42AD-8C599E61222580B8/009ABC55-32C5-4227-AB2D62A445BB1F85/webimage-4D1B7471-43A0-48C1-8FC092654ACC1F0D.jpg">
          <img class="max-w-[50%] p-1" src="https://d2csxpduxe849s.cloudfront.net/media/66EA9C7F-A9A4-42AD-8C599E61222580B8/4FD79A31-D585-47C3-994F84A5F226F901/webimage-B1D79186-49F7-46C8-9D0B61363AD74C87.jpg">
          <img class="max-w-[50%] p-1" src="https://d2csxpduxe849s.cloudfront.net/media/66EA9C7F-A9A4-42AD-8C599E61222580B8/A2848D9F-E5E0-449A-96AD580B22876604/webimage-6C500BC9-15A1-4B85-AF92A57300BC6774.jpg">
        </div>
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
    },
    videoAndPictures (): boolean {
      return reactiveStore.isVideoAndPicturePopUpVisible
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
