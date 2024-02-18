<template>
  <transition name="fade">
    <div v-if="isPopUpVisible">
      <div class="absolute bg-black opacity-60 inset-0 z-50" @click="toggleVisibility"></div>
      <div class="pop-up">
        <operation-description v-if="popUpType === PopUpType.OPS" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { store } from "@/main"
import { computed } from "vue"
import OperationDescription from "./popUpContent/OperationDescription.vue"
import { PopUpType } from "@/classes/State"

function toggleVisibility () {
  store.updatePopUpVisibility()
}
const isPopUpVisible = computed(() => store.getState().isPopUpVisible)
const popUpType = computed(() => store.getState().popUpType)

</script>

<style scoped>
.pop-up{
  /* display: flex; */
  max-width: 33%;
  max-height: 80%;
  z-index: 99;
  position: fixed;
  top: 50px;
  left: 33%;
  background-color: white;
  border-radius: 5%;
  overflow-y: auto;
}

@media only screen and (max-width: 500px){
  .pop-up{
  /* display: flex; */
  width: 80%;
  max-height: 80%;
  z-index: 99;
  position: fixed;
  top: 10%;
  left: 10%;
  background-color: white;
  border-radius: 5%;
  overflow-y: auto;
}
}
</style>
