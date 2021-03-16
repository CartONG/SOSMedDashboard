<template>
<!-- TODO Faire le CSS mobile first -->
  <header>
    <div class="flex">
      <div class="flex-none flex">
        <div>
          <p class="text-xl leading-6">Carte Interactive</p>
          <p class="text-lg leading-4">Historique des activités et observations des secours en Méditerranée</p>
        </div>
        <img class="h-10" alt="Vue logo" src="./../assets/logo.png" />
      </div>
      <div class="flex-grow"></div>
      <div class="flex-none flex-col">
        <p class="text-center text-2xl font-black leading-6">SOS</p>
        <p class="leading-4">Méditerranée</p>
      </div>
    </div>
    <nav class="bg-indigo-900 text-white flex h-10 items-center">
      <div class="flex-none flex">
        <a href="#" class="px-1 flex-initial inline-block">Ongoing</a>
        <a href="#" class="px-1 flex-initial inline-block">Past SAR events</a>
        <a href="#" class="px-1 flex-initial inline-block">Our mission</a>
        <a href="#" class="px-1 flex-initial inline-block">Legal references</a>
        <a href="#" class="px-1 flex-initial inline-block">Glossary</a>
        <a href="#" class="px-1 flex-initial inline-block">FAQ</a>
      </div>
      <div class="flex-grow"></div>
      <div class="flex-none"><a href="#" class="text-center inline-block w-6" style="background-color: #ffffff;color: #000000">?</a></div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Header extends Vue {}
</script>
