<template>
  <div
    class="flex flex-col rounded-2xl w-1/2 legend-background absolute top-32 ml-4 legend-position-mobile sm:w-60 md:right-5 md:absolute md:bottom-5 md:top-auto">
    <p class="text-xs text-center font-bold text-secondary">{{ $t("legend.title").toUpperCase() }}</p>
    <Legend-switch :id="SwitchType.rescue" :checked="switchState.rescue" :title="$t(`legend.${SwitchType.rescue}`)" color="#F03E1B" :switchable="true"></Legend-switch>
    <Legend-switch :id="SwitchType.transfer" :checked="switchState.transfer" :title="$t(`legend.${SwitchType.transfer}`)" color="#9CA3AF" :switchable="true" :tooltip="[$t(`legend.${SwitchType.transfer}`), $t('legend.transferDescription')]"></Legend-switch>
    <Legend-switch v-if="showAllLegend" :id="SwitchType.medEvac" :checked="switchState.medEvac" :title="$t(`legend.${SwitchType.medEvac}`)" color="#1A2747" :switchable="true" :tooltip="[$t(`legend.${SwitchType.medEvac}`), $t('legend.medEvacDescription')]"></Legend-switch>
    <Legend-switch :id="SwitchType.death" :checked="switchState.death" :title="$t(`legend.${SwitchType.death}`)" iconName="deaths.svg" :switchable="true"></Legend-switch>
    <Legend-switch v-if="showAllLegend" :id="SwitchType.shipwreck" :checked="switchState.shipwreck" :title="$t(`legend.${SwitchType.shipwreck}`)" iconName="shipwreck.png" :switchable="true"></Legend-switch>
    <Legend-switch v-if="showAllLegend" :id="SwitchType.incident" :checked="switchState.incident" :title="$t(`legend.${SwitchType.incident}`)" iconName="incident.png" :switchable="true"></Legend-switch>
    <div class="legend-toggler" @click="showAllLegend = !showAllLegend">{{ showAllLegend ? $t("legend.less") : $t("legend.more") }}</div>
    <svg class="h-7" viewBox="0 0 100 40">
      <line x1="0" y1="20" x2="100" y2="20" stroke="black"/>
    </svg>
    <Legend-switch :id="SwitchType.harbor" :checked="switchState.harbor" :title="$t(`legend.${SwitchType.harbor}`)" iconName="harbor.png" :switchable="false"></Legend-switch>
    <Legend-switch :id="SwitchType.srr" :checked="switchState.srr" :title="$t(`legend.${SwitchType.srr}`)" iconName="srr.png" class="srr" :switchable="false" :tooltip="[$t(`legend.${SwitchType.srr}`), $t('legend.srrDescription')]"></Legend-switch>
    <Legend-switch :id="SwitchType.zone12Miles" :checked="switchState.zone12Miles" :title="$t(`legend.water`)" iconName="territorial_water.png" :switchable="false" :tooltip="[$t(`legend.water`), $t('legend.waterDescription')]"></Legend-switch>
  </div>
</template>

<script lang='ts' setup>
import { store } from "@/main"
import { SwitchType } from "@/classes/State"
import { computed, ref } from "vue"
import LegendSwitch from "./LegendSwitch.vue"

const switchState = computed(() => store.getState().switch)
const showAllLegend = ref(false)

</script>

<style>
.legend-toggler{
  display: flex;
  align-items: center;
  justify-content: end;
  cursor: pointer;
  font-size: 0.8em;
  text-decoration: underline;
  color: rgb(102, 100, 100);
  margin-right: 10px;
}

.srr .legend-marker {
  width: 30px !important;
}
</style>
