<template>
  <div class="top">
    <div class="item" v-for="item in titleList" :key="item">
      <el-input
        ref="inputRef"
        @keyup.enter="searchMusic"
        v-model="inputCat"
        placeholder="搜索音乐"
        v-if="item.title === '搜索' && searchInput"
        prefix-icon="el-icon-search"
        clearable
      />
      <el-button
        v-else
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
  <el-dialog
    v-model="dialogVisible"
    title="搜索"
    width="55%"
    center
    :before-close="
      () => {
        dialogVisible = false;
      }
    "
  >
    <el-input
      ref="inputRef"
      v-model="params.content"
      @keyup.enter="searchBlog"
      placeholder="请输入关键字查询相关文章"
      prefix-icon="el-icon-search"
      clearable
    />
    <div v-if="blogList.length">
      <h3 class="search_blog_total">找到{{ params.total }}篇文章</h3>
      <div v-for="item in blogList" :key="item">
        <div class="search_blog_item" @click="goToBlog(item.id)">
          <div class="search_blog_description">{{ item.description }}</div>
          <div class="search_blog_gmtCreate">
            {{
              new Date(item.gmtCreate).getFullYear() +
              "年" +
              (new Date(item.gmtCreate).getMonth() + 1) +
              "月" +
              new Date(item.gmtCreate).getDate() +
              "日"
            }}
          </div>
        </div>
      </div>
      <el-pagination
        align="right"
        background
        small
        :hide-on-single-page="true"
        layout="prev, pager, next"
        v-model:current-page="params.pageNum"
        v-model:page-size="params.pageSize"
        :total="params.total"
        @current-change="changePageNum"
      />
    </div>
  </el-dialog>
  <a-player />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, h, onMounted, reactive, toRefs } from "vue";
