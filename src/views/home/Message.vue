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
        :loop="true"
        :randomChannel="true"
        :speeds="100"
        :debounce="200"
        :isSuspend="true"
      >
        <!-- 弹幕插槽 -->
        <template v-slot:dm="{ danmu }">
          <!-- <el-tag effect="light" type="info" round> -->
          <span class="danmu_info" :style="{ color: danmu.color }"
            >{{ danmu.name }}：{{ danmu.text }}</span
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
import { ElMessage } from "element-plus";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import vueDanmaku from "vue3-danmaku";
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
      addToList() {
        let data = { color: "blue", name: "帅刚", text: "到此一游" };
        let data2 = { color: "yellow", name: "俊俊", text: "我是豪豪的爹" };
        let data3 = { color: "red", name: "淼淼", text: "豪豪好大儿" };
        let data4 = { color: "#00ff00", name: "查查", text: "qwertyuioasdfgh" };
        let data5 = { color: "#00ffff", name: "柯柯", text: "爱川川❤" };
        let data6 = { color: "#cfe2f3", name: "峰峰", text: "查查是sb" };
        let data7 = { color: "#7f6000", name: "多多", text: "asdfghjkl" };
        let data8 = { color: "#674ea7", name: "川川", text: "我是化学小天才" };
        let data9 = {
          color: "#ff00ff",
          name: "豪豪",
          text: "呜呜呜，想要文文的幸福",
        };
        let data10 = {
          color: "#2d8cbb",
          name: "喵喵",
          text: "圣火昭昭，圣光耀耀，凡我弟子，喵喵喵喵。",
        };
        for (var i = 0; i < 10; i++) {
          state.danmus.push(
            data,
            data2,
            data3,
            data4,
            data5,
            data6,
            data7,
            data8,
            data9,
            data10
          );
        }
      },
      sendMsg() {
        if (state.content) {
          var str = "";
          for (var i = 0; i < 2; i++) {
            str +=
              String.fromCharCode(
                Math.floor(Math.random() * 26) + "a".charCodeAt(0)
              ) +
              String.fromCharCode(
                Math.floor(Math.random() * 26) + "A".charCodeAt(0)
              );
          }
          str += Math.floor(Math.random() * (9999 - 1000)) + 1000;
          let data = {
            color: state.contentColor,
            name: "游客" + str,
            text: state.content,
          };
          // 发送弹幕（插入到当前播放位置，实时显示）
          danmakuRef.value.add(data);
          state.content = "";
        } else {
          ElMessage.warning("发送内容不能为空！");
        }
      },
      enterClick() {
        methods.sendMsg();
      },
    };
    onMounted(() => {
      document.getElementById("inputMsg").focus();
      methods.addToList();
    });
    return { ...methods, ...toRefs(state), danmakuRef };
  },
});
</script>
<style scoped>
.body_img {
  background-image: url(../../assets/backgroundImg/wb03.jpg);
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
