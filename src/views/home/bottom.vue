<template>
  <div class="HomeBottom" id="HomeBottom">
    <div class="HomeBottom_particles">
      <div class="HomeBottom_body" id="HomeBottom_body">
        <div class="HomeBottom_body_info">
          <div class="HomeBottom_body_info_left">
            <div class="top_info">
              <div class="top_left">博客</div>
              <div class="top_right">
                共 <span class="top_num">{{ page.total }} </span> 篇
              </div>
            </div>
            <div class="article_info">
              <div class="article_list" v-for="item in articleList" :key="item">
                <div class="article_item" @click="readArticle(item.id)">
                  <div class="article_title">{{ item.title }}</div>
                  <div class="article_describe">{{ item.description }}</div>
                  <div class="article_user_info">
                    <div class="article_avatar">
                      <div>
                        <el-avatar
                          :size="35"
                          :src="'https://shuaigang.top' + item.avatar"
                          @error="true"
                        >
                          <img
                            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                          />
                        </el-avatar>
                      </div>
                      <div class="article_user_name">{{ item.userName }}</div>
                      <div class="article_time">
                        <img
                          class="article_icon"
                          src="../../assets/icon/calendar.png"
                        />
                        {{ item.gmtCreate }}
                      </div>
                      <div class="article_read_num">
                        <img
                          class="article_icon"
                          src="../../assets/icon/browse.png"
                        />
                        {{ item.readNum }}
                      </div>
                      <div class="article_click_num">
                        <img
                          class="article_icon"
                          src="../../assets/icon/praise.png"
                        />
                        {{ item.clickNum }}
                      </div>
                    </div>
                    <el-tag
                      v-if="item.isNotice !== 0"
                      class="article_notice_tag"
                      >公告
                    </el-tag>
                    <el-tag
                      v-else
                      :type="item.isOriginality === 0 ? 'danger' : ''"
                      size="small"
                    >
                      {{ item.isOriginality === 0 ? "原创" : "转载" }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>
            <div class="page_info">
              <el-config-provider :locale="locale">
                <el-pagination
                  v-model:current-page="page.pageNum"
                  v-model:page-size="page.pageSize"
                  :page-sizes="page.sizes"
                  :small="false"
                  :disabled="false"
                  :background="false"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="page.total"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :hide-on-single-page="true"
                />
              </el-config-provider>
            </div>
          </div>
          <div class="HomeBottom_body_info_right">
            <div class="module_one">
              <div class="module_title">标签云</div>
              <div class="module_title_line" />
              <el-tag
                class="my_el_tags"
                v-for="tag in tagList"
                :key="tag"
                :color="tag.color"
                effect="light"
                @click="tagToList(tag)"
              >
                <span class="tag_text"> {{ tag.name }}</span>
              </el-tag>
            </div>
            <div class="module_two">
              <div class="module_title">使用指南</div>
              <div class="module_title_line" />
              <div class="guide_info">
                <div>
                  <div class="guide_info_title">项目下载安装使用指南</div>
                  <el-button
                    class="guide_info_button"
                    round
                    size="mini"
                    @click="readGuide"
                  >
                    开始阅读
                  </el-button>
                </div>
              </div>
            </div>
            <div class="module_two">
              <div class="module_title">友链</div>
              <div class="module_title_line" />
              <el-link
                style="margin-right: 1vw; margin-top: 1vh"
                v-for="link in linkData"
                :key="link"
                :href="link.url"
                target="_blank"
                :underline="false"
              >
                {{ link.name }}
              </el-link>
            </div>
          </div>
        </div>
        <div class="beian">
          <div class="beian_info">
            <div>
              <div class="beian_info_content">© 2021 - 2023 By ShuaiGang</div>
              <el-link @click="openBeian" class="beian_info_content"
                >渝ICP备2021011002号</el-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="particles-js" />
  </div>
</template>
<script lang="js">
import { getArticleList } from "@/api/article";
import { getTagList } from "@/api/tag";
import {
  defineComponent,
  watch,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
} from "vue";
import "../../js/particles.min.js";
import router from "@/router";
import myMessage from "@/utils/common";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    let locale = zhCn;
    // 页面数据
    const state = reactive({
      winState: false,
      parWidth: 0,
      parHeight: 0,
      page: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
        sizes: [5, 10, 15, 20],
      },
      articleList: [],
      tagList: [],
      linkData: [
        {
          name: "游戏一",
          url: "https://shuaigang.top/html/stick.html",
        },
        {
          name: "游戏二",
          url: "https://shuaigang.top/html/plane.html",
        },
        {
          name: "游戏三",
          url: "https://shuaigang.top/html/brick.html",
        },
        {
          name: "游戏四",
          url: "https://shuaigang.top/html/spaceship.html",
        },
        {
          name: "隔江明月照莲华",
          url: "https://shuaigang.top",
        },
      ],
    });
    // 方法体
    const methods = {
      readArticle(id) {
        router.push({
          path: "/blog",
          query: { id },
        });
      },
      tagToList(tag) {
        router.push({
          path: "/archives",
          query: { id: tag.id },
        });
      },
      readGuide() {
        myMessage("暂未开放", null, 1, null, null);
      },
      par() {
        particlesJS("particles-js", {
          particles: {
            //粒子的数量以及密度;enable为false默认为50
            number: {
              value: 250,
              density: { enable: false, value_area: 3200 },
            },
            color: { value: "#ffffff" },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 },
              image: {
                src: "img/github.svg",
                width: state.parWidth,
                height: state.parHeight,
              },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 6,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: ["grab", "repulse"] },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 400, line_linked: { opacity: 1 } },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        });
      },
      //监听容器宽高变化
      listenParentHeight() {
        window.addEventListener("resize", methods.setParentHeight());
      },
      //设置容器高度
      setParentHeight() {
        setTimeout(() => {
          // 剪掉滚动条的样式大小
          state.parWidth =
            document.getElementById("HomeBottom_body").clientWidth - 5;
          state.parHeight =
            document.getElementById("HomeBottom_body").clientHeight - 5;
        }, 1);
      },
      //监听视窗变化
      watchWin() {
        window.onresize = () => {
          return (() => {
            if (state.winState) {
              methods.setParentHeight();
            }
          })();
        };
      },
      openBeian() {
        window.open("https://beian.miit.gov.cn");
      },
      handleSizeChange(size) {
        state.page.pageSize = size;
        request.getArticleList();
      },
      handleCurrentChange(num) {
        state.page.pageNum = num;
        request.getArticleList();
      },
    };
    // 页面默认请求
    onMounted(() => {
      state.winState = true;
      methods.watchWin();
      methods.setParentHeight();
      request.getTagList();
      request.getArticleList();
    });
    onUnmounted(() => {
      state.winState = false;
      // 移除监听
      window.removeEventListener("resize", methods.setParentHeight());
    });
    onBeforeUnmount(() => {
      // 销毁 particlesJS
      if (pJSDom && pJSDom.length > 0) {
        pJSDom.forEach((pJSDomItem) => {
          pJSDomItem.pJS.fn.vendors.destroypJS();
        });
      }
    });
    // 监听state值的变化
    watch(state, (newValue, oldValue) => {
      var hb = document.getElementById("HomeBottom");
      hb.setAttribute("style", "width: " + newValue.parWidth + "px;");
      hb.setAttribute("style", "height: " + newValue.parHeight + "px;");
      // 粒子背景
      if (pJSDom && pJSDom.length > 0) {
        pJSDom.forEach((pJSDomItem) => {
          pJSDomItem.pJS.fn.vendors.destroypJS();
        });
      }
      methods.par();
    });
    // 请求
    const request = {
      getTagList() {
        getTagList({}).then((res, any) => {
          let { code, data } = res;
          if (code == 200) {
            state.tagList = data;
          }
        });
      },
      getArticleList() {
        // post请求
        getArticleList(state.page).then((res, any) => {
          let { code, message, data } = res;
          if (code === 200) {
            state.page.total = data.total;
            state.articleList = data.list;
            methods.setParentHeight();
          }
          // for (let i = 0; i < data.resultList.length; i) {
          //   var date = new Date(data.resultList[i].gmtCreate);

          //   data.resultList[i].gmtCreate = data.resultList[i].gmtCreate;
          // }
          // state.articleList = data;
        });
      },
    };
    return { ...methods, ...toRefs(state), locale };
  },
});
</script>
<style scoped>
/* :deep(.particles-js-canvas-el) {
  width: 100vw !important;
  min-height: 100% !important;
} */
#particles-js {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.HomeBottom {
  /* background-image: url("https://shuaigang.top/gsg/static-resource/formal/backgroundImg/beijing.webp"); */
  background-color: #e74c3c;
  animation: bg-color 10s infinite;
  -webkit-animation: bg-color 10s infinite;
  position: relative;
}
@-webkit-keyframes bg-color {
  0% {
    background-color: #e74c3c;
  }
  20% {
    background-color: #f1c40f;
  }
  40% {
    background-color: #1abc9c;
  }
  60% {
    background-color: #3498db;
  }
  80% {
    background-color: #9b59b6;
  }
  100% {
    background-color: #e74c3c;
  }
}

