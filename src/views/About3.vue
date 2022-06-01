<template>
  <div class="about">
    <h1>好大儿卢豪</h1>
    <div>{{ data }}</div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import post from "../http/axios/index";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    // 页面数据
    const state = reactive({
      data: "",
    });
    // 方法体
    const methods = {};
    // 页面默认请求
    onMounted(() => {
      request.getList();
    });
    // 请求
    const request = {
      getList() {
        // 请求体数据
        const data = {
          data: {},
        };
        // post请求
        post("/admin/user/getTest", data).then((res: any) => {
          console.log(res);
          let { msg, data } = res;
          ElMessage.success(msg)
          state.data = data;
        });
      },
    };
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style>
</style>

