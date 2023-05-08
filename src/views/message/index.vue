<template>
  <div class="message">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="info_input">
      <el-input
        id="inputMsg"
        class="input_msg"
        :style="{ '--contentColor': contentColor }"
        v-model="content"
        @keyup.enter="enterClick"
        placeholder="高低整两句吧！"
      >
        <template #prepend>
          <div style="height: 39px">
            <!-- 取色器添加透明度参数：show-alpha -->
            <el-color-picker
              v-model="contentColor"
              :predefine="predefineColors"
              size="small"
            />
          </div>
        </template>
        <template #append>
          <el-button @click="sendMsg">Enter ↵</el-button>
        </template>
      </el-input>
    </div>
    <div class="danmu">
      <vue-danmaku
        ref="danmakuRef"
        class="danmuku"
        v-model:danmus="danmus"
        useSlot
        :randomChannel="true"
        :speeds="100"
        :debounce="700"
        :isSuspend="false"
        :loop="true"
      >
        <!-- 弹幕插槽 -->
        <template v-slot:dm="{ danmu }">
          <!-- <el-tag effect="light" type="info" round> -->
          <span class="danmu_info" :style="{ color: danmu.color }"
            >{{ danmu.userName }}：{{ danmu.content }}</span
          >
          <!-- </el-tag> -->
        </template>
        <!-- 容器插槽 -->
        <div></div>
      </vue-danmaku>
    </div>
  </div>
</template>

<script lang="ts">
import myMessage from "@/utils/common";
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import vueDanmaku from "vue3-danmaku";
import { ElMessageBox } from "element-plus";
import {post} from "@/http/axios";
import router from "@/router";
import { Base64 } from "js-base64";
export default defineComponent({
  name: "",
  components: {
    vueDanmaku,
  },
  props: {},
  setup() {
    const danmakuRef = ref(null);
    const state = reactive({
      danmus: [],
      content: "",
      userId: "",
      contentColor: "#303133",
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
    });
    const methods = {
      sendMsg() {
        if (state.content) {
          let data = {};
          if (state.userId) {
            data = {
              color: state.contentColor,
              content: state.content,
              userId: state.userId,
              userName: "【当前发送】"
            };
          } else {
            ElMessageBox.confirm("是否前往登录?", "Warning", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                sessionStorage.setItem("router", "/message");
                // window.location.href='/login'
                router.push("/login");
              })
              .catch(() => {
                // window.location.href='/home'
              });
            return;
          }
          request.insertMsg(data);
          state.content = "";
        } else {
          myMessage("发送内容不能为空！", null, 1, null, null);
        }
      },
      enterClick() {
        methods.sendMsg();
      },
    };
    onMounted(() => {
      document.getElementById("inputMsg").focus();
      // methods.addToList();
      request.getMsgList();
      if (sessionStorage.getItem("shuaigangOVO")) {
        state.userId = Base64.decode(sessionStorage.getItem("shuaigangOVO"));
      }
    });
    onUnmounted(() => {
      state.danmus = [];
    });
    // 请求
    const request = {
      getMsgList() {
        // post请求
        post("/msg/getMsg", null).then((res: any) => {
          let { message, data } = res;
          state.danmus = data;
        });
      },
      insertMsg(param) {
        post("/msg/insertMsg", param).then((res: any) => {
          let { code } = res;
          if (code === 200) {
            // 发送弹幕（插入到当前播放位置，实时显示）
            danmakuRef.value.add(param);
          } else {
          }
        });
      },
    };
    return { ...methods, ...toRefs(state), danmakuRef };
  },
});
</script>
<style scoped>
.body_img {
  background-image: url(https://shuaigang.top/gsg/static-resource/formal/backgroundImg/wb03.webp);
  /* background-image: url(https://shuaigang.top/gsg/static-resource/formal/backgroundImg/hmbb/4.webp); */
}
.info_input {
  position: absolute;
  left: 38vw;
  top: 60vh;
  margin: auto;
  z-index: 99;
}
:deep(.el-input__inner) {
  color: var(--contentColor) !important;
}
:deep(.el-input-group__append) {
  /* background-color: #155371 !important; */
  color: #fff !important;
}
:deep(.el-input) {
  --el-input-background-color: rgba(0, 0, 0, 0.2);
}
:deep(.el-input-group__append) {
  background-color: rgba(0, 0, 0, 0.2);
}
:deep(.el-input-group__prepend) {
  border: none !important;
  padding: 0;
  background-color: rgba(0, 0, 0, 0.2);
}

:deep(.el-color-picker__trigger) {
  margin-top: -0.5px;
  border: none !important;
  border-top: 1px solid #e6e6e6 !important;
  border-left: 1px solid #e6e6e6 !important;
  border-bottom: 1px solid #e6e6e6 !important;
  height: 40px;
  width: 40px;
  border-radius: 0;
}
.danmu {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.danmuku {
  margin-top: 10vh;
  height: 90vh;
  width: 100vw;
}

.danmu_info {
  font-size: 20px;
}
</style>
