<template>
  <div style="color: red">4564555</div>
</template>
<script lang="ts">
import post from "@/http/axios";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    // 页面数据
    const state = reactive({});
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
          customData: {},
        };
        // post请求
        post("/user/getAllUser", data).then((res: any) => {
          console.log(res);
          let { message, customData } = res;
        });
      },
    };
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style></style>
