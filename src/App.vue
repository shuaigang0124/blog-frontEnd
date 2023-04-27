<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
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
    onMounted(() => {});
    // 请求
    const request = {};
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style></style>
