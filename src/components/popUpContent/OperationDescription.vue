<template>
    <div id="popUp" :style="style" class="flex items-center justify-center">
      <div class="bg-white rounded-3xl p-6 overflow-auto">
        <div class="flex flex-col justify-around h-3/4">
          <div class="flex justify-between">
            <h1 class="font-bold text-secondary">{{ opsData.typeOps }}</h1>
          </div>
          <p>{{ format(opsData.date, "full") }}</p>
          <hr class="border-dotted border-main border"/>
          <p class="text-sm"><span class="icon icon-lifebuoy text-xl mr-3"/> {{ $t("popup.boat") }}:
            <span class="font-bold">{{ opsData.boatType }}</span>
          </p>
          <p class="text-sm"><span class="icon icon-anchor text-xl mr-3"/>{{ $t("popup.port") }}:
            <span class="font-bold">{{ opsData.portDisembarkation }}</span>
          </p>
          <p class="text-sm"><span class="icon icon-rescue text-xl mr-3"/>
            <span class="font-bold">{{ opsData.nbSurvivor }}</span>
            {{ $t("stats.peoples") }}</p>
          <div class="flex flex-row">
            <div class="vertical-separator border-main ml-3"/>
            <div class="ml-3">
              <div class="flex flex-row justify-around mb-5">
                <div class="flex flex-col">
                  <span class="icon icon-female text-6xl text-center md:text-5xl"/>
                  <span class="font-bold text-center" >{{ opsData.female }}</span>
                  <p class="text-xs uppercase text-center">{{ $t("stats.females") }}</p>
                </div>
                <div class="flex flex-col">
                  <span class="icon icon-male text-6xl text-center md:text-5xl"/>
                  <span class="font-bold text-center" >{{ opsData.male }}</span>
                  <p class="text-xs uppercase text-center">{{ $t("stats.males") }}</p>
                </div>
                <div class="flex flex-col">
                  <span class="icon icon-kid text-6xl text-center md:text-5xl"/>
                  <span class="font-bold text-center" >{{ opsData.under18 }}</span>
                  <p class="text-xs uppercase text-center">{{ $t("stats.minors") }}</p>
                </div>
              </div>
              <div class="flex flex-row justify-around border-dotted border-secondary border-2 rounded-xl p-4 mb-5">
                <div class="flex flex-row">
                  <div class="flex flex-col">
                    <span class="font-bold text-right color-secondary">{{ opsData.pregnantWomen }}</span>
                    <p class="text-3xs uppercase text-right color-secondary">{{ $t("stats.pregnants") }}</p>
                  </div>
                  <span class="icon icon-pregnant text-4xl text-right color-secondary"/>
                </div>
                <div class="flex flex-col">
                  <span class="icon text-4xl text-center color-secondary"/>
                  <span class="font-bold text-center color-secondary">{{ opsData.under18unacc }}</span>
                  <p class="text-3xs uppercase text-center color-secondary">{{ $t("stats.unaccompanied") }}</p>
                </div>
                <div class="flex flex-row">
                  <span class="icon icon-bib text-3xl text-left color-secondary"/>
                  <div class="flex flex-col">
                    <span class="font-bold text-left color-secondary">{{ opsData.under5 }}</span>
                    <p class="text-3xs uppercase text-left color-secondary">{{ $t("stats.children") }}</p>
                  </div>
                </div>
              </div>
              <p class="text-sm text-center"><span class="icon icon-planet text-sm mr-3"/>
                <span class="font-bold">{{ opsData.nbNationalities.split(";").length.toString() }}</span>
                {{ $t("stats.nationalities") }}</p>
            </div>
          </div>
          <p class="text-sm"><span class="icon icon-weather text-xl mr-3"/>{{ $t("popup.wind") }}: <span class="font-bold">{{ opsData.windForce ? opsData.windForce + $t("popup.windUnit") : $t("popup.unknown") }}</span>- {{ $t("popup.waves") }}: <span class="font-bold">{{ opsData.waveHeight ? opsData.waveHeight + "m" : $t("popup.unknown")}}</span></p>
          <p class="text-sm"><span class="icon icon-marker text-xl mr-3"/><span>Lat: {{ opsData.latitude }} - Lon: {{ opsData.longitude }}</span></p>
          <p v-if="opsData.imageSrc.length > 0 || opsData.videoSrc.length > 0" class="text-sm"><span class="icon icon-camera text-xl mr-3"/>{{ $t("popup.videosAndPictures") }}</p>
          <div v-if="opsData.imageSrc.length > 0 || opsData.videoSrc.length > 0" class="flex flex-wrap">
            <video v-for="url in opsData.videoSrc" :key="url" class="max-w-[50%] p-1" controls controlsList="nodownload">
              <source :src="url" type="video/mp4">
            </video>
            <img v-for="url in opsData.imageSrc" :key="url" class="max-w-[50%] p-1 cursor-pointer" :src="url" @click="setCurrentImage(url)">
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
        <div v-if="isModalVisible">
          <div
            @click="toggleImageModalVisibility"
            class="image-modal"
          >
            <div
              class="max-w-7xl p-3 rounded-xl shadow-lg bg-white opacity-100"
            >
                <img class="w-full" :src="currentImage">
            </div>
          </div>
        </div>
      </transition>
  </template>

<script lang="ts" setup>
import { Colors } from "@/utils/Colors"
import { store } from "@/main"
import { computed, ref } from "vue"
import { OpsData } from "@/classes/data/OpsData"
import { format } from "@formkit/tempo"

const opsData = computed(() => store.getState().popUpData as OpsData)
const style = `--text-color: ${Colors.BLUE};`

const isModalVisible = ref(false)
function toggleImageModalVisibility () {
  isModalVisible.value = !isModalVisible.value
}
function setCurrentImage (url: string) {
  currentImage.value = url
  isModalVisible.value = true
}
const currentImage = ref("")

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

  .image-modal{
    display: flex;
    z-index: 100;
    justify-content: center;
    align-items: center;
    background-color: black;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
  }
  </style>
