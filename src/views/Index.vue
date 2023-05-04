<template>
  <div class="top">
    <div class="item" v-for="item in titleList" :key="item">
      <!-- <router-link class="router" :to="item.to">
        <img class="icon_img" :src="item.icon" />
        <span class="router_title">{{ item.title }}</span>
        <div v-if="item.title === '音乐盒'" @click ="goMusic" />
        <div v-if="item.title === '首页'" @click="goHome" />
      </router-link> -->
      <el-button
        class="router"
        @click="checkPage(item)"
        type="text"
        :disabled="isDisabled"
      >
        <div class="router_item_center">
          <div><img class="icon_img" :src="item.icon" /></div>
          <div class="router_title">{{ item.title }}</div>
        </div>
      </el-button>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, h, onMounted, reactive, toRefs } from "vue";
import router from "../router";
import myMessage from "@/utils/common";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    // 页面数据
    const state = reactive({
      titleList: [
        {
          to: "/index/home",
          icon: require("./../assets/icon/home.png"),
          title: "首页",
        },
        {
          to: "/index/archives",
          icon: require("./../assets/icon/archive.png"),
          title: "归档",
        },
        {
          to: "/index/chat",
          icon: require("./../assets/icon/chat.png"),
          title: "聊天室",
        },
        {
          to: "/index/message",
          icon: require("./../assets/icon/message.png"),
          title: "留言",
        },
        {
          to: "/index/games",
          icon: require("./../assets/icon/game.png"),
          title: "游戏",
        },
        {
          to: "/index/music",
          icon: require("./../assets/icon/listen.png"),
          title: "音乐盒",
        },
        {
          to: "/index/about",
          icon: require("./../assets/icon/candy.png"),
          title: "关于",
        },
      ],
      isDisabled: false,
      notificationMessage1:
        "<div style='font-size: 12px;'>在本站中各位可以创建用户发布博客、评论、留言等进行测试，但是没有实际意义的博客会被站主删除，望各位知悉<div>网站第一版地址：</div><div>https://shuaigang.top/website</div></div>",
      notificationMessage2:
        '<div style="color: #008080"><i>shuaigang更新了前端页面</i></div><div style="color: blue;font-size: 0.1rem;">2s后自动关闭</div>',
    });
    // 方法体
    const methods = {
      checkPage(e) {
        if (e.to !== "") {
          // window.location.href=e.to
          router.push(e.to);
        }
        if (e.title === "音乐盒" && state.titleList.length === 7) {
          state.isDisabled = true;
          var data = [
            {
              to: "/index/music",
              icon: require("./../assets/icon/search.png"),
              title: "搜索",
            },
            {
              to: "/index/discovery",
              icon: require("./../assets/icon/discovery.png"),
              title: "发现音乐",
            },
            {
              to: "/index/playlists",
              icon: require("./../assets/icon/playlist.png"),
              title: "推荐歌单",
            },
            {
              to: "/index/songs",
              icon: require("./../assets/icon/new.png"),
              title: "最新音乐",
            },
            {
              to: "/index/mv",
              icon: require("./../assets/icon/MV.png"),
              title: "最新MV",
            },
            {
              to: "/index/home",
              icon: require("./../assets/icon/home.png"),
              title: "首页",
            },
          ];
          const oldList = setInterval(() => {
            state.titleList.shift();
            if (state.titleList.length === 0) {
              clearInterval(oldList);
              var i = -1;
              const newList = setInterval(() => {
                i += 1;
                state.titleList.push(data[i]);
                if (state.titleList.length === data.length) {
                  clearInterval(newList);
                  state.isDisabled = false;
                }
              }, 15);
            }
          }, 15);
        }
        if (e.title === "首页" && state.titleList.length !== 7) {
          state.isDisabled = true;
          var data = [
            {
              to: "/index/home",
              icon: require("./../assets/icon/home.png"),
              title: "首页",
            },
            {
              to: "/index/archives",
              icon: require("./../assets/icon/archive.png"),
              title: "归档",
            },
            {
              to: "/index/chat",
              icon: require("./../assets/icon/chat.png"),
              title: "聊天室",
            },
            {
              to: "/index/message",
              icon: require("./../assets/icon/message.png"),
              title: "留言",
            },
            {
              to: "/index/games",
              icon: require("./../assets/icon/game.png"),
              title: "游戏",
            },
            {
              to: "/index/music",
              icon: require("./../assets/icon/listen.png"),
              title: "音乐盒",
            },
            {
              to: "/index/about",
              icon: require("./../assets/icon/candy.png"),
              title: "关于",
            },
          ];
          const oldList = setInterval(() => {
            state.titleList.shift();
            if (state.titleList.length === 0) {
              clearInterval(oldList);
              var j = -1;
              const newList = setInterval(() => {
                j += 1;
                state.titleList.push(data[j]);
                if (state.titleList.length === data.length) {
                  clearInterval(newList);
                  state.isDisabled = false;
                }
              }, 15);
            }
          }, 15);
        }
      },
      // 通知提醒
      openNotification1() {
        myMessage(state.notificationMessage1, "通知", 3, 0, "TL");
      },
      openNotification2() {
        myMessage(state.notificationMessage2, "通知", 3, null, null);
      },
      isMobile() {
        let flag = navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
        return flag;
      },
    };
    // 页面默认请求
    onMounted(() => {
      // if (methods.isMobile()) {
        // window.location.href = "/500";
        // router.push("/500");
      // } else {
        methods.openNotification2();
        let ntf = localStorage.getItem("notification");
        let nowTime = new Date().getTime();
        if (ntf) {
          let time = Number(ntf);
          if (time < nowTime - 24 * 60 * 60 * 1000) {
            methods.openNotification1();
            localStorage.setItem("notification", nowTime.toString());
          }
        } else {
          localStorage.setItem("notification", nowTime.toString());
          methods.openNotification1();
        }
      // }
    });
    // 请求
    const request = {};
    return { ...methods, ...toRefs(state) };
  },
});
</script>

