<template>
  <div>
    <div class="app-container">
      <div class="app-content">
        <h3 style="color: red"><i>404 Page not found</i></h3>
        <h2 style="color: #606266">出错了，页面走丢啦！</h2>
        <h3 style="color: #909399; font-size: 14px">
          当你看到这个页面，可能表示访问的页面不存在，或访问路由地址有误，请检查路由并重试，感谢您的支持！
        </h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {});
    return {};
  },
});
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url(../../assets/404.jpg);
}

.app-content {
  text-align: center;
}
</style>
