<template>
  <div class="bg-main text-white rounded-xl flex-col justify-between position-desktop absolute hidden md:flex">
    <div class="flex flex-col pt-2 pb-6 pl-6 pr-6 gap-2">
      <h1 class='text-secondary text-center text-xl'>
        {{ $t("stats.since") }} 2016</h1>
        <div class='flex flex-row gap-4'>
          <div class='flex flex-col'>
            <p class='text-center text-white text-5xl font-black'>
              <span id="statsNbOperations">
              </span>
            </p>
            <p class="text-white text-l font-black">{{ $t("stats.rescueNb") }}</p>
          </div>
            <div class='flex flex-col'>
            <p class='text-center text-white text-5xl font-black'>
              <span id="statsNbPeopleAssisted">
              </span>
            </p>
            <p class="text-white text-l font-black">{{ $t("stats.peoples") }}</p>
          </div>
          <div>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "KeyNumbers"
})
</script>

<style scoped>
.position-desktop {
  align-items: center;
  top: 3rem;
  right: 20px;
  width: 22vw;
}
</style>
