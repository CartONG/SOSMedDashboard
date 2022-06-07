<template>
  <header>
    <div class="lg:hidden">
      <div class="flex items-center">
        <img alt="logo SOS Méditerranée" class="cursor-pointer w-28" src="../assets/logo.png"
             onclick="location.href='https://www.sosmediterranee.fr/';"/>
        <div class="ml-2">
          <p class="text-xl align-middle leading-5 text-main font-black">Carte Interactive</p>
          <p class="text-base align-middle leading-3 text-secondary">
            Historique des opérations de secours en Méditerranée
          </p>
        </div>
        <div class="flex-shrink-0 flex-grow w-2"></div>
        <BurgerMenu :is-menu-visible="reactiveStore.isMenuVisible" @click="updateMenuVisibility()"/>
      </div>
      <div class="bg-main h-1"></div>
      <div :style="maxHeightStyle(reactiveStore.isMenuVisible)"
           :class="transitionClasses()"
           class="right-0 bg-white w-full">
        <nav class="text-lg text-main flex flex-col font-black">
          <ul class="list-disc pl-12 pt-6 pb-6 space-y-3">
            <li><a href="#">Glossary</a></li>
            <li><a href="https://onboard.sosmediterranee.org/">Log Book</a></li>
          </ul>
          <a class="bg-secondary text-donationText uppercase hover:bg-donationHoverBackground text-center rounded-b-lg"
             href="https://don.sosmediterranee.org/?utm_source=sitesosmediterranee&utm_medium=site&utm_campaign=don_site_faireundon"
             target="_blank">Faire un don</a>
        </nav>
      </div>
    </div>
    <div class="hidden lg:block">
      <div class="flex ml-8">
        <div class="flex-none flex items-center my-4">
          <div>
            <p class="text-xl leading-6 text-main font-black">Carte Interactive</p>
            <p class="text-base leading-4 text-secondary">
              Historique des opérations de secours en Méditerranée
            </p>
          </div>
          <i class="ml-14 text-8xl leading-6 icon icon-sosmed-ship"></i>
        </div>
        <div class="flex-grow"></div>
        <div @click="showForm = !showForm" class="bg-secondary text-donationText cursor-pointer w-52">
          <div class="p-2">
            <p class="text-center text-2xl">Sauver des vies</p>
            <div class="flex justify-center items-center">
              <span class="icon icon-down text-xs"
                    :class="{'up-arrow': showForm, 'pl-1': showForm, 'pr-1': !showForm}"></span>
              <span class="text-lg">Maintenant</span>
              <span class="icon icon-down text-xs"
                    :class="{'up-arrow': showForm, 'pr-1': showForm, 'pl-1': !showForm}"></span>
            </div>
          </div>
          <form action="https://don.sosmediterranee.org"
                :class="transitionClasses()"
                :style="maxHeightStyle(showForm)">
            <div class="px-5 py-6 bg-secondary w-52 text-xl font-blac flex flex-col">
              <input name="utm_source" type="hidden" value="sitesosmediterranee">
              <input name="utm_medium" type="hidden" value="site">
              <input name="utm_campaign" type="hidden" value="don_site_je_donne">
              <input class="bg-main text-uppercase p-4 font-black cursor-pointer" type="submit" value="Je donne">
            </div>
          </form>
        </div>
        <img alt="logo SOS Méditerranée" class="cursor-pointer w-44" src="../assets/logo.png"
             onclick="location.href='https://www.sosmediterranee.fr/';"/>
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
import { reactiveStore } from "@/Store"

export default defineComponent({
  components: {
    BurgerMenu
  },
  data () {
    return { reactiveStore, showForm: false }
  },
  methods: {
    maxHeightStyle (booleanValue: boolean): { "max-height": string | number } {
      return { "max-height": (booleanValue ? "300px" : 0) }
    },
    transitionClasses (): string[] {
      return ["z-100", "absolute", "transition-[max-height]", "ease-in-out", "duration-500", "overflow-hidden"]
    },
    updateMenuVisibility () {
      reactiveStore.updateMenuVisibility()
    }
  },
  name: "Dashboard-Header"
})
</script>

<style scoped>
.up-arrow {
  transform: rotate(180deg);
}
</style>
