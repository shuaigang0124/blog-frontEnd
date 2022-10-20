<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import router from "./router";
export default defineComponent({
  components: {},
  props: {},
  setup() {
    // 页面数据
    const state = reactive({});
    // 方法体
    const methods = {
      isMobile() {
        let flag = navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
        return flag;
      },
    };
    // 页面默认请求
    onMounted(() => {
      if (methods.isMobile()) {
        router.push({
          path: "/500",
        });
      }
    });
    // 请求
    const request = {};
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style>
/* .mini_chat_gray {
  background-color: #ffffff;
  box-shadow: 0 0 6px rgb(0 0 0 / 12%);
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
.mini_chat_gray:hover {
  background-color: #f2f6fc;
}
.mini_font {
  width: 40px;
  height: 40px;
  text-align: center;
}
.img_icon {
  margin-top: 7px;
  width: 26px;
  height: 26px;
  cursor: pointer;
} */
</style>
