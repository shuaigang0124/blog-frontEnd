import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '../views/index.vue'
import Home from '../views/home/index.vue'
import NotFound from "../views/other/404.vue"
import BeatingHeart from "../views/other/BeatingHeart.vue"
import RotateBeatingHeart from "../views/other/RotateBeatingHeart.vue"
import Login from "../views/login/login.vue"
import Register from "../views/login/register.vue"

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
        path: '/index/chat',
        name: 'Chat',
        component: () => import('../views/chat/index.vue')
      },
      {
        path: '/index/games',
        name: 'Games',
        component: () => import('../views/games/index.vue')
      },
      {
        path: '/index/archives',
        name: 'Archives',
        component: () => import('../views/archives/index.vue')
      },
      {
        path: '/index/message',
        name: 'Message',
        component: () => import('../views/message/index.vue')
      },
      {
        path: '/index/about',
        name: 'About',
        component: () => import('../views/about/index.vue')
      },
      {
        path: '/index/discovery',
        name: 'Discovery',
        component: () => import('../views/music/discovery.vue')
      },
      {
        path: '/index/playlists',
        name: 'playlists',
        component: () => import('../views/music/playlists.vue')
      },
      {
        path: '/index/newsong',
        name: 'newsong',
        component: () => import('../views/music/newsong.vue')
      },
      {
        path: '/index/mv',
        name: 'mv',
        component: () => import('../views/music/mv.vue')
      },
    ]
  },
  {
    path: '/login',
    name: '/Login',
    component: Login
  },
  // {
  //   path: '/register',
  //   name: '/Register',
  //   component: Register
  // },
  {
    path: '/beatingHeart',
    name: 'BeatingHeart',
    component: BeatingHeart
  },
  {
    path: '/rotateBeatingHeart',
    name: 'RotateBeatingHeart',
    component: RotateBeatingHeart
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
