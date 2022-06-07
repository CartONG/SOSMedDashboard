<template>
  <div class="Contributors__container">
    <img alt="logo CartONG" class="cursor-pointer inline-block h-6 mr-8" src="../assets/Cartong_logo.png"/>
    <div class="Contributors__content rounded-3xl overflow-hidden text-main">
      <div class="Contributors__contentContent m-6">
        <h1 class="font-bold text-secondary">
          Contributors
        </h1>
        <h2 class="text-main whitespace-nowrap">
          CartONG volunteers
        </h2>
        <hr class="border-dotted border-main border"/>
        <p class="text-sm align-middle whitespace-nowrap">
          <span class="icon icon-lifebuoy text-xl mr-3 align-middle"/> <span class="font-bold align-middle">Developer team</span>
        </p>
        <div class="flex flex-row gap-4 ">
          <div class="border border-main"> </div>
          <div class="flex flex-col align-middle whitespace-nowrap">
            <p v-for="dev, key in developers" :key="key">
              {{ dev.name }}
            </p>
          </div>
        </div>
        <p class="text-sm align-middle whitespace-nowrap">
          <span class="icon icon-lifebuoy text-xl mr-3 align-middle" /> <span class="font-bold align-middle">Others</span>
        </p>
        <div class="flex flex-row gap-4 ">
          <div class="border border-main"> </div>
          <div class="flex flex-col align-middle whitespace-nowrap">
            <p v-for="dev, key in others" :key="key">
              {{ dev.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { Contributor, CONTRIBUTORS } from "@/classes/Contributors"

const compare = (a: Contributor, b: Contributor) => {
  if (a.isCartONGStaff && !b.isCartONGStaff) {
    return 1
  } else if (!a.isCartONGStaff && b.isCartONGStaff) {
    return -1
  } else {
    return a.name.localeCompare(b.name)
  }
}

const developers = CONTRIBUTORS.developpers.sort(compare)
const others = CONTRIBUTORS.others.sort(compare)
</script>

<style scoped>
.Contributors__container {
  z-index: 9999;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  position: relative;
}

.Contributors__content {
  display: flex;
  position: absolute;
  top: 100%;
  right: 0;
  padding: 0;
  background-color: #fff;
}

.Contributors__contentContent {
  display: flex;
  flex-flow: column nowrap;
  justify-content: top;
  align-items: left;
}

.Contributors__container:hover > .Contributors__content,
.Contributors__container:focus > .Contributors__content,
.Contributors__container:focus-within > .Contributors__content {
  display: flex;
}
</style>
