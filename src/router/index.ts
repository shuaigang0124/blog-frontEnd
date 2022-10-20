import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/home/Home.vue'
import NotFound from "../views/other/404.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    redirect: "/index/home",
    children: [
      {
        path: '/index/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/index/music',
        name: 'Music',
        component: () => import('../views/home/Music.vue')
      },
      {
        path: '/index/chat',
        name: 'Chat',
        component: () => import('../views/home/Chat.vue')
      },
      {
        path: '/index/games',
        name: 'Games',
        component: () => import('../views/home/Games.vue')
      },
      {
        path: '/index/archives',
        name: 'Archives',
        component: () => import('../views/home/Archives.vue')
      },
      {
        path: '/index/link',
        name: 'Link',
        component: () => import('../views/home/Link.vue')
      },
      {
        path: '/index/message',
        name: 'Message',
        component: () => import('../views/home/Message.vue')
      },
      {
        path: '/index/about',
        name: 'About',
        component: () => import('../views/home/About.vue')
      },
      {
        path: '/index/discovery',
        name: 'Discovery',
        component: () => import('../views/music/Discovery.vue')
      },
      {
        path: '/index/playlists',
        name: 'Playlists',
        component: () => import('../views/music/Playlists.vue')
      },
      {
        path: '/index/songs',
        name: 'Songs',
        component: () => import('../views/music/Songs.vue')
      },
      {
        path: '/index/mv',
        name: 'MV',
        component: () => import('../views/music/MV.vue')
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
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
