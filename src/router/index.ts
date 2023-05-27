import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BeatingHeart from "../views/other/BeatingHeart.vue"
import RotateBeatingHeart from "../views/other/RotateBeatingHeart.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/index.vue'),
    redirect: "/home",
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home/index.vue')
      },
      {
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/blog/index.vue')
      },
      {
        path: '/chat',
        name: 'Chat',
        component: () => import('../views/chat/index.vue')
      },
      {
        path: '/games',
        name: 'Games',
        component: () => import('../views/games/index.vue')
      },
      {
        path: '/archives',
        name: 'Archives',
        component: () => import('../views/archives/index.vue')
      },
      {
        path: '/message',
        name: 'Message',
        component: () => import('../views/message/index.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/about/index.vue')
      },
      {
        path: '/discovery',
        name: 'Discovery',
        component: () => import('../views/music/discovery.vue')
      },
      {
        path: '/playlists',
        name: 'playlists',
        component: () => import('../views/music/playlists.vue')
      },
      {
        path: '/newsong',
        name: 'newsong',
        component: () => import('../views/music/newsong.vue')
      },
      {
        path: '/mvs',
        name: 'mvs',
        component: () => import('../views/music/mvs.vue')
      }, 
      {
        path: '/result',
        name: 'result',
        component: () => import('../views/music/item/result.vue')
      },  
      {
        path: '/playlist',
        name: 'playlist',
        component: () => import('../views/music/item/playlist.vue')
      },  
      {
        path: '/mv',
        name: 'mv',
        component: () => import('../views/music/item/mv.vue')
      },
    ]
  },
  {
    path: '/login',
    name: '/Login',
    component: () => import('../views/login/login.vue')
  },
  // {
  //   path: '/register',
  //   name: '/Register',
  //   component: () => import('../views/login/register.vue')
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
    component: () => import('../views/other/404.vue')
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
