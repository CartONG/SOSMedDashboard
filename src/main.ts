import { createApp } from "vue"
import App from "./App.vue"

import "./assets/styles/index.css"
import "./assets/sosicons/style.css"

import { createI18n } from "vue-i18n"

import { loadLocaleMessages } from "@/i18n"

const i18n = createI18n({
  locale: "fr",
  fallbackLocale: "fr",
  messages: loadLocaleMessages()
})

createApp(App).use(i18n).mount("#app")
