<template>
  <div class="Contributors__container flex flex-col h-8 justify-center items-center">
    <img alt="logo CartONG" class="Contributors__img cursor-pointer inline-block h-full bg-white" src="../assets/Cartong_logo-square.png"/>
    <div class="Contributors__content rounded-3xl overflow-hidden text-main">
      <div class="Contributors__contentContent m-8 gap-3">
        <div class="flex flex-col gap-0" >
          <h1 class="font-bold text-xl text-secondary">
            Contributors
          </h1>
          <h2 class="font-bold text-lg text-main whitespace-nowrap">
            CartONG volunteers
          </h2>
        </div>
        <hr class="border-dotted border-main border"/>
        <div>
        <div v-for="people, key in volunteers" :key="key" class="flex flex-col">
          <p class="text-sm align-middle whitespace-nowrap">
            <span class="icon icon-rescue text-2xl mr-3 align-middle"/>
            <span class="font-bold align-middle text-lg">{{ people.type }}</span>
          </p>
          <div class="flex flex-row gap-4 ml-3">
            <div class="border border-main"> </div>
            <div class="flex flex-col align-middle whitespace-nowrap ml-2">
              <span class="text-sm" v-for="dev, key in people.people" :key="key">
                {{ dev.name }}
              </span>
            </div>
          </div>
          </div>
        </div>
        <div class="flex flex-row mt-4 align-middle gap-1">
          <img alt="logo CartONG" class="inline-block h-8 align-middle" src="../assets/Cartong_logo-square.png"/>
          <a :href="cartongWebsite" target="_blank"><span class="text-sm align-middle">{{ cartongWebsite }}</span></a>
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
const volunteers = [{
  type: "Developer team",
  people: CONTRIBUTORS.developpers.sort(compare)
}, {
  type: "Others",
  people: CONTRIBUTORS.others.sort(compare)
}
]
const cartongWebsite = "https://www.cartong.org/"
</script>

<style scoped>
.Contributors__container {
  z-index: 9999;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  position: relative;
}

.Contributors__img{
  border-radius: 3px;
  overflow: hidden;
}

.Contributors__content {
  display: none;
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
