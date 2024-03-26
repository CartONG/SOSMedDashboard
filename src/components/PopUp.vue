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
  <transition name="fade">
        <div v-if="isModalVisible">
          <div
            @click="toggleImageModalVisibility"
            class="image-modal"
          >
            <div
              class="max-w-7xl p-3 rounded-xl shadow-lg bg-white opacity-100"
            >
                <img class="w-full" :src="currentImage">
            </div>
          </div>
        </div>
      </transition>
</template>

<script lang="ts" setup>
import { store } from "@/main"
import { computed, ref } from "vue"
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

const isModalVisible = computed(() => store.getState().isImageModalVisible)
function toggleImageModalVisibility () {
  store.updateImageModalVisibility(false)
}
const currentImage = computed(() => store.getState().imageModalUrl)
</script>

<style>
.pop-up{
  /* display: flex; */
  width: 400px;
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
.popup-icon{
  height: 20px;
  margin-right: 15px;
}

.divider{
  margin: 10px 40px;
  /* border-bottom: 1px solid var(--text-color); */
}
.testimony-text{
  text-decoration: underline dotted;
}

.image-modal{
    display: flex;
    z-index: 500;
    justify-content: center;
    align-items: center;
    background-color: black;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
  }
</style>
