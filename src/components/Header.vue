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
        <BurgerMenu :is-menu-visible="store.getState().isMenuVisible" @click="updateMenuVisibility()"/>
      </div>
      <div class="bg-main h-1"></div>
      <div :style="maxHeightStyle(store.getState().isMenuVisible)"
           :class="transitionClasses()"
           class="right-0 bg-white w-full">
        <nav class="text-lg text-main flex flex-col font-black">
          <ul class="list-disc pl-12 pt-6 pb-6 space-y-3">
            <li>
              <span @click="setLocale('en')" :class="{activeLanguage: $i18n.locale === 'en'}">EN</span>
              <span class="mr-2 ml-2">|</span>
              <span @click="setLocale('fr')" :class="{activeLanguage: $i18n.locale === 'fr'}">FR</span>
              <span class="mr-2 ml-2">|</span>
              <span @click="setLocale('it')" :class="{activeLanguage: $i18n.locale === 'it'}">IT</span>
              <span class="mr-2 ml-2">|</span>
              <span @click="setLocale('de')" :class="{activeLanguage: $i18n.locale === 'de'}">DE</span>
            </li>
            <li><a href="https://www.sosmediterranee.org/glossary/" target="_blank">{{ $t("header.glossary") }}</a></li>
            <li><a href="https://www.sosmediterranee.org/operations/" target="_blank">{{ $t("header.logBook") }}</a></li>
            <li><HeaderContributorsMobile/></li>
          </ul>
          <a class="bg-secondary text-donationText uppercase hover:bg-donationHoverBackground text-center rounded-b-lg"
             href="https://don.sosmediterranee.org/?utm_source=sitesosmediterranee&utm_medium=site&utm_campaign=don_site_faireundon"
             target="_blank">{{ $t("header.donate.button2") }}</a>
        </nav>
      </div>
    </div>
    <div class="hidden lg:block">
      <nav class="bg-main text-white flex h-10 items-center">
        <div class="flex-none flex ml-8">
          <a href="https://www.sosmediterranee.org/glossary/" target="_blank" class="px-1 flex-initial inline-block">{{ $t("header.glossary") }}</a>
        </div>
        <div class="flex-none flex ml-8">
          <a href="https://www.sosmediterranee.org/operations/" target="_blank" class="px-1 flex-initial inline-block">
            {{ $t("header.logBook") }}
          </a>
        </div>
        <div class="flex-grow"></div>
        <span @click="setLocale('en')" :class="{activeLanguage: $i18n.locale === 'en'}" class="cursor-pointer">EN</span>
        <span class="mr-2 ml-2">|</span>
        <span @click="setLocale('fr')" :class="{activeLanguage: $i18n.locale === 'fr'}" class="cursor-pointer">FR</span>
        <span class="mr-2 ml-2">|</span>
        <span @click="setLocale('it')" :class="{activeLanguage: $i18n.locale === 'it'}" class="cursor-pointer">IT</span>
        <span class="mr-2 ml-2">|</span>
        <span @click="setLocale('de')" :class="{activeLanguage: $i18n.locale === 'de'}" class="mr-4 cursor-pointer">DE</span>
        <HeaderContributors />
        <a href="#" class=" text-center inline-block h-6 w-6 bg-white ml-4 mr-3 text-black">?</a>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue"
import { store } from "@/main"

export default defineComponent({
  components: {
    BurgerMenu: defineAsyncComponent(() => import("./Mobile/BurgerMenu.vue")),
    HeaderContributorsMobile: defineAsyncComponent(() => import("./Mobile/HeaderContributorsMobile.vue")),
    HeaderContributors: defineAsyncComponent(() => import("./HeaderContributors.vue"))
  },
  data () {
    return { store, showForm: false }
  },
  methods: {
    maxHeightStyle (booleanValue: boolean): { "max-height": string | number } {
      return { "max-height": (booleanValue ? "1000px" : 0) }
    },
    transitionClasses (): string[] {
      return ["z-100", "absolute", "transition-[max-height]", "ease-in-out", "duration-500", "overflow-hidden"]
    },
    updateMenuVisibility () {
      store.updateMenuVisibility()
    },
    setLocale (locale: string) {
      this.$i18n.locale = locale
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

.activeLanguage{
  font-weight: bold;
  color: #F03E1B;
}
</style>
