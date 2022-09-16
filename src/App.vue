<template>
  <div class="top">
    <div class="item" v-for="item in titleList" :key="item">
      <router-link class="router" :to="item.to">
        <img class="icon_img" :src="item.icon" />
        {{ item.title }}
      </router-link>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    // 页面数据
    const state = reactive({
      titleList: [
        {
          to: "/",
          icon: require("./assets/icon/home.png"),
          title: "首页",
        },
        {
          to: "/discovery",
          icon: require("./assets/icon/listen.png"),
          title: "音乐盒",
        },
        {
          to: "/chat",
          icon: require("./assets/icon/chat.png"),
          title: "聊天室",
        },
        {
          to: "/types",
          icon: require("./assets/icon/home.png"),
          title: "类别",
        },
        {
          to: "/archives",
          icon: require("./assets/icon/archive.png"),
          title: "归档",
        },
        {
          to: "/link",
          icon: require("./assets/icon/link.png"),
          title: "友链",
        },
        {
          to: "/message",
          icon: require("./assets/icon/message.png"),
          title: "留言",
        },
        {
          to: "/about",
          icon: require("./assets/icon/candy.png"),
          title: "后花园",
        },
      ],
    });
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

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
body {
  margin: 0;
  height: 100vh;
  overflow: auto;
}

.icon_img {
  height: 1rem;
  width: 1rem;
}
.icon_module {
  height: 1.6rem;
  width: 1.6rem;
}
.top {
  position: fixed;
  top: 3vh;
  right: 2vw;
  /* height: 1vh; */
  /* float: right; */
  z-index: 99;
  display: flex;
  align-items: center;
}

.item {
  margin-left: 1.5rem;
  font-size: 1rem;
  /* font-weight: bold; */
}

.router {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
}

/* .top a.router-link-exact-active {
  color: blue;
} */

#global_loading {
  background: linear-gradient(
    to right,
    rgb(73, 149, 221),
    #fff,
    rgb(173, 203, 231)
  );
  height: 4px;
  position: fixed;
  z-index: 999;
  width: 0;
  top: 0;
  left: 0;
  animation: grow 0.5s infinite forwards;
}
@keyframes grow {
  from {
    width: 0;
  }
  to {
    width: 100vw;
  }
}
.body_style {
  position: fixed;
  z-index: -99;
}

.info {
  color: #fff;
}
.info_title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  font-family: "SimSun";
}

.body_img {
  animation: grow1 1s 1 forwards;
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
}

.cover {
  height: 100vh;
  background-color: rgb(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: grow1 1s 1 forwards;
}
@keyframes grow1 {
  from {
    height: 95vh;
  }
  to {
    height: 100vh;
  }
}

/*滚动条整体粗细样式*/
::-webkit-scrollbar {
  /*高宽分别对应横竖滚动条的尺寸*/
  width: 8px;
  height: 3px;
}

/*滚动条里面小方块*/
::-webkit-scrollbar-thumb {
  border-radius: 10px !important;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
  /* 颜色 */
  /* background: rgb(232, 232, 232) !important; */
  /* 线性渐变背景 */
  background-image: linear-gradient(
    45deg,
    #ffbd61 25%,
    #ffbd61 25%,
    #ff8800 25%,
    #ff8800 50%,
    #ffbd61 50%,
    #ffbd61 75%,
    #ff8800 75%,
    #ff8800 100%
  ) !important;
}

/*滚动条轨道*/
::-webkit-scrollbar-track {
  border-radius: 0 !important;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
  background-color: #f5deb3 !important;
}
</style>
