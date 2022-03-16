<template>
  <div v-if="reactiveStore.isMenuVisible" class="fixed inset-0 bg-opacity-50 bg-black z-20">
    <div class="fixed right-0 bg-white w-80 rounded-lg">
      <nav class="text-lg text-main flex flex-col font-black">
        <ul class="list-disc pl-12 pt-6 pb-6 space-y-3">
          <li><a href="#">Glossary</a></li>
          <li><a href="https://onboard.sosmediterranee.org/">Log Book</a></li>
        </ul>
        <a class="bg-secondary text-donationText uppercase hover:bg-donationHoverBackground text-center rounded-b-lg"
           href="https://don.sosmediterranee.org/?utm_source=sitesosmediterranee&utm_medium=site&utm_campaign=don_site_faireundon" target="_blank">Faire un don</a>
      </nav>
      <button class="w-10 absolute top-0.5 right-0.5">
        <svg viewBox="0 0 70 70" @click="updateMenuVisibility()">
          <line :class="{hidden: !reactiveStore.isMenuVisible}" x1="15" y1="15" x2="55" y2="55" stroke="currentColor"
                stroke-width="15" stroke-linecap="round"
                stroke-linejoin="round"/>
          <line :class="{hidden: !reactiveStore.isMenuVisible}" x1="55" y1="15" x2="15" y2="55" stroke="currentColor"
                stroke-width="15" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { reactiveStore } from "@/Store"

export default {
  setup () {
    return { reactiveStore }
  },
  methods: {
    updateMenuVisibility () {
      reactiveStore.updateMenuVisibility()
    }
  },
  name: "Mobile-Menu"
}
</script>
