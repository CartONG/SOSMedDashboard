<template>
<div class="Contributors__contentContent gap-3 text-main">
  <div class="flex flex-col gap-0">
    <h2 class="font-bold text-lg text-main whitespace-nowrap">
      {{ $t("contributors.volunteers")}}
    </h2>
  </div>
  <hr class="border-dotted border-main border"/>
  <div>
  <div v-for="people in volunteers" :key="people.type" class="flex flex-col">
    <p class="text-sm align-middle whitespace-nowrap">
      <span class="icon icon-rescue text-2xl mr-3 align-middle"/>
      <span class="font-bold align-middle text-lg">
        {{ $t(people.type)}}
      </span>
    </p>
    <div class="flex flex-row gap-4 ml-3">
      <div class="border border-main"> </div>
      <div class="flex flex-col align-middle whitespace-nowrap ml-2">
        <span class="text-sm" v-for="dev in people.people" :key="dev.lastName">
          {{ dev.firstName }} {{ dev.lastName }}
          <span v-if="people.type == 'contributors.others'">
            ({{ dev.contribution }})
          </span>
        </span>
      </div>
    </div>
    </div>
  </div>
  <div class="flex flex-row mt-4 align-middle gap-1">
    <img alt="logo CartONG" class="inline-block h-8 align-middle" src="@/assets/Cartong_logo-square.png"/>
    <a :href="cartongWebsite" target="_blank"><span class="text-sm align-middle">{{ cartongWebsite }}</span></a>
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
    return a.firstName.localeCompare(b.firstName)
  }
}
const volunteers = [{
  type: "contributors.dev",
  people: CONTRIBUTORS.developers.sort(compare)
}, {
  type: "contributors.others",
  people: CONTRIBUTORS.others.sort(compare)
}
]
const cartongWebsite = "https://www.cartong.org/"
</script>

<style scoped>
.Contributors__content {
  padding: 0;
  background-color: #fff;
}

.Contributors__contentContent {
  display: flex;
  flex-flow: column nowrap;
  z-index: 9999999;
}
</style>
