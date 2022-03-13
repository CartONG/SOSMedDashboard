<template>
  <header>
    <div class="lg:hidden">
      <div class="flex items-center">
        <div class="m-2 text-main leading-3 font-black" onclick="location.href='https://www.sosmediterranee.fr/';"
             style="cursor: pointer">
          <p class="text-center">SOS</p>
          <p class="text-tiny uppercase">Mediterranee</p>
        </div>
        <div>
          <p class="text-xl align-middle leading-5 text-main">Carte Interactive</p>
          <p class="text-base align-middle leading-3 text-secondary">
            Historique des opérations de secours en Méditerranée
          </p>
        </div>
        <div class="flex-shrink-0 flex-grow w-2"></div>
        <BurgerMenu @click="updateMenuVisibility()"/>
      </div>
      <div class="bg-main h-1"></div>
    </div>
    <div class="hidden lg:block">
      <div class="flex my-4 ml-8">
        <div class="flex-none flex items-center">
          <div>
            <p class="text-xl leading-6 text-main">Carte Interactive</p>
            <p class="text-base leading-4 text-secondary">
              Historique des opérations de secours en Méditerranée
            </p>
          </div>
          <i class="ml-14 text-8xl leading-6 icon icon-sosmed-ship"></i>
        </div>
        <div class="flex-grow"></div>
        <a class="bg-secondary font-black text-donationText uppercase flex items-center mr-8 pl-2 pr-2 text-lg hover:bg-donationHoverBackground"
           href="https://don.sosmediterranee.org/?utm_source=sitesosmediterranee&utm_medium=site&utm_campaign=don_site_faireundon" target="_blank">Faire un don</a>
        <div class="flex-none mr-8" onclick="location.href='https://www.sosmediterranee.fr/';" style="cursor: pointer">
          <p class="text-center font-black leading-5">SOS</p>
          <p class="font-black leading-5">MEDITERRANEE</p>
        </div>
      </div>
      <nav class="bg-main text-white flex h-10 items-center">
        <div class="flex-none flex ml-8">
          <a href="#" class="px-1 flex-initial inline-block">Glossary</a>
        </div>
        <div class="flex-none flex ml-8">
          <a href="https://onboard.sosmediterranee.org/" class="px-1 flex-initial inline-block">
            Log Book
          </a>
        </div>
        <div class="flex-grow"></div>
        <div class="flex-none mr-8">
          <a href="#" class="text-center inline-block w-6 bg-white text-black">?</a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import BurgerMenu from "@/components/Mobile/BurgerMenu.vue"
import { defineComponent } from "vue"
import { store } from "@/Store"

export default defineComponent({
  components: {
    BurgerMenu
  },
  setup () {
    return { store }
  },
  methods: {
    updateMenuVisibility () {
      store.updateMenuVisibility()
    }
  },
  name: "Dashboard-Header"
})
</script>
