'use strict'
import { createRouter, createWebHistory } from 'vue-router'

import Map from '@/pages/Map.vue'

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      name: 'map',
      path: '/',
      component: Map
    },
    {
      name: 'rescue',
      path: '/rescue/:rescueId',
      component: Map
    }
  ]
})
