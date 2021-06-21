import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'

import './assets/styles/index.css'
import './assets/sosicons/style.css'

createApp(App).use(router).mount('#app')