<style>
.el-notification .el-icon-success {
  color: #67c23a !important;
}
.el-notification .el-icon-info {
  color: #909399 !important;
}
.el-notification .el-icon-warning {
  color: #e6a32c !important;
}
.el-notification .el-icon-error {
  color: #f56c6c !important;
}
body {
  margin: 0;
  height: 100vh;
  overflow: auto;
}
.el-button.is-disabled {
  cursor: pointer !important;
}
.icon_img {
  height: 0.9rem;
  width: 0.9rem;
}
.router_title {
  color: #fff;
  margin-left: 0.1rem;
}
.icon_module {
  height: 1.6rem;
  width: 1.6rem;
}
.top {
  position: fixed;
  top: 1.5vh;
  right: 2vw;
  /* height: 1vh; */
  /* float: right; */
  z-index: 99;
  display: flex;
  align-items: center;
}

.item {
  margin-left: 1.5rem;
  font-size: 0.9rem;
  /* font-weight: bold; */
}

.router {
  color: #fff;
  /* text-decoration: none; */
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* flex: 1 1 auto; */
  /* margin: 10px; */
  /* padding-bottom: 0.5rem; */
  /* border: 2px solid #f7f7f7; */
  /* text-align: center; */
  /* text-transform: uppercase; */
  position: relative;
  /* overflow: hidden; */
  transition: 0.3s;
}
.router_item_center {
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
.router:after {
  position: absolute;
  transition: all 0.3s ease-in-out;
  content: "";
  width: 0;
  left: 0;
  bottom: 0;
  height: 3px;
  background: #80c8f8;
}
.router:hover {
  /* color: #80c8f8; */
  /* transform: translateY(-1rem); */
  /* filter: drop-shadow(#80c8f8 0 1rem); */
  cursor: pointer;
}
.router:hover:after {
  width: 100%;
  left: 0;
}

/**
* 全局样式
*/

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
  background-color: burlywood;
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
  width: 5px;
  height: 5px;
}

/*滚动条里面小方块*/
::-webkit-scrollbar-thumb {
  border-radius: 10px !important;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
  /* 颜色 */
  background: #00ff00 !important;
  /* 线性渐变背景 */
  /* background-image: linear-gradient(
    45deg,
    red 25%,
    red 25%,
    blue 25%,
    blue 50%,
    yellow 50%,
    yellow 75%,
    green 75%,
    green 100%
  ) !important; */
}

/*滚动条轨道*/
::-webkit-scrollbar-track {
  border-radius: 0 !important;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
  background-color: #fff !important;
  /* background-color: #f5deb3 !important; */
}

.pull_down {
  position: absolute;
  /* width: 25px; */
  /* height: 25px; */
  color: #02f8f8;
  font-size: 50px;
  font-weight: bold;
  left: 48.5%;
  top: 90vh;
  -webkit-animation: jumpY 1s infinite ease-in-out;
  -o-animation: jumpY 1s infinite ease-in-out;
  animation: jumpY 1s infinite ease-in-out;
}

@-webkit-keyframes jumpY {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes jumpY {
  0% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
  }
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>
