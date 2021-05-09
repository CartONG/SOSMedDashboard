<template>
  <header>
    <div class="lg:hidden">
      <div class="flex">
        <div class="mt-4 ml-2 text-main leading-3 font-black">
          <p class="text-center">SOS</p>
          <p class="text-tiny uppercase">Mediterranee</p>
        </div>
        <div class="flex-shrink-0 flex-grow w-2"></div>
        <div class="flex-auto">
          <p class="text-main uppercase">Carte Interactive</p>
          <p class="text-tiny leading-tight text-secondary">
            Historique des activités et observations
            des secours en Méditerranée
          </p>
        </div>
        <div class="flex-shrink-0 flex-grow w-2"></div>
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
      </div>
      <div class="bg-main h-10">
      </div>
    </div>
    <div class="hidden lg:block">
      <div class="flex my-4 ml-8 ">
        <div class="flex-none flex">
          <div>
            <p class="text-xl leading-6 text-main">Carte Interactive</p>
            <p class="text-base leading-4 text-secondary">
              Historique des activités et observations des secours en
              Méditerranée
            </p>
          </div>
          <img class="h-10" alt="Vue logo" src="./../assets/logo.png"/>
        </div>
        <div class="flex-grow"></div>
        <div class="flex-none">
          <p class="text-center font-black leading-5">SOS</p>
          <p class="font-black leading-5">MEDITERRANEE</p>
        </div>
      </div>
      <nav class="bg-main text-white flex h-10 items-center">
        <div class="flex-none flex">
          <a href="#" class="px-1 flex-initial inline-block">Ongoing</a>
          <a href="#" class="px-1 flex-initial inline-block">Past SAR events</a>
          <a href="#" class="px-1 flex-initial inline-block">Our mission</a>
          <a href="#" class="px-1 flex-initial inline-block"
          >Legal references</a
          >
          <a href="#" class="px-1 flex-initial inline-block">Glossary</a>
          <a href="#" class="px-1 flex-initial inline-block">FAQ</a>
        </div>
        <div class="flex-grow"></div>
        <div class="flex-none">
          <a
            href="#"
            class="text-center inline-block w-6"
            style="background-color: #ffffff; color: #000000"
          >?</a
          >
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang='ts'>
import { Vue } from 'vue-class-component'

export default class Header extends Vue {
  menuVisibility = false;

  setMenuVisibility (isVisible: boolean) {
    this.menuVisibility = isVisible
  }
}
</script>
