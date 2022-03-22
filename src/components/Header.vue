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
      <div class="flex ml-8">
        <div class="flex-none flex items-center my-4">
          <div>
            <p class="text-xl leading-6 text-main">Carte Interactive</p>
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
              <span class="icon icon-down text-xs" :class="{'up-arrow': showForm, 'pl-1': showForm, 'pr-1': !showForm}"></span>
              <span class="text-lg">Maintenant</span>
              <span class="icon icon-down text-xs" :class="{'up-arrow': showForm, 'pr-1': showForm, 'pl-1': !showForm}"></span>
            </div>
          </div>
          <form action="https://don.sosmediterranee.org"
                class="z-100 absolute transition-[max-height] ease-in-out duration-500 overflow-hidden"
                :style="formStyle">
            <div class="px-5 py-6 bg-secondary w-52 text-xl font-blac flex flex-col">
              <input name="utm_source" type="hidden" value="sitesosmediterranee">
              <input name="utm_medium" type="hidden" value="site">
              <input name="utm_campaign" type="hidden" value="don_site_je_donne">
              <div class="text-center">
                <label class="amount">
                  <input type="radio" name="amount" value="30"> 30 €
                </label>
              </div>
              <div class="text-center p-1">
                <label class="amount">
                  <input type="radio" name="amount" value="50"> 50 €
                </label>
              </div>
              <div class="text-center pb-4">
                <label class="amount">
                  <input type="radio" name="amount" value="100"> 100 €
                </label>
              </div>
              <input class="bg-main text-uppercase p-4 font-black" type="submit" value="Je donne">
            </div>
          </form>
        </div>
        <div class="flex-none mt-4 mr-4 ml-4" onclick="location.href='https://www.sosmediterranee.fr/';"
             style="cursor: pointer">
          <p class="text-center font-black leading-5 text-3xl">SOS</p>
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
import { reactiveStore } from "@/Store"

export default defineComponent({
  components: {
    BurgerMenu
  },
  computed: {
    formStyle (): { "max-height" : string | number } {
      return { "max-height": (this.showForm ? "300px" : 0) }
    }
  },
  data () {
    return { showForm: false }
  },
  methods: {
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
