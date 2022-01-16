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
            Historique des opérations de secours en Méditerranée
          </p>
        </div>
        <div class="flex-shrink-0 flex-grow w-2"></div>
        <Menu />
      </div>
      <div class="bg-main h-10"></div>
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
          <a href="#" class="text-center inline-block w-6 bg-white text-black"
            >?</a
          >
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import Menu from "@/components/Menu.vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: {
    Menu
  }
})
</script>
