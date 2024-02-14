<template>
  <transition name="fade">
    <div v-if="isPopUpVisible">
      <div class="absolute bg-black opacity-70 inset-0 z-50" @click="toggleVisibility"></div>
      <div
          class="pop-up"
        >
        Wesh
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { reactiveStore } from "@/Store"
import { computed } from "vue"

function toggleVisibility () {
  reactiveStore.updatePopUpVisibility()
}

const isPopUpVisible = computed(() => reactiveStore.isPopUpVisible)
</script>

<style scoped>
.pop-up{
  display: flex;
  width: 33%;
  height: 80%;
  z-index: 2000;
  position: fixed;
  top: 50px;
  left: 33%;
  background-color: white;
  border-radius: 5%;
}
</style>
