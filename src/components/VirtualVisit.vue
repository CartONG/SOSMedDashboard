<template>
  <div class="virtual-visit-container rounded-xl" :class="{ invisible: !store.getState().virtualVisitAlreadyOpened, visible: store.getState().virtualVisitAlreadyOpened }">
    <iframe src="https://oceanviking.sosmediterranee.ch/" name="Ocean Viking virtual Tour" scrolling="Yes" height="100%"
            width="100%" style="border: none;"></iframe>
  </div>
</template>

<script lang="ts">
import { store } from "@/main"
import { defineComponent, onMounted } from "vue"

export default defineComponent({
  setup () {
    onMounted(() => {
      window.onclick = function (event) {
        const target = event.target as HTMLTextAreaElement
        if (!target.matches(".virtual-visit-container") && !target.matches(".virtual-visit-shower")) {
          if (store.getState().virtualVisitAlreadyOpened) {
            store.switchVirtualVisitVisibility()
          }
        }
      }
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          if (store.getState().virtualVisitAlreadyOpened) {
            store.switchVirtualVisitVisibility()
          }
        }
      })
    })

    return { store }
  }
})
</script>

<style>
.virtual-visit-container {
  position: absolute;
  z-index: 2000;
}

/* Desktop */
@media only screen and (min-width: 761px) {
  .virtual-visit-container {
    top: 20%;
    left: 25%;
    width: 50%;
    height: 50%;
  }
}

/* Mobile */
@media only screen and (max-width: 760px) {
  .virtual-visit-container {
    top: 25%;
    left: 0;
    width: 100%;
    height: 50%;
  }
}
</style>
