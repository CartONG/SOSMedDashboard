<template>
  <svg class="cursor-pointer text-main fill-current w-14" :class="{hidden: menuVisibility}"
       viewBox="0 0 90 60" @click="setMenuVisibility(true)">
    <rect width="80" height="15" rx="8"></rect>
    <rect y="20" width="80" height="15" rx="8"></rect>
    <rect y="40" width="80" height="15" rx="8"></rect>
  </svg>
  <svg class="cursor-pointer text-main fill-current w-14" :class="{hidden: !menuVisibility}"
       viewBox="0 0 90 60" @click="setMenuVisibility(false)">
    <line x1="15" y1="5" x2="65" y2="55" stroke="currentColor" stroke-width="15" stroke-linecap="round"
          stroke-linejoin="round"/>
    <line x1="65" y1="5" x2="15" y2="55" stroke="currentColor" stroke-width="15" stroke-linecap="round"
          stroke-linejoin="round"/>
  </svg>
</template>

<script lang='ts'>
import { Vue } from 'vue-class-component'

export default class Menu extends Vue {
  menuVisibility = false;

  setMenuVisibility (isVisible: boolean) {
    this.menuVisibility = isVisible
  }
}
</script>
