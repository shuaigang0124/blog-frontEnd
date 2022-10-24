<template>
  <div class="music">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="cover">
      <div class="info">
        <div class="info_title">
          <div style="color: #0024ff; font-size: 3.5rem">MUSIC-HOME</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    const state = reactive({
      data: "",
    });
    const methods = {};
    onMounted(() => {});
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style scoped>
.body_img {
  /* background-image: url(../../assets/backgroundImg/20.jpg); */
  background-image: url(../../assets/backgroundImg/hmbb/7.jpg);
}
</style>
