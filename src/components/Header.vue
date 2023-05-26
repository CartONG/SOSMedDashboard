<template>
  <header>
    <div class="lg:hidden">
      <div class="flex items-center">
        <img alt="logo SOS Méditerranée" class="cursor-pointer w-28" src="../assets/logo.png"
             onclick="location.href='https://www.sosmediterranee.fr/';"/>
        <div class="ml-2">
          <p class="text-base align-middle leading-5 text-main font-black uppercase">{{ $t("header.title") }}</p>
          <p class="text-xs align-middle leading-3 text-secondary">
            {{ $t("header.subtitle") }}
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
            <li><a href="https://onboard.sosmediterranee.org/glossary/" target="_blank">{{ $t("header.glossary") }}</a></li>
            <li><a href="https://onboard.sosmediterranee.org/" target="_blank">{{ $t("header.logBook") }}</a></li>
            <li><HeaderContributorsMobile/></li>
          </ul>
          <a class="bg-secondary text-donationText uppercase hover:bg-donationHoverBackground text-center rounded-b-lg"
             href="https://don.sosmediterranee.org/?utm_source=sitesosmediterranee&utm_medium=site&utm_campaign=don_site_faireundon"
             target="_blank">{{ $t("header.donate.button2") }}</a>
        </nav>
      </div>
    </div>
    <div class="hidden lg:block">
      <div class="flex ml-8">
        <div class="flex-none flex items-center my-4">
          <div>
            <p class="text-xl leading-6 text-main font-black">{{ $t("header.title") }}</p>
            <p class="text-base leading-4 text-secondary">
              {{ $t("header.subtitle") }}
            </p>
          </div>
          <i class="ml-14 text-8xl leading-6 icon icon-sosmed-ship"></i>
        </div>
        <div class="flex-grow"></div>
        <div @click="showForm = !showForm" class="bg-secondary text-donationText cursor-pointer w-52">
          <div class="p-2">
            <p class="text-center text-2xl">{{ $t("header.donate.title") }}</p>
            <div class="flex justify-center items-center">
              <span class="icon icon-down text-xs"
                    :class="{'up-arrow': showForm, 'pl-1': showForm, 'pr-1': !showForm}"></span>
              <span class="text-lg">{{ $t("header.donate.subtitle") }}</span>
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
              <input class="bg-main text-uppercase p-4 font-black cursor-pointer" type="submit" :value="$t('header.donate.button')">
            </div>
          </form>
        </div>
        <img alt="logo SOS Méditerranée" class="cursor-pointer w-44" src="../assets/logo.png"
             onclick="location.href='https://www.sosmediterranee.fr/';"/>
      </div>
      <nav class="bg-main text-white flex h-10 items-center">
        <div class="flex-none flex ml-8">
          <a href="https://onboard.sosmediterranee.org/glossary/" target="_blank" class="px-1 flex-initial inline-block">{{ $t("header.glossary") }}</a>
        </div>
        <div class="flex-none flex ml-8">
          <a href="https://onboard.sosmediterranee.org/" target="_blank" class="px-1 flex-initial inline-block">
            {{ $t("header.logBook") }}
          </a>
        </div>
        <div class="flex-grow"></div>
        <HeaderContributors />
        <a href="#" class=" text-center inline-block h-6 w-6 bg-white ml-4 mr-3 text-black">?</a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue"
import { reactiveStore } from "@/Store"

export default defineComponent({
  components: {
    BurgerMenu: defineAsyncComponent(() => import("./Mobile/BurgerMenu.vue")),
    HeaderContributorsMobile: defineAsyncComponent(() => import("./Mobile/HeaderContributorsMobile.vue")),
    HeaderContributors: defineAsyncComponent(() => import("./HeaderContributors.vue"))
  },
  data () {
    return { reactiveStore, showForm: false }
  },
  methods: {
    maxHeightStyle (booleanValue: boolean): { "max-height": string | number } {
      return { "max-height": (booleanValue ? "1000px" : 0) }
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

.Contributors__container {
  z-index: 50;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  position: relative;
}

.Contributors__content {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  padding: 0;
  background-color: aqua;
}

.Contributors__container:hover > .Contributors__content,
.Contributors__container:focus > .Contributors__content,
.Contributors__container:focus-within > .Contributors__content {
  display: flex;
}

</style>
