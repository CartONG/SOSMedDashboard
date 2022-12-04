<template>
  <div class="bg-main text-white rounded-xl flex-col justify-between position-desktop absolute hidden md:flex">
    <div class="flex flex-col pt-2 pb-6 pl-6 pr-6 gap-2">
      <h1 class='text-secondary text-center'>
        {{ $t("stats.since") }} 2016</h1>
        <div class='flex flex-row gap-4'>
          <div class='flex flex-col'>
            <p class='text-center text-white text-xl font-bold'>
              <span id="statsNbOperations">
              </span>
            </p>
            <p>{{ $t("stats.rescueNb") }}</p>
          </div>
            <div class='flex flex-col'>
            <p class='text-center text-white text-xl font-bold'>
              <span id="statsNbPeopleAssisted">
              </span>
            </p>
            <p>{{ $t("stats.peoples") }}</p>
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
  top: 17%;
  right: 1em;
}
</style>
