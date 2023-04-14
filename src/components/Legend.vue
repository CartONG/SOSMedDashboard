<template>
  <div
    class="flex flex-col rounded-2xl w-1/2 legend-background absolute top-32 ml-4 legend-position-mobile sm:w-60 md:right-5 md:absolute md:bottom-5 md:top-auto">
    <p class="text-xs text-center font-bold text-secondary">{{ $t("legend.title").toUpperCase() }}</p>
    <template v-for="(value, key, index) in switchState" :key="key">
      <svg v-if="index===3" class="h-7" viewBox="0 0 100 40">
        <line x1="0" y1="20" x2="100" y2="20" stroke="black"/>
      </svg>
      <Switch :id="SwitchType[key]" :title="$t(`legend.${key}`)" :checked="value"></Switch>
    </template>
  </div>
</template>

<script lang='ts'>
import Switch from "./Switch.vue"
import { defineComponent } from "vue"
import { store } from "@/Store"
import { SwitchType } from "@/classes/State"

export default defineComponent({
  computed: {
    SwitchType () {
      return SwitchType
    }
  },
  components: {
    Switch
  },
  name: "Base-Map-Legend",
  data: function () {
    return {
      switchState: store.state.switch
    }
  }
})
</script>