import router from "@/router";
import myMessage from "@/utils/common";
import { getArticleList } from "@/api/article";
import { search } from "@/api/music";
import { nextTick, ref } from "vue";
import aPlayer from "@/components/music/aPlayer.vue";
export default defineComponent({
  name: "",
  components: { aPlayer },
  props: {},
  setup() {
    // 页面数据
    const inputRef = ref<HTMLElement | null>(null);
    const state = reactive({
      titleList: [
        {
          to: "/homeSearch",
          icon: require("./../assets/icon/search.png"),
          title: "搜索",
        },
        {
          to: "/home",
          icon: require("./../assets/icon/home.png"),
          title: "首页",
        },
        {
          to: "/archives",
          icon: require("./../assets/icon/archive.png"),
          title: "归档",
        },
        {
          to: "/chat",
          icon: require("./../assets/icon/chat.png"),
          title: "聊天室",
        },
        {
          to: "/message",
          icon: require("./../assets/icon/message.png"),
          title: "留言",
        },
        {
          to: "/games",
          icon: require("./../assets/icon/game.png"),
          title: "游戏",
        },
        {
          to: "/discovery",
          icon: require("./../assets/icon/listen.png"),
          title: "音乐盒",
        },
        {
          to: "/about",
          icon: require("./../assets/icon/candy.png"),
          title: "关于",
        },
      ],
      homeList: [
        {
          to: "/homeSearch",
          icon: require("./../assets/icon/search.png"),
          title: "搜索",
        },
        {
          to: "/home",
          icon: require("./../assets/icon/home.png"),
          title: "首页",
        },
        {
          to: "/archives",
          icon: require("./../assets/icon/archive.png"),
          title: "归档",
        },
        {
          to: "/chat",
          icon: require("./../assets/icon/chat.png"),
          title: "聊天室",
        },
        {
          to: "/message",
          icon: require("./../assets/icon/message.png"),
          title: "留言",
        },
        {
          to: "/games",
          icon: require("./../assets/icon/game.png"),
          title: "游戏",
        },
        {
          to: "/discovery",
          icon: require("./../assets/icon/listen.png"),
          title: "音乐盒",
        },
        {
          to: "/about",
          icon: require("./../assets/icon/candy.png"),
          title: "关于",
        },
      ],
      musicList: [
        {
          to: "/search",
          icon: require("./../assets/icon/search.png"),
          title: "搜索",
        },
        {
          to: "/discovery",
          icon: require("./../assets/icon/discovery.png"),
          title: "发现音乐",
        },
        {
          to: "/playlists",
          icon: require("./../assets/icon/playlist.png"),
          title: "推荐歌单",
        },
        {
          to: "/newsong",
          icon: require("./../assets/icon/new.png"),
          title: "最新音乐",
        },
        {
          to: "/mvs",
          icon: require("./../assets/icon/MV.png"),
          title: "最新MV",
        },
        {
          to: "/home",
          icon: require("./../assets/icon/home.png"),
          title: "首页",
        },
      ],
      musicPath: [
        "/result",
        "/discovery",
        "/playlists",
        "/playlist",
        "/newsong",
        "/mvs",
        "/mv",
      ],
      isDisabled: false,
      searchInput: false,
      inputCat: "",
      dialogVisible: false,
      params: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        content: null,
        startTime: null,
        endTime: null,
      },
      blogList: [],
      notificationMessage1:
        "<div style='font-size: 12px;'>在本站中各位可以创建用户发布博客、评论、留言等进行测试，但是没有实际意义的博客会被站主删除，望各位知悉</div>",
      notificationMessage2:
        '<div style="color: #008080"><i>shuaigang更新了音乐盒相关页面数据展示</i></div><div style="color: blue;font-size: 0.1rem;">2s后自动关闭</div>',
    });
    // 方法体
    const methods = {
      checkPage(e) {
        if (e.to !== "" && e.to != "/search" && e.to != "/homeSearch") {
          // window.location.href=e.to
          state.searchInput = false;
          state.dialogVisible = false;
          router.push(e.to);
        } else if (e.to == "/search") {
          state.searchInput = true;
          nextTick(() => {
            inputRef.value[0] && inputRef.value[0].focus();
          });
        } else if (e.to == "/homeSearch") {
          state.dialogVisible = true;
          nextTick(() => {
            inputRef.value && inputRef.value.focus();
          });
        }
        if (e.title === "音乐盒" && state.titleList.length === 8) {
          methods.pushTitle(state.musicList);
        }
        if (e.title === "首页" && state.titleList.length !== 8) {
          methods.pushTitle(state.homeList);
        }
      },
      pushTitle(data) {
        state.isDisabled = true;
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
      },
      // 通知提醒
      openNotification1() {
        myMessage(state.notificationMessage1, "通知", 3, 0, "TL");
      },
      openNotification2() {
        myMessage(state.notificationMessage2, "通知", 3, null, "TL");
      },
      isMobile() {
        let flag = navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
        return flag;
      },
      searchMusic() {
        if (!state.inputCat) {
          myMessage("请输入您想要搜索的歌曲", null, 1, null, null);
        }
        localStorage.setItem("keywords", state.inputCat);
        if (router.currentRoute.value.path !== "/result") {
          router.push("/result");
        }
        // search({
        //   keywords: state.inputCat,
        //   type: 1,
        //   limit: 10,
        // }).then((res) => {
        //   console.log(res);
        // });
      },
      searchBlog() {
        if (!state.params.content) {
          myMessage("请输入您想要查询的关键字", null, 1, null, null);
          return;
        }
        request.getArticleList();
      },
      changePageNum(num) {
        state.params.pageNum = num;
        request.getArticleList();
      },
      goToBlog(id) {
        state.dialogVisible = false;
        router.push({
          path: "/blog",
          query: { id },
        });
      },
    };
    // 页面默认请求
    onMounted(() => {
      let nowPath = router.currentRoute.value.path;
      for (let i = 0; i < state.musicPath.length; i++) {
        if (nowPath == state.musicPath[i]) {
          methods.pushTitle(state.musicList);
          break;
        }
      }

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
    const request = {
      getArticleList() {
        getArticleList(state.params).then((res: any) => {
          // console.log(res);
          let { code, data } = res;
          if (code === 200) {
            state.blogList = data.list;
            state.params.total = data.total;
          }
        });
      },
    };
    return { ...methods, ...toRefs(state), inputRef };
  },
});
</script>

<style>
.search_blog_item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.search_blog_item:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
}
.search_blog_description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search_blog_gmtCreate {
  white-space: nowrap;
}

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
  cursor: url(https://shuaigang.top/gsg/static-resource/formal/resource/my.cur),
    default;
}
/* .el-button.is-disabled {
  cursor: pointer !important;
} */
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
/* .router:hover { */
/* color: #80c8f8; */
/* transform: translateY(-1rem); */
/* filter: drop-shadow(#80c8f8 0 1rem); */
/* cursor: pointer; */
/* } */
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
  background-color: gray;
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
