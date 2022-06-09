<template>
    <div class="virtual-visit-container rounded-xl">
        <iframe src="https://oceanviking.sosmediterranee.ch/" name="Ocean Viking virtual Tour" scrolling="Yes" height="100%" width="100%" style="border: none;"></iframe>
    </div>
</template>

<script setup lang="ts">
import { reactiveStore } from "@/Store"
import { onMounted } from "vue"

onMounted(() => {
  window.onclick = function (event) {
    const target = event.target as HTMLTextAreaElement
    if (!target.matches(".virtual-visit-container") && !target.matches(".virtual-visit-shower")) {
      if (reactiveStore.virtualVisitVisibility) reactiveStore.switchVirtualVisitVisibility()
    }
  }
})
</script>

<style >
.virtual-visit-container{
    position:absolute;
    z-index: 2000;
}
/* Desktop */
@media only screen and (min-width: 761px) {
    .virtual-visit-container{
        top: 20%;
        left: 25%;
        width:50%;
        height: 50%;
    }
}
/* Mobile */
@media only screen and (max-width: 760px) {
    .virtual-visit-container{
        top: 25%;
        left: 0;
        width:100%;
        height: 50%;
    }
}
</style>
