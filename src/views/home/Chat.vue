<template>
  <div class="main_conter">
    <div class="chat_box">
      <div class="chat_box_top">
        <div>聊天室</div>
      </div>
      <div class="chat_box_bot">
        <div class="message_box" id="message_list_box">
          <div
            class="message_list"
            v-for="(item, index) in chatList"
            :key="index"
          >
            <div class="time">{{ item.sendTime }}</div>
            <div class="other_user" v-if="item.userId !== userId">
              <div>
                <img
                  class="user_avatar"
                  :src="'https://shuaigang.top' + item.userAvatar"
                />
              </div>
              <div>
                <div class="user_pet_name">{{ item.userName }}</div>
                <div class="user_content1">
                  <div class="content" v-html="item.content" />
                </div>
              </div>
            </div>
            <div class="oneself_user" v-if="item.userId === userId">
              <div class="user_content2">
                <div class="content" v-html="item.content" />
              </div>
              <div>
                <img
                  class="user_avatar"
                  :src="'https://shuaigang.top' + userAvatar"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="message_enter">
          <div class="choose">
            <div class="emo">
              <img
                class="ep"
                src="../../assets/chat/emoji.png"
                @click="openEmoji"
              />
            </div>
            <div class="pho">
              <img
                class="ep"
                src="../../assets/chat/photo.png"
                @click="openPhoto"
              />
            </div>
          </div>
          <div
            id="input_content"
            class="input_content"
            @keydown="keydown($event)"
            contenteditable="true"
            placeholder="请填写"
          ></div>
          <div class="send">
            <div class="hint">Ctrl+Enter快捷发送</div>
            <div class="enter">
              <el-button size="mini" @click="sendMsg"
                >发送<img class="enter_img" src="../../assets/chat/enter.png"
              /></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import post from "@/http/axios";
