<template>
  <div class="Contributors__container flex flex-col h-8 justify-center items-center">
    <img alt="logo CartONG" class="Contributors__img cursor-pointer inline-block h-full bg-white" src="../assets/Cartong_logo-square.png"/>
    <HeaderContributorsContent class="Contributors__content rounded-3xl overflow-hidden"/>
  </div>

</template>

<script setup lang="ts">
import HeaderContributorsContent from "./HeaderContributorsContent.vue"
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
