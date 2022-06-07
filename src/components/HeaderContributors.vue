<template>
  <div class="Contributors__container">
    <img alt="logo CartONG" class="cursor-pointer inline-block h-6 mr-8" src="../assets/Cartong_logo.png"/>
    <div class="Contributors__content">
      CONTRIBUTORS
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "HeaderContributors"
})
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
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  padding: 0;
  background-color: aqua;
}

.Contributors__container:hover > .Contributors__content,
.Contributors__container:focus > .Contributors__content,
.Contributors__container:focus-within > .Contributors__content {
  display: flex;
}

</style>