import { ElMessageBox,ElNotification  } from "element-plus";
import { Base64 } from "js-base64";
import router from "@/router";
import moment from "moment";
import mqtt from "mqtt";
import "../../js/mqttws31";
// import stomp from "stompjs";
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    // 页面数据
    const state = reactive({
      userId: "",
      roomId: "chat-room",
      userName: "",
      userAvatar: "",
      client: null,
      chatList: []
    });
    // 方法体
    const methods = {
      openEmoji() {
        ElNotification.warning({
          title: '',
          message: '暂未开放',
          showClose: true,
          duration: 3000
        })
      },
      openPhoto() {
        ElNotification.warning({
          title: '',
          message: '暂未开放',
          showClose: true,
          duration: 3000
        })
      },
      //换行并重新定位光标位置
      textareaRange() {
        var el = document.getElementById("input_content");
        // var range = document.createRange();
        // //返回用户当前的选区
        var sel =  document.getSelection();
        //获取当前光标位置
        var offset = sel.focusOffset
        //div当前内容
        var content = el.innerHTML
        //添加换行符\n
        el.innerHTML = content.slice(0,offset)+'<br>'+content.slice(offset)
        // //设置光标为当前位置
        // range.setStart(el.childNodes[0], offset + 1);
        // //使得选区(光标)开始与结束位置重叠
        // range.collapse(true);
        // //移除现有其他的选区
        // sel.removeAllRanges();
        // //加入光标的选区
        // sel.addRange(range);
      },
      keydown(e) {
        if (e.ctrlKey && e.keyCode === 13) {
          var a = document.getElementById("input_content");
          if (a.innerHTML) {
            methods.sendMsg();
          } else {
            ElNotification.warning({
              title: '',
              message: '发送消息不能为空！',
              showClose: true,
              duration: 3000
            })
          }
        }
      },
      sendMsg() {
        var a = document.getElementById("input_content");
        let content = a.innerHTML;
        if (content) {
          let message = {
            userId: state.userId,
            roomId: state.roomId,
            content: content,
            sendTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss").toString(),
          };
          a.innerHTML = "";
          const container = document.getElementById("message_list_box");
          setTimeout(() => {
            container.scrollTop = container.scrollHeight;
          }, 1);
          request.send(message);
          // state.client.disconnect();
        } else {
          ElNotification.warning({
            title: '',
            message: '发送消息不能为空！',
            showClose: true,
            duration: 3000
          })
        }
      },
      connect() {
        // mqtt连接
        if (process.env.NODE_ENV === 'production') {
          // 生产环境
          state.client = new Paho.MQTT.Client(
            "shuaigang.top",
            443,
            "/ws",
            state.userId
          );
        } else {
          // 本地环境
          state.client = new Paho.MQTT.Client(
            "175.178.9.64",
            15675,
            "/ws",
            state.userId
          );
        }

        var msg = new Paho.MQTT.Message("你好");
        msg.destinationName = state.roomId;
        var options = {
          timeout: 3,
          userName: "shuaigang",
          password: "1491900793",
          willMessage: msg,
          keepAliveInterval: 30,
          cleanSession: false,
          useSSL: false,
          // useSSL: true,
          invocationContext: {
            // host: "175.178.9.64",
            // port: 15675,
            // path: state.client.path,
            // clientId: state.userId,
          },
          onSuccess: (e, any) => {
            console.log("连接成功~");
            state.client.subscribe(
              state.userId,
              {
                qos: 1,
                invocationContext: {},
                onSuccess: () => {
                  console.log("订阅成功");
                },
                onFailure: () => {
                  console.log("订阅失败");
                },
                timeout: 300,
              }
            );
          },
          onFailure: (message, any) => {
            console.log("连接失败~");
            // methods.connect();
          },
        };
        // 考虑到https的情况
        if (location.protocol == "https:") {
          options.useSSL = true;
        }
        if (process.env.NODE_ENV === 'production') {
          options.useSSL = true;
        }
        state.client.connect(options);
        console.log("已连接");

        // 连接断开事件
        state.client.onConnectionLost = function (responseObject) {
          console.log("失去连接 - " + responseObject.errorMessage);
          // methods.connect();
        };

        // 接收消息事件
        state.client.onMessageArrived = function (message) {
          console.log(message)
          let data = JSON.parse(Base64.decode(JSON.parse(message.payloadString).data));
          console.log(data)
          state.chatList.push(data);
          const container = document.getElementById("message_list_box");
          setTimeout(() => {
            container.scrollTop = container.scrollHeight;
          }, 1);
          // request.updateReadState(data.id);
        };
      },
      open() {
        ElMessageBox.confirm(
          '是否前往登录?',
          'Warning',
          {
            confirmButtonText: '确定',
            cancelButtonText: '返回首页',
            type: 'warning',
          }
        ).then(() => {
            sessionStorage.setItem("router", "/index/chat")
            window.open("/login", "_blank")
            window.close()
          })
          .catch(() => {
            // router.push("/index/home")
            window.open("/index/home", "_blank")
            window.close()
          })
      },
    };
    // 页面默认请求
    onMounted(() => {
      let userId = sessionStorage.getItem("shuaigangOVO");
      if (userId) {
        userId = Base64.decode(userId);
        state.userId = userId
        request.getUserDetails(userId);
      } else {
        methods.open();
        // sessionStorage.setItem("router", "/index/chat")
        // window.open("/login", "_blank")
        // window.close()
      }

      // state.chatList.sort((a, b) => a.time.localeCompare(b.time));
      // console.log(state.chatList);
      // 让滚动条始终在最底部
      // const container = document.getElementById("message_list_box");
      // setTimeout(() => {
      //   container.scrollTop = container.scrollHeight;
      // }, 1);
    });
    onUnmounted(() => {
      state.client.disconnect();
    });
    // 请求
    const request = {
      getUserDetails(id) {
        // 请求体数据
        const data = {
            userId: id,
        };
        post("/user/getUserDetails", data).then((res, any) => {
          let { code, data } = res;
          if (code === 200) {
            state.userName = data.userName;
            state.userAvatar = data.avatar;
            request.getChatList(state.roomId, 1, 10);
            methods.connect();
          }
        });
      },
      send(msg) {
        post("/chat/sendMsg", msg).then((res, any) => {
          // console.log(res);
          let { code,message, data } = res;
          if (code === 200) {
            // 更新lastMsg
            console.log("发送成功")
          } else {
            ElNotification.error({
              title: '',
              message: message,
              showClose: true,
              duration: 3000
            })
          }
        });
      },
      getChatList(roomId, pageNum, pageSize) {
        // 请求体数据
        const data = {
          roomId,
          pageNum,
          pageSize,
        };
        post("/chat/getChatList", data).then((res, any) => {
          let { code,message, data } = res;
          if (code === 200) {
            data.sort((a, b) => a.sendTime.localeCompare(b.sendTime));
            state.chatList = data;
            // 定位到滚动条末尾
            const container = document.getElementById("message_list_box");
            setTimeout(() => {
              container.scrollTop = container.scrollHeight;
            }, 1);
          }
        });
      },
    };
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style scoped>
.main_conter {
  width: 100vw;
  height: 100vh;
  z-index: -10;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(https://shuaigang.top/gsg/static-resource/formal/backgroundImg/hmbb/13.webp);
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat_box {
  width: 60vw;
  height: 80vh;
  /* background-color: gray; */
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
/* 顶部按钮 */
.chat_box_top {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  border-bottom: 1px solid #e5e5e6;
  box-sizing: border-box;
}

.chat_box_bot {
  height: 70vh;
}
.chat_list {
  width: 100%;
}
.chat_list_item {
  min-height: 10vh;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  /* background-color: #fff; */
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
}
.item_left {
  margin-left: 0.6vw;
}
.item_avatar {
  width: 5.5vh;
  height: 5.5vh;
  border-radius: 50%;
}
.item_center {
  margin-left: 0.6vw;
}
.item_name {
  font-size: 12px;
  color: black;
  width: 12vw;
  word-wrap: break-word; /* 强制换行 */
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis; /*隐藏后添加省略号*/
  white-space: nowrap; /*强制不换行*/
}
.item_last_massage {
  margin-top: 0.4vh;
  font-size: 12px;
  color: gray;
  width: 10vw;
  word-wrap: break-word; /* 强制换行 */
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis; /*隐藏后添加省略号*/
  white-space: nowrap; /*强制不换行*/
}
.item_right {
  width: 3.5vw;
}
.item_tag {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.el-tag {
  border-radius: 10px;
}

.message_box {
  /* background-color: green; */
  overflow: auto;
  height: 50vh;
  padding: 1vh 0 1vh 0;
  border-bottom: 1px solid #e5e5e6;
}
.message_list {
  margin: 1vh 1vw 1vh 1vw;
}
.time {
  font-size: 12px;
  text-align: center;
}

.other_user {
  margin-top: 1vh;
  display: flex;
  justify-content: flex-start;
}

.oneself_user {
  margin-top: 1vh;
  display: flex;
  justify-content: flex-end;
}

.user_avatar {
  width: 35px;
  height: 35px;
  /* border-radius: 50%; */
}
.user_pet_name {
  margin-left: 1vw;
  font-size: 13px;
  color: black;
}

.user_content1 {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0.5vh 0 0 1vw;
  font-size: 14px;
  background-color: #fff;
  border-radius: 0 2px 2px 2px;
}

.user_content1::before {
  content: "";
  position: absolute;
  border: 2px solid;
  border-color: #fff #fff transparent transparent;
  left: -3px;
  top: 0;
}

.user_content2 {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 1vw;
  font-size: 14px;
  background-color: #00ff7f;
  border-radius: 2px 0 2px 2px;
}

.user_content2::before {
  content: "";
  position: absolute;
  border: 2px solid;
  border-color: #00ff7f transparent transparent #00ff7f;
  right: -3px;
  top: 0;
}

.content {
  max-width: 14vw;
  word-wrap: break-word;
  padding: 1vh 0.5vw;
}

.message_enter {
  /* background-color: blue; */
  border-radius: 0 0 10px 0;
  height: 18vh;
}

.choose {
  height: 6vh;
  display: flex;
  align-items: center;
}
.emo {
  margin-left: 1vw;
}
.pho {
  margin-left: 0.5vw;
}
.ep {
  width: 3vh;
  height: 3vh;
}
.input_content {
  height: 5vh;
  padding: 0 1vw 1vh 1vw;
  font-size: 12px;
  color: #000;
  outline: none;
  overflow: hidden;
  display: block;
  white-space: normal;
  word-break: break-all;
  overflow-y: auto;
}

.input_content:empty:before {
  color: #adadad;
  content: attr(placeholder);
  font-size: 12px;
}

.send {
  height: 6vh;
  border-radius: 0 0 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1vw;
}
.hint {
  font-size: 12px;
  color: gray;
}
.enter {
  font-size: 12px;
}
.enter_img {
  width: 1.5vh;
  height: 1.5vh;
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
  /* 颜色rgb(232, 232, 232) */
  background: rgba(0, 0, 0, 0.5) !important;
  /* 线性渐变背景 */
  /* background-image: linear-gradient(45deg, #ffbd61 25%,#ffbd61 25%, #ff8800 25%, #ff8800 50%,#ffbd61 50%, #ffbd61 75%, #ff8800 75%, #ff8800 100%)!important; */
}

/*滚动条轨道*/
::-webkit-scrollbar-track {
  border-radius: 10px !important;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2) !important;
  background: #fff !important;
}
</style>
