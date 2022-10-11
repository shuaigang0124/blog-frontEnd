<template>
  <div class="pull_down">﹀</div>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="cover">
      <div class="info">
        <div class="info_title">首页</div>
        <div class="info_text">
          <span class="span1">
            <el-button type="text" @click="openGitHub()">
              <img class="icon_module" src="../../assets/home/github.png" />
            </el-button>
          </span>
          <span class="span2"
            ><el-tooltip
              class="box-item"
              effect="light"
              content="GSG1491900793"
              placement="bottom-start"
            >
              <el-button type="text">
                <img class="icon_module" src="../../assets/home/vx.png" />
              </el-button> </el-tooltip
          ></span>
          <span class="span3"
            ><el-tooltip
              class="box-item"
              effect="light"
              content="1491900793"
              placement="bottom-start"
            >
              <el-button type="text">
                <img class="icon_module" src="../../assets/home/QQ.png" />
              </el-button> </el-tooltip
          ></span>
          <span class="span4"
            ><el-tooltip
              class="box-item"
              effect="light"
              content="博客整合资料，点击获取详情"
              placement="bottom-start"
            >
              <el-button type="text" @click="open()">
                <img class="icon_module" src="../../assets/home/ziliao.png" />
              </el-button>
              <el-dialog
                v-model="dialogVisible"
                title="整合资料"
                width="30%"
                :before-close="handleClose"
              >
                <span v-html="content"></span>
              </el-dialog>
            </el-tooltip>
          </span>
        </div>
      </div>
    </div>
    <HomeBottom />
    <div class="my_backtop" @click="upTop()">
      <div class="my_backtop_msg">
        <img class="my_backtop_img" src="../../assets/icon/backTop.png" />
      </div>
    </div>
    <div class="buttomRight" @click="open()">
      <div class="buttomRight_msg">
        <div class="msg_details">资料</div>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="整合资料"
      width="30%"
      :before-close="handleClose"
    >
      <span v-html="content"></span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
// import HelloWorld from '@/components/HelloWorld.vue';
import HomeBottom from "@/components/HomeBottom.vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Home",
  components: {
    // HelloWorld,
    HomeBottom,
  },
  setup() {
    const state = reactive({
      dialogVisible: false,
      content:
        "<b>博客的代码是开源的，位置在:</b><br><br>前端：https://github.com/shuaigang0124/blog-frontEnd<br>后端：https://github.com/shuaigang0124/blog-backEnd<br><br><b>此外，博主的第一版网站也在GitHub上面，有兴趣的小伙伴可以去看看：</b><br><br>web端地址：https://github.com/shuaigang0124/website-frontend<br><br>小程序地址：https://github.com/shuaigang0124/website-uniapp-vx<br><br>后台地址：https://github.com/shuaigang0124/website-backend<br><br><b>如果觉得对您有帮助，可以请博主喝瓶雪碧，感激不尽！</b><br><br><img src='https://shuaigang.top/gsg/static-resource/formal/6/20211214/1639480627841-1295237287068419.webp' style='width: 150px;hight: 150px;'>",
    });
    const methods = {
      openGitHub() {
        window.open('https://github.com/shuaigang0124/blog-frontEnd', '_blank')
      },
      open() {
        state.dialogVisible = true;
      },
      handleClose() {
        state.dialogVisible = false;
      },
      upTop() {
        let top = document.documentElement.scrollTop;
        if (top > 0) {
          // 实现滚动效果
          const timeTop = setInterval(() => {
            if (top < 100) {
              document.body.scrollTop =
                document.documentElement.scrollTop =
                top -=
                  50;
            } else {
              var t = top / 10;
              document.body.scrollTop =
                document.documentElement.scrollTop =
                top -=
                  t;
            }
            // document.body.scrollTop =
            //   document.documentElement.scrollTop =
            //   top -=
            //     50;
            if (top <= 0) {
              clearInterval(timeTop);
            }
          }, 10);
        } else {
          ElMessage.warning("已置于顶部");
        }
      },
    };
    onMounted(() => {});
    return { ...methods, ...toRefs(state) };
  },
});
</script>

<style scoped>
.body_img {
  background-image: url(../../assets/backgroundImg/1.jpg);
}

.info_text {
  margin-top: 2vh;
  font-size: 1.3rem;
}
.span2 {
  margin-left: 3vw;
}
.span3 {
  margin-left: 3vw;
}
.span4 {
  margin-left: 3vw;
}
:deep(.el-dialog__header) {
  text-align: center !important;
}
:deep(.el-dialog__body) {
  background-color: #ecf7fe !important;
}

.my_backtop {
  /* box-shadow: 0 0 6px rgb(34, 36, 38, 0.15) inset; */
  position: fixed;
  z-index: 999;
  bottom: 15px;
  right: 15px;
  /* z-index: 999; */
  cursor: pointer;
  border-radius: 0 0 5px 5px;
  background-color: #e0e1e2;
}

.my_backtop:hover {
  box-shadow: 0 0 0 40px rgba(48, 55, 66, 0.15) inset;
  border-radius: 0 0 5px 5px;
}

.my_backtop_msg {
  width: 50px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my_backtop_img {
  width: 20px;
  height: 20px;
}

.buttomRight {
  box-shadow: 0 0 6px rgb(34, 36, 38, 0.15) inset;
  /* box-shadow: 0 0 6px rgb(0 0 0 / 12%); */
  position: fixed;
  bottom: 50px;
  right: 15px;
  z-index: 999;
  cursor: pointer;
  background-color: #2185d0;
  border-radius: 5px 5px 0 0;
}
.buttomRight:hover {
  box-shadow: 0 0 0 40px rgba(48, 55, 66, 0.15) inset;
  border-radius: 5px 5px 0 0;
}
.buttomRight_msg {
  width: 50px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.msg_details {
  color: #ffffff;
  font-weight: 800;
  font-size: 0.8rem;
}

/* .bottom {
  height: 50vh;
  background-color: #fff;
} */
</style>
