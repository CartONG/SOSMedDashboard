<template>
  <div class="bg-main text-white justify-between  block md:hidden">
    <div class="flex flex-row pt-1 pb-1 ml-1 mr-1">
      <h1 class='text-secondary text-center text-xs mr-5'>
        {{ $t("stats.since") }} 2016</h1>
      <p class='text-center text-white text-3xl font-bold mr-2'>
        <span id="statsNbOperationsMobile">
        </span>
      </p>
      <p class='text-xs mr-5'>{{ $t("stats.rescueNb") }}</p>
      <p class='text-center text-white text-3xl font-bold mr-2'>
        <span id="statsNbPeopleAssistedMobile">
        </span>
      </p>
      <p class='text-xs'>{{ $t("stats.peoples") }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "KeyNumbersMobile"
})
</script>
