<template>
  <header>
    <div class="lg:hidden">
      <div class="flex">
        <div class="flex-none flex-col mt-4 ml-2 text-indigo-900">
          <p class="text-center text-2xl font-black leading-6">SOS</p>
          <p class="leading-4">Méditerranée</p>
        </div>
        <div class="flex-shrink w-4"></div>
        <div class="flex-1 flex mt-2">
          <div class="flex-1">
            <p class="text-lg leading-6 text-indigo-900 font-medium text-justify uppercase">Carte Interactive</p>
            <p class="text-xs leading-tight text-yellow-600 text-opacity-100 font-medium">
              Historique des activités et observations
              des secours en Méditerranée
            </p>
          </div>
        </div>
        <div class="flex-shrink w-4"></div>
        <svg class="flex-none pt-4 pl-4 cursor-pointer text-indigo-900 fill-current h-16 w-16" viewBox="0 0 100 80" width="40" height="40">
          <rect width="80" height="15" rx="8"></rect>
          <rect y="20" width="80" height="15" rx="8"></rect>
          <rect y="40" width="80" height="15" rx="8"></rect>
        </svg>
      </div>
      <div class="bg-blue-900 bg-opacity-100 h-10">
      </div>
    </div>
    <div class="hidden lg:block">
      <div class="flex">
        <div class="flex-none flex">
          <div>
            <p class="text-xl leading-6">Carte Interactive</p>
            <p class="text-lg leading-4">
              Historique des activités et observations des secours en
              Méditerranée
            </p>
          </div>
          <img class="h-10" alt="Vue logo" src="./../assets/logo.png" />
        </div>
        <div class="flex-grow"></div>
        <div class="flex-none flex-col">
          <p class="text-center text-2xl font-black leading-6">SOS</p>
          <p class="leading-4">Méditerranée</p>
        </div>
      </div>
      <nav class="bg-indigo-800 text-white flex h-10 items-center">
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

export default class Header extends Vue {}
</script>
