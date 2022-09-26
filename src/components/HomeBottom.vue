<template>
  <div class="HomeBottom" id="HomeBottom">
    <div>
      <div class="HomeBottom_body">
        <div class="HomeBottom_body_info">
          <div class="HomeBottom_body_info_left" id="HomeBottom_body_left">
            <div class="top_info">
              <div class="top_left">博客</div>
              <div class="top_right">
                共 <span class="top_num">{{ totalNum }} </span> 篇
              </div>
            </div>
            <div class="article_info">
              <div class="article_list" v-for="item in articleList" :key="item">
                <div class="article_item">
                  <div class="article_title">{{ item.title }}</div>
                  <div class="article_describe">{{ item.describe }}</div>
                  <div class="article_user_info">
                    <div class="article_avatar">
                      <img class="article_avatar_img" :src="item.avatar" />
                      <div class="article_user_name">{{ item.userName }}</div>
                      <div class="article_time">
                        <img
                          class="article_icon"
                          src="../assets/icon/calendar.png"
                        />
                        {{ item.time }}
                      </div>
                      <div class="article_read_num">
                        <img
                          class="article_icon"
                          src="../assets/icon/browse.png"
                        />
                        {{ item.readNum }}
                      </div>
                      <div class="article_click_num">
                        <img
                          class="article_icon"
                          src="../assets/icon/praise.png"
                        />
                        {{ item.clickNum }}
                      </div>
                    </div>
                    <el-tag class="article_tag" type="info" size="small">
                      {{ item.tag }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="HomeBottom_body_info_right" id="HomeBottom_body_right">
            <div class="HomeBottom_body_info_right_me">9876</div>
          </div>
        </div>
      </div>
      <div class="beian">
        <div class="beian_info">
          <div>
            <div class="beian_info_content">© 2022 - 2023 By ShuaiGang</div>
            <div class="beian_info_content">渝ICP备2021011002号</div>
          </div>
        </div>
      </div>
    </div>
    <div id="particles-js" />
  </div>
</template>
<script lang="js">
import post from "@/http/axios";
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
// import Particles from "@/components/particles.vue";
import elementResizeDetectorMaker from "element-resize-detector";
import "../js/particles.min.js";
// import "stats.js";
export default defineComponent({
  name: "",
  components: {
    // Particles,
  },
  props: {},
  setup() {
    // 页面数据
    const state = reactive({
      PH: 0,
      winState: false,
      screenWidth: 0,
      screenHeight: 0,
      totalNum: 99,
      articleList: [
        // {
        //   title: "入站需知！！",
        //   describe: "如何获取源码地址？入站有什么注意事项？进来便知！",
        //   avatar:
        //     "http://175.178.9.64/gsg/static-resource/formal/2/20220730/1659166634126-3559486829291024.webp",
        //   userName: "shuaigang",
        //   time: "2022-09-19 16:05",
        //   readNum: "99",
        //   clickNum: "52",
        //   tag: "公告",
        // },
      ],
    });
    // 方法体
    const methods = {
      par() {
        particlesJS("particles-js", {
          particles: {
            number: { value: 500, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 },
              image: { src: "img/github.svg", width: 100, height: 100 },
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
        // var count_particles, stats, update = null;
        // stats = new Stats();
        // stats.setMode(0);
        // stats.domElement.style.position = "absolute";
        // stats.domElement.style.left = "0px";
        // stats.domElement.style.top = "0px";
        // document.body.appendChild(stats.domElement);
        // count_particles = document.querySelector(".js-count-particles");
        // update = function () {
        //   stats.begin();
        //   stats.end();
        //   if (
        //     window.pJSDom[0].pJS.particles &&
        //     window.pJSDom[0].pJS.particles.array
        //   ) {
        //     count_particles.innerText =
        //       window.pJSDom[0].pJS.particles.array.length;
        //   }
        //   requestAnimationFrame(update);
        // };
        // requestAnimationFrame(update);
      },
      //监听容器高度变化
      listenParentHeight() {
        const erd = elementResizeDetectorMaker();
        erd.listenTo(document.getElementById("HomeBottom_body_left").offsetHeight,
         element => {
          nextTick(()=>{
            //监听到事件后执行的业务逻辑
            var leftHeight =document.getElementById("HomeBottom_body_left").offsetHeight;
            var rightHeight =document.getElementById("HomeBottom_body_right").offsetHeight;
            var parent =document.getElementById("HomeBottom");
            if (leftHeight > rightHeight) {
              if (parent.offsetHeight < leftHeight) {

              }
              var height = state.PH + leftHeight;
              document.getElementById("HomeBottom").setAttribute("style","height: " + height.toString() + "px;");
            } else {

            }
          });
        });
        erd.listenTo(document.getElementById("HomeBottom_body_right").offsetHeight,
         element => {
          nextTick(()=>{
            //监听到事件后执行的业务逻辑

          });
        });
      },
      //设置容器高度
      setParentHeight() {
        var parent = document.getElementById("HomeBottom");
        state.PH = parent.offsetHeight;
        var childLeft = document.getElementById("HomeBottom_body_left");
        var childRight = document.getElementById("HomeBottom_body_right");
        if (parent.offsetHeight < childLeft.offsetHeight || parent.offsetWidth < childRight.offsetWidth) {
          if (childLeft.offsetHeight > childRight.offsetHeight) {
            var height = parent.offsetHeight + childLeft.offsetHeight;
          } else {
            var height = parent.offsetHeight + childRight.offsetHeight;
          }
        }
        parent.setAttribute("style","height: " + height.toString() + "px;");
      },
      //监听窗口变化
      watchWin() {
        window.onresize = () => {
          return (() => {
            if (state.winState) {
              methods.setParentHeight();
            }
            // methods.par();
          })();
        };
      },
      // beforeDestroy () {
      //   // 销毁 particlesJS
      //   if (pJSDom && pJSDom.length > 0) {
      //     pJSDom.forEach(pJSDomItem => {
      //         pJSDomItem.pJS.fn.vendors.destroypJS();
      //     })
      //   }
      // },
    };
    // 页面默认请求
    onMounted(() => {
      // var homeState = localStorage.getItem('if_home');
      // if (!homeState) {
      //   localStorage.setItem('if_home', 'true');
      // }
      // if (homeState === 'false') {
      //   localStorage.setItem('if_home', 'true');
      //   location.reload();
      // }
      state.winState = true;
      methods.watchWin();
      // request.getList();
      let data = {
        title: "入站需知！！",
        describe: "如何获取源码地址？入站有什么注意事项？进来便知！",
        avatar:
          "http://175.178.9.64/gsg/static-resource/formal/2/20220730/1659166634126-3559486829291024.webp",
        userName: "shuaigang",
        time: "2022-09-19 16:05",
        readNum: "99",
        clickNum: "52",
        tag: "公告",
      };
      for (var i = 0; i < 5; i++) {
        state.articleList.push(data);
      }
      setTimeout(function() {
        methods.setParentHeight();
        methods.par();
      }, 1)
    });
    onUnmounted(() => {
      state.winState = false;
      // methods.beforeDestroy();
      // localStorage.setItem('if_home', 'false');
    });
    // 请求
    const request = {
      getList() {
        // 请求体数据
        const data = {
          customData: {},
        };
        // post请求
        post("", data).then((res, any) => {
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
/* :deep(.particles-js-canvas-el) {
  width: 100vw !important;
  min-height: 100% !important;
} */
#particles-js {
  position: absolute;
  top: 0;
  bottom: 0;
}

.HomeBottom {
  /* background-image: url("../assets/backgroundImg/beijing.webp"); */
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

.HomeBottom_img {
  width: 100%;
}
/**
* 内容
*/
.HomeBottom_body {
  padding: 5vh 11vw 18vh 13vw;
}
.HomeBottom_body_info {
  display: flex;
}
.HomeBottom_body_info_left {
  /* width: 51vw; */
  border-radius: 5px;
  background-color: #ffffff;
  position: absolute;
  z-index: 99;
}
.HomeBottom_body_info_right {
  margin-left: 55vw;
  /* height: 20vh;
  width: 21vw; */
  border-radius: 5px;
  background-color: #ffffff;
  position: absolute;
  z-index: 99;
}
/**
* flex左--头部
*/
.top_info {
  width: 51vw;
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
  cursor: pointer;
  /* background-color: #00000066; */
}
.article_item:hover {
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
  align-items: center;
}
.article_avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.article_avatar_img {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
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
.article_tag {
  background-color: #fff;
  color: #1685a9;
}

/**
* flex右  简介
*/
.HomeBottom_body_info_right_me {
  padding: 2vh 1vw 2vh 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21vw;
  height: 20vh;
}

/**
* 底部
*/
.beian {
  /* margin-top: 5vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 99;
  bottom: -1vh;
  width: 100%;
}
.beian_info {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 15vh;
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
