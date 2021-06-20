<template>

  <!-- mobile version -->
  <div id='stats' :style="style" class="bg-white rounded-xl flex flex-col justify-between w-full pb-10 z-10 position-mobile sm:invisible">
    <h1 class=' text-sm text-white text-center rounded-t mb-1'><span id='statsMinDate2'/> <span class ='icon icon-calendar'/> - <span id='statsMaxDate2'/><span class ='icon icon-calendar ml-1'/></h1>
    <div class='flex flex-row justify-around'>
      <div class='flex flex-col'>
        <span class ='icon icon-rescue text-4xl leading-6  text-center orange-color'/>
        <p class='text-sm blue-color font-bold'><span id='statsNbSurvivor' class='orange-color text-lg'/> people rescued</p>
      </div>
      <div class='flex flex-col'>
        <span class ='icon icon-sosmed-ship text-4xl leading-6 text-center detail-color'/>
        <p class='text-sm text-center blue-color font-bold'><span id='statsNbDays' class='orange-color text-lg'/> operational days</p>
      </div>
    </div>
  </div>

  <!-- sm version -->
  <div id='stats' :style="style" class="bg-white rounded-xl flex flex-col justify-between w-1/5 h-1/2 position-desktop invisible sm:visible">
    <h1 class='text-white text-center rounded-t mb-3'><span id='statsMinDate'/> <span class ='icon icon-calendar text-sm'/> - <span id='statsMaxDate'/><span class ='icon icon-calendar text-sm ml-1'/></h1>
    <div class='flex flex-col pb-6 pl-6 pr-6'>
      <span class ='icon icon-rescue text-5xl text-center orange-color'/>
      <p class='blue-color text-xl font-bold mb-5'><span id='statsNbSurvivor' class='orange-color'/> people rescued</p>
      <div class="flex flex-row justify-around mb-5 blue-color">
        <div class="flex flex-col">
          <span class ='icon icon-female text-5xl text-center'/>
          <span id='statsFemale' class='font-bold text-center'/>
          <p class='text-xs uppercase text-center'>females</p>
        </div>
        <div class="flex flex-col">
          <span class ='icon icon-male text-5xl text-center'/>
          <span id='statsMale' class='font-bold text-center'/>
          <p class='text-xs uppercase text-center'>males</p>
        </div>
        <div class="flex flex-col">
          <span class ='icon icon-kid text-5xl text-center'/>
          <span id='statsMinor' class='font-bold text-center'/>
          <p class='text-xs uppercase text-center'>minors</p>
        </div>
      </div>
      <div class="flex flex-row justify-around border-dotted border-color border-2 rounded-xl p-4 mb-5">
        <div class="flex flex-row">
          <div class="flex flex-col">
            <span id='statsPregnant' class='font-bold text-right detail-color'/>
            <p class='text-3xs uppercase text-right detail-color'>pregnant</p>
          </div>
          <span class ='icon icon-pregnant text-4xl text-right detail-color'/>
        </div>
        <div class="flex flex-col">
          <span class ='icon text-4xl text-center detail-color'/>
          <span id='statsUnaccompagnied' class='font-bold text-center detail-color'/>
          <p class='text-3xs uppercase text-center detail-color'>unaccompagnied</p>
        </div>
        <div class="flex flex-row">
          <span class ='icon icon-bib text-3xl text-left detail-color'/>
          <div class="flex flex-col">
          <span id='statsChildren' class='font-bold text-center detail-color'/>
          <p class='text-3xs uppercase text-left detail-color'>children</p>
          </div>
        </div>
      </div>
      <p class='text-sm text-center orange-color'><span class ='icon icon-planet mr-3'/><span id='statsNationalities'/> nationalities</p>
      <hr class='border w-1/4 ml-auto mr-auto mt-2 mb-2'/>
      <span class ='icon icon-sosmed-ship  text-8xl leading-6 text-center detail-color mb-2'/>
      <p class='text-center blue-color text-xl font-bold'><span id='statsNbDays' class='orange-color'/> operational days</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Colors } from '@/utils/Colors'

export default {
  name: 'Stats',

  computed: {
    style () {
      return `
        --orange-color: ${Colors.ORANGE};
        --blue-color: ${Colors.BLUE};
      `
    }
  }
}

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .position-desktop {
    position: absolute;
    top: 20%;
    margin-left: 5%;
  }

  .position-mobile {
    position: absolute;
    bottom: 130px;
  }

  h1 {
    background-color: var(--orange-color);
  }

  .blue-color {
    color: var(--blue-color);
  }

  .orange-color {
    color: var(--orange-color);
  }

  .detail-color {
    color: var(--orange-color);
  }

  .border-color {
    border-color: var(--orange-color);
  }

  .text-3xs {
    font-size: 0.5rem;
    line-height: 0.5rem;
  }
</style>
