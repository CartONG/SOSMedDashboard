<template>
  <div class="Contributors__container flex flex-col w-9 justify-center items-center">
    <img alt="logo CartONG" class="Contributors__img cursor-pointer inline-block h-full" src="@/assets/Cartong_logo-square-white.png"/>
    <div class="Contributors__content text-main bg-white p-0 rounded-3xl overflow-hidden ">
      <div class="m-8 flex flex-col">
      <h1 class="font-bold text-xl text-secondary">
        Contributors
      </h1>
      <HeaderContributorsContent />
    </div>
    </div>
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

.Contributors__content {
  display: none;
  flex-flow: column nowrap;
  justify-content: top;
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
