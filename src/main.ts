import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/lib/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import lazyPlugin from 'vue3-lazy'
const app = createApp(App)
app.use(ElementPlus)
app.use(store)
    .use(router)
    .use(lazyPlugin, {
        loading: false,
        // require('@/assets/3.jpg')
        error: false,
    })
    .mount('#app')

app.use(ElementPlus, {
    locale: zhCn,
})


