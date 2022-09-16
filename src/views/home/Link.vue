<template>
  <div class="link">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="cover">
      <div class="info">
        <div class="info_title">友链</div>
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
  background-image: url(../../assets/backgroundImg/11.jpg);
}
</style>