@keyframes bg-color {
  0% {
    background-color: #e74c3c;
  }
  20% {
    background-color: #f1c40f;
  }
  40% {
    background-color: #1abc9c;
  }
  60% {
    background-color: #3498db;
  }
  80% {
    background-color: #9b59b6;
  }
  100% {
    background-color: #e74c3c;
  }
}

.HomeBottom_particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/**
* 内容
*/
.HomeBottom_body {
  background-color: transparent;
}
.HomeBottom_body_info {
  padding: 5vh 12vw 12vh 12vw;
  display: flex;
}
.HomeBottom_body_info_left {
  z-index: 999;
  border-radius: 5px;
  background-color: #ffffff;
  /* height: 100%; */
  width: 100%;
}
.HomeBottom_body_info_right {
  z-index: 999;
  margin-left: 2vw;
  width: 100%;
  height: 100%;
}
.module_one,
.module_two {
  padding: 2vh 1vw 2vh 1vw;
  border-radius: 5px;
  background-color: #ffffff;
}
.module_two {
  margin-top: 2vh;
}
.module_one,
.module_two:hover {
  cursor: pointer;
}

/**
* flex左--头部
*/
.top_info {
  width: 50vw;
  display: flex;
  justify-content: space-between;
  padding: 2vh 1vw 2vh 1vw;
  border-bottom: 1px solid rgba(34, 36, 38, 0.3);
}
.top_left {
  color: #1685a9;
  font-size: 1.1rem;
  font-weight: bold;
}
.top_num {
  color: #f2711c;
  font-size: 1.5rem;
}
/**
* flex左--文章内容
*/
.article_info {
  padding: 1vh 0 4vh 0;
}
.article_list {
  padding: 2vh 0 0 0;
}
.article_item {
  padding: 1vh 1vw 1vh 1vw;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  /* background-color: #00000066; */
}
.article_item:hover {
  cursor: pointer;
  box-shadow: 0 0 0 100vw rgba(48, 55, 66, 0.15) inset;
  border-radius: 5px;
}

