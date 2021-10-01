<template>

  <!-- mobile version -->
  <div class="bg-white rounded-xl flex flex-col justify-between w-full z-10 md:hidden">
    <div class="text-xs text-white bg-secondary rounded-t-2xl flex justify-center items-center h-8">
      <span id="statsMinDate2"/>
      <span class="icon icon-calendar ml-1 mr-2"/>
      <svg class="w-20" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="100" r="30" fill="white" />
        <line x1="50" y1="100" x2="750" y2="100" stroke="white" stroke-width="15"/>
        <circle cx="750" cy="100" r="30" fill="white" />
      </svg>
      <span id="statsMaxDate2" class="ml-2"/>
      <span class="icon icon-calendar ml-1"/>
    </div>
    <div id="displaying-button" class="text-center icon flex-0 mr-2 cursor-pointer" :class="{ 'icon-help-circle': !displayingStats, 'icon-camera': displayingStats }"
            v-on:click="displayingStats = !displayingStats"/>
    <div v-if="displayingStats" id="stats-content" class="flex flex-row justify-around">
      <div class="flex flex-col">
        <span class="icon icon-rescue text-4xl leading-6  text-center text-secondary"/>
        <p class="text-sm text-main font-bold"><span id="statsNbSurvivor2" class="text-secondary text-lg"/> people
          rescued</p>
      </div>
      <div class="flex flex-col">
        <span class="icon icon-sosmed-ship text-4xl leading-6 text-center text-secondary"/>
        <p class="text-sm text-center text-main font-bold"><span id="statsNbDays2" class="text-secondary text-lg"/>
          operational days</p>
      </div>
    </div>
  </div>

  <!-- sm version -->
  <div class="bg-white rounded-xl flex-col justify-between position-desktop absolute hidden md:flex">
    <h1 class="bg-secondary text-white text-center rounded-t mb-3"><span id="statsMinDate"/> <span
      class="icon icon-calendar text-sm"/> - <span id="statsMaxDate"/><span class="icon icon-calendar text-sm ml-1"/>
    </h1>
    <div class="flex flex-col pb-6 pl-6 pr-6">
      <span class="icon icon-rescue text-5xl text-center text-secondary"/>
      <p class="text-main text-xl font-bold mb-5"><span id="statsNbSurvivor" class="text-secondary"/> people rescued</p>
      <div class="flex flex-row justify-around mb-5 text-main">
        <div class="flex flex-col">
          <span class="icon icon-female text-5xl text-center"/>
          <span id="statsFemale" class="font-bold text-center"/>
          <p class="text-xs uppercase text-center">females</p>
        </div>
        <div class="flex flex-col">
          <span class="icon icon-male text-5xl text-center"/>
          <span id="statsMale" class="font-bold text-center"/>
          <p class="text-xs uppercase text-center">males</p>
        </div>
        <div class="flex flex-col">
          <span class="icon icon-kid text-5xl text-center"/>
          <span id="statsMinor" class="font-bold text-center"/>
          <p class="text-xs uppercase text-center">minors</p>
        </div>
      </div>
      <div class="flex flex-row justify-around border-dotted border-secondary border-2 rounded-xl p-4 mb-5">
        <div class="flex flex-row">
          <div class="flex flex-col">
            <span id="statsPregnant" class="font-bold text-right text-secondary"/>
            <p class="text-3xs uppercase text-right text-secondary">pregnant</p>
          </div>
          <span class="icon icon-pregnant text-4xl text-right text-secondary"/>
        </div>
        <div class="flex flex-col">
          <span class="icon text-4xl text-center text-secondary"/>
          <span id="statsUnaccompagnied" class="font-bold text-center text-secondary"/>
          <p class="text-3xs uppercase text-center text-secondary">unaccompagnied</p>
        </div>
        <div class="flex flex-row">
          <span class="icon icon-bib text-3xl text-left text-secondary"/>
          <div class="flex flex-col">
            <span id="statsChildren" class="font-bold text-center text-secondary"/>
            <p class="text-3xs uppercase text-left text-secondary">children</p>
          </div>
        </div>
      </div>
      <p class="text-sm text-center text-secondary"><span class="icon icon-planet mr-3"/><span id="statsNationalities"/>
        nationalities</p>
      <hr class="border w-1/4 ml-auto mr-auto mt-2 mb-2"/>
      <span class="icon icon-sosmed-ship  text-8xl leading-6 text-center text-secondary mb-2"/>
      <p class="text-center text-main text-xl font-bold"><span id="statsNbDays" class="text-secondary"/> operational days
      </p>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue"

export default defineComponent({
  data () {
    return { displayingStats: true }
  },
  name: "Stats"
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.position-desktop {
  top: 20%;
  margin-left: 5%;
}
</style>
