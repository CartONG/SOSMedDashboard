<template>
  <div
    class="flex flex-col rounded-2xl w-1/2 legend-background absolute top-32 ml-4 legend-position-mobile sm:w-60 md:right-5 md:absolute md:bottom-5 md:top-auto">
    <p class="text-xs text-center font-bold text-secondary">{{ $t("legend.title").toUpperCase() }}</p>
    <template v-for="(value, key, index) in switchState" :key="key">
      <svg v-if="index===2" class="h-7" viewBox="0 0 100 40">
        <line x1="0" y1="20" x2="100" y2="20" stroke="black"/>
      </svg>
      <LegendSwitch :id="SwitchType[key]" :title="$t(`legend.${key}`)" :checked="value"></LegendSwitch>
    </template>
  </div>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent } from "vue"
import { store } from "@/main"
import { SwitchType } from "@/classes/State"

export default defineComponent({
  computed: {
    SwitchType () {
      return SwitchType
    }
  },
  components: {
    LegendSwitch: defineAsyncComponent(() => import("./Switch.vue"))
  },
  name: "Base-Map-Legend",
  data: function () {
    return {
      switchState: store.getState().switch
    }
  }
})
</script>