.article_title {
  color: #000000de;
  font-size: 1.1rem;
  font-weight: bold;
}
.article_describe {
  margin-top: 2vh;
  width: 45vw;
  white-space: inherit;
  word-break: break-all;
  color: #000000de;
  font-weight: 300;
  font-size: 0.9rem;
}
.article_user_info {
  margin-top: 2vh;
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  align-items: center;
}
.article_avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.article_user_name {
  color: #4183c4;
  margin-left: 0.5vw;
}
.article_icon {
  width: 0.7rem;
  width: 0.7rem;
}
.article_time {
  color: #00000066;
  margin-left: 0.8vw;
  font-size: 0.9rem;
}
.article_read_num {
  color: #00000066;
  margin-left: 0.8vw;
  font-size: 0.9rem;
}
.article_click_num {
  color: #00000066;
  margin-left: 0.8vw;
  font-size: 0.9rem;
}
.article_notice_tag {
  background-color: #fff;
  color: #1685a9;
}

.page_info {
  display: flex;
  justify-content: flex-end;
  padding: 0 1vw 3vh 0;
}
:deep(.el-pagination) {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
/**
* flex右  简介
*/
.module_title {
  text-decoration: none;
  font-size: 1.2rem;
  position: relative;
  transition: 0.3s;
}
.module_title_line {
  margin-top: 1vh;
  width: 6.5vw;
  border-bottom: 3px solid #80c8f8;
}
.guide_info {
  margin-top: 2vh;
  width: 100%;
  height: 20vh;
  background-image: url(https://shuaigang.top/gsg/static-resource/formal/backgroundImg/20.webp);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  justify-content: center;
}
.guide_info_title {
  font: 1rem Microsoft YaHei, Arial, Helvetica, sans-serif;
}
.guide_info_button {
  margin-top: 1.5vh;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
}
.guide_info_button:hover {
  color: black;
  /* cursor: pointer; */
  background-color: #fff;
}

.my_el_tags {
  margin-right: 0.5vw;
  margin-top: 1vh;
  border-radius: 0.6rem;
  /* font-weight: bold; */
  font-size: 0.9rem;
  color: #ffffff;
}
.my_el_tags:hover {
  border-radius: 0;
}
.my_el_tags:hover .tag_text {
  color: #ffffff;
  text-shadow: 1px 1px 1px black;
}

/**
* 底部
*/
.beian {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.beian_info {
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 10vh;
  width: 100%;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 600% 600%;
  animation: gradientBG 5s ease infinite;
  border-radius: 100% 100% 0 0;
}

.beian_info_content {
  text-align: center;
}

/* 动画，控制背景 background-position */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
