<template>
  <div class="playlist">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="cover">
      <div class="info">
        <div class="info_title">
          <div
            style="
              padding: 2vh 2vw;
              border-radius: 5px;
              background-color: rgba(0, 0, 0, 0.2);
            "
          >
            搜索
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
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
    onMounted(() => {});
    // 请求
    const request = {};
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style scoped>
.body_img {
  /* background-image: url(https://shuaigang.top/gsg/static-resource/formal/backgroundImg/6.webp); */
  background-color: gray;
}
</style>
