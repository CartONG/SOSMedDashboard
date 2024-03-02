<template>
  <transition name="fade">
    <div v-if="isPopUpVisible">
      <div class="absolute bg-black opacity-60 inset-0 z-50" @click="toggleVisibility"></div>
      <div class="pop-up">
        <operation-description v-if="popUpType === PopUpType.OPS" />
        <incident-description v-if="popUpType === PopUpType.INCIDENT" />
        <death-description v-if="popUpType === PopUpType.DEAD" />
        <shipwreck-description v-if="popUpType === PopUpType.SHIPWRECK" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { store } from "@/main"
import { computed } from "vue"
import OperationDescription from "./popUpContent/OperationDescription.vue"
import IncidentDescription from "./popUpContent/IncidentDescription.vue"
import DeathDescription from "./popUpContent/DeathDescription.vue"
import ShipwreckDescription from "./popUpContent/ShipwreckDescription.vue"
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5%;
  overflow-y: auto;
}

@media only screen and (max-width: 500px){
  .pop-up{
  width: 80%;
  max-width: 80%;
  max-height: 80%;
  z-index: 99;
  position: fixed;
  top: 10%;
  left: 10%;
  transform: none;
  background-color: white;
  border-radius: 5%;
  overflow-y: auto;
}
}
</style>
