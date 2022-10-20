<template>
  <div class="archives">
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
            发现音乐
            <!-- <a-palyer /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import post from "@/http/axios";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import APlayer from "@/components/music/APlayer.vue";
export default defineComponent({
  name: "",
  components: {
    // APlayer,
  },
  props: {},
  setup() {
    // 页面数据
    const state = reactive({});
    // 方法体
    const methods = {};
    // 页面默认请求
    onMounted(() => {});
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
<style scoped>
.body_img {
  /* background-image: url(../../assets/backgroundImg/6.jpg); */
  background-color: burlywood;
}
</style>
