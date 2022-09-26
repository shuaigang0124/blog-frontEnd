import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/discovery',
    name: 'Discovery',
    component: () => import('../views/home/Discovery.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/home/Chat.vue')
  },
  {
    path: '/types',
    name: 'Types',
    component: () => import('../views/home/Types.vue')
  },
  {
    path: '/archives',
    name: 'Archives',
    component: () => import('../views/home/Archives.vue')
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('../views/home/Link.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/home/Message.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/home/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  //页面加载前，显示加载条
  let loadingBar = document.getElementById('global_loading')
  if (!loadingBar) {
    loadingBar = document.createElement('div')
    loadingBar.id = 'global_loading'
    document.body.append(loadingBar)
  } else {
    loadingBar.style.display = 'block'
  }
  //0.5秒后跳转下一步
  setTimeout(() => {
    next()
  }, 500)

})
router.afterEach((to, from) => {
  //页面加载完成，顶部加载条消失
  let loadingBar = document.getElementById('global_loading')
  if (loadingBar) {
    loadingBar.style.display = 'none'
  }
})

export default router
