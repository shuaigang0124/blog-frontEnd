import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/about1',
    name: 'About1',
    component: () => import('../views/About1.vue')
  },
  {
    path: '/about2',
    name: 'About2',
    component: () => import('../views/About2.vue')
  },
  {
    path: '/about3',
    name: 'About3',
    component: () => import('../views/About3.vue')
  },
  {
    path: '/about4',
    name: 'About4',
    component: () => import('../views/About4.vue')
  },
  {
    path: '/about5',
    name: 'About5',
    component: () => import('../views/About5.vue')
  },
  {
    path: '/about6',
    name: 'About6',
    component: () => import('../views/About6.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
