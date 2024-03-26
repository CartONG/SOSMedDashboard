<template>
    <div id="popUp" :style="style" class="flex items-center justify-center">
      <div class="bg-white rounded-3xl p-6 overflow-auto">
        <div class="flex flex-col justify-around h-3/4">
          <div class="flex justify-between">
            <h1 class="font-bold text-secondary">{{ incidentData.type }}</h1>
          </div>
          <p class="font-bold">{{ format(incidentData.date, "full") }}</p>
          <hr class="border-dotted border-main border"/>
          <p class="text-sm"><span class="icon icon-lifebuoy text-xl mr-3"/> {{ $t("popup.boatInvolved") }}:
            <span class="font-bold">{{ incidentData.boatInvolved }}</span>
          </p>
          <p class="text-sm flex">
            <img src="@/assets/warning.svg" class="popup-icon"> {{ $t("popup.facts") }}:
            <span class="font-bold">{{ incidentData.incAction }}</span>
          </p>
          <p class="text-sm flex" v-if="incidentData.testimonySrc.length > 0">
            <img src="@/assets/comments.svg" class="popup-icon"> {{ $t("popup.testimony") }}:
            <span class="font-bold ml-2 testimony-text" v-for="(src, i) in incidentData.testimonySrc" :key="src+i">
              <a :href="src" target="_blank">{{ incidentData.testimonyName[i] }} {{ i < incidentData.testimonySrc.length -1 ? "," : "" }}</a>
            </span>
          </p>
          <div class="divider"></div>
          <p class="text-sm"><span class="icon icon-weather text-xl mr-3"/>{{ $t("popup.wind") }}: <span class="font-bold">{{ incidentData.windForce ? incidentData.windForce + $t("popup.windUnit") : $t("popup.unknown") }}</span>- {{ $t("popup.waves") }}: <span class="font-bold">{{ incidentData.waveHeight ? incidentData.waveHeight + "m" : $t("popup.unknown")}}</span></p>
          <p class="text-sm"><span class="icon icon-marker text-xl mr-3"/><span>Lat: {{ incidentData.latitude }} - Lon: {{ incidentData.longitude }}</span></p>

          <p v-if="incidentData.imageSrc.length > 0 || incidentData.videoSrc.length > 0" class="text-sm">
            <span class="icon icon-camera text-xl mr-3"/>{{ $t("popup.videosAndPictures") }}
          </p>
          <div v-if="incidentData.imageSrc.length > 0 || incidentData.videoSrc.length > 0" class="flex flex-wrap">
            <video v-for="url in incidentData.videoSrc" :key="url" class="max-w-[50%] p-1" controls controlsList="nodownload">
              <source :src="url" type="video/mp4">
            </video>
            <img v-for="url in incidentData.imageSrc" :key="url" class="max-w-[50%] p-1 cursor-pointer" :src="url" @click="setCurrentImage(url)">
          </div>
        </div>
      </div>
    </div>
  </template>

<script lang="ts" setup>
import { Colors } from "@/utils/Colors"
import { store } from "@/main"
import { computed, ref } from "vue"
import { OtherData } from "@/classes/data/OtherData"
import { format } from "@formkit/tempo"

const incidentData = computed(() => store.getState().popUpData as OtherData)
const style = `--text-color: ${Colors.BLUE};`

function setCurrentImage (url: string) {
  store.setImageModalUrl(url)
  store.updateImageModalVisibility(true)
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
