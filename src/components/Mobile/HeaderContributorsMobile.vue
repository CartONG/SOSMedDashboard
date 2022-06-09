<template>
  <div class="Contributors__container flex flex-col items-start">
    <div class="cursor-pointer" @click="react.showContributors = !react.showContributors">
      Contributors
      <img alt="logo CartONG" class="Contributors__img cursor-pointer inline-block h-10 bg-white" src="@/assets/Cartong_logo-square.png"/>
    </div>
    <HeaderContributorsContent class="Contributors__content" v-if="react.showContributors"/>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "@vue/reactivity"
import HeaderContributorsContent from "../HeaderContributorsContent.vue"

const react = reactive({
  showContributors: false
})
</script>

<style scoped>
.Contributors__container {
  z-index: 9999;
}

.Contributors__img{
  border-radius: 3px;
  overflow: hidden;
}

</style>
