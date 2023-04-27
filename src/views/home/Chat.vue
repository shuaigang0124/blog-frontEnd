<template>
  <div class="chat">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="cover">
      <div class="chat_box">
        <div class="chat_box_top">
          <div>聊天室</div>
        </div>
        <div
          class="chat_box_bot"
          v-loading="loading"
          element-loading-background="rgba(0, 0, 0, 0.5)"
        >
          <div
            class="chat_message_box"
            @scroll="onScroll()"
            id="chat_chat_message_list_box"
          >
            <div class="chat_time" v-if="messageHistory">
              暂无更多历史消息...
            </div>
            <div
              class="chat_message_list"
              v-for="(item, index) in chatList"
              :key="index"
            >
              <div class="chat_time">{{ item.sendTime }}</div>
              <div class="chat_other_user" v-if="item.userId !== userId">
                <div>
                  <img
                    class="chat_user_avatar"
                    :src="'https://shuaigang.top' + item.userAvatar"
                  />
                </div>
                <div>
                  <div class="chat_user_pet_name">{{ item.userName }}</div>
                  <div class="user_content1">
                    <div class="chat_content" v-html="item.content" />
                  </div>
                </div>
              </div>
              <div class="chat_oneself_user" v-if="item.userId === userId">
                <div class="user_content2">
                  <div class="chat_content" v-html="item.content" />
                </div>
                <div>
                  <img
                    class="chat_user_avatar"
                    :src="'https://shuaigang.top' + userAvatar"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="chat_message_enter">
            <div class="chat_choose">
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
              id="chat_input_content"
              class="chat_input_content"
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
  </div>
</template>

<script lang="js">
import post from "@/http/axios";
import myMessage from "@/utils/common"
import { ElMessageBox  } from "element-plus";
import { Base64 } from "js-base64";
import router from "@/router";
import moment from "moment";
import mqtt from "mqtt";
import "../../js/mqttws31";
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    // 页面数据
    const state = reactive({
      userId: "",
      roomId: "chat-room",
      userName: "",
      userAvatar: "",
      client: null,
      chatList: [],
      refreshState: false,
      refreshTop: 0,
      refreshHeight: 0,
      pageNum: 1,
      pageSize: 10,
      loading: true,
      messageHistory: false,
    });
    // 方法体
    const methods = {
      openEmoji() {
        myMessage("暂未开放", null, 1, null, null, null, null);
      },
      openPhoto() {
        myMessage("暂未开放", null, 1, null, null, null, null);
      },
      keydown(e) {
        if (e.ctrlKey && e.keyCode === 13) {
          var a = document.getElementById("chat_input_content");
          if (a.innerHTML) {
            methods.sendMsg();
          } else {
            myMessage("发送消息不能为空", null, 1, null, null);
          }
        }
      },
      sendMsg() {
        if (!sessionStorage.getItem("shuaigangOVO")) {
          methods.open();
          return;
        }
        var a = document.getElementById("chat_input_content");
        let content = a.innerHTML;
        if (content) {
          let message = {
            userId: state.userId,
            roomId: state.roomId,
            content: content,
            sendTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss").toString(),
          };
          a.innerHTML = "";
          const container = document.getElementById("chat_chat_message_list_box");
          setTimeout(() => {
            container.scrollTop = container.scrollHeight;
          }, 1);
          request.send(message);
          // state.client.disconnect();
        } else {
          myMessage("发送消息不能为空", null, 1, null, null);
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
          // console.log(message)
          let result = JSON.parse(Base64.decode(JSON.parse(message.payloadString).data));
          // console.log(result)
          state.chatList.push(result);
          const container = document.getElementById("chat_chat_message_list_box");
          setTimeout(() => {
            container.scrollTop = container.scrollHeight;
          }, 1);
          // request.updateReadState(result.id);
        };
      },
      open() {
        ElMessageBox.confirm(
          '是否前往登录?',
          'Warning',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        ).then(() => {
            sessionStorage.setItem("router", "/index/chat")
            // window.location.href='/login'
            router.push("/login")
          })
          .catch(() => {
            // window.location.href='/index/home'
          })
      },
      onScroll() {
        var div = document.getElementById('chat_chat_message_list_box')
        let t = div.scrollTop
        let h = div.scrollHeight
        let ch = div.clientHeight
        if (t <= ch/4 && !state.refreshState
            && t - state.refreshTop < 0
            && !state.messageHistory) {
          div.style.overflow='hidden';
          console.log(t)
          state.refreshState = true;
          state.pageNum += 1
          state.refreshHeight = h
          state.loading = true;
          request.getChatList(state.roomId);
        }
        state.refreshTop = t
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
        request.getChatList(state.roomId);
        // setInterval(() => {
        //   request.getChatList(state.roomId);
        // }, 10000);
      }

//       // state.chatList.sort((a, b) => a.time.localeCompare(b.time));
//       // console.log(state.chatList);
//       // 让滚动条始终在最底部
//       // const container = document.getElementById("chat_chat_message_list_box");
//       // setTimeout(() => {
//       //   container.scrollTop = container.scrollHeight;
//       // }, 1);
    });
    onUnmounted(() => {
      if (state.client) {
        state.client.disconnect();
      }
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
            request.getChatList(state.roomId);
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
            myMessage(message, null, 2, null, null);
          }
        });
      },
      getChatList(roomId) {
        // 请求体数据
        const data = {
          roomId,
          pageNum: state.pageNum,
          pageSize: state.pageSize,
        };
        post("/chat/getChatList", data).then((res, any) => {
          let { code,message, data } = res;
          if (code === 200) {
            data.sort((a, b) => a.sendTime.localeCompare(b.sendTime));
            if (state.pageNum === 1) {
              state.chatList = data;
              // 定位到滚动条末尾
              const container = document.getElementById("chat_chat_message_list_box");
              setTimeout(() => {
                container.scrollTop = container.scrollHeight;
                state.refreshTop = container.scrollHeight - container.clientHeight;
              }, 1);
            } else {
              if (data.length > 0) {
                for (var j = 0; j < data.length; j++) {
                state.chatList.unshift(data[j]);
                }
                state.chatList.sort((a, b) => a.sendTime.localeCompare(b.sendTime));
                // 定位到刷新时的高度
                const container = document.getElementById("chat_chat_message_list_box");
                setTimeout(() => {
                  container.scrollTop = container.scrollHeight - state.refreshHeight;
                  state.refreshState = false;
                }, 1000)

              } else {
                state.messageHistory = true;
                state.refreshState = false;
              }
            }
          }
          setTimeout(() => {
            state.loading = false;
            document.getElementById('chat_chat_message_list_box').style.overflow='';
          }, 1000)
        });
      },
    };
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style scoped>
.body_img {
  background-image: url(https://shuaigang.top/gsg/static-resource/formal/backgroundImg/hmbb/13.webp);
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

.chat_message_box {
  /* background-color: green; */
  overflow: auto;
  height: 50vh;
  padding: 1vh 0 1vh 0;
  border-bottom: 1px solid #e5e5e6;
}
.chat_message_list {
  margin: 1vh 1vw 1vh 1vw;
}
.chat_time {
  font-size: 12px;
  text-align: center;
}

.chat_other_user {
  margin-top: 1vh;
  display: flex;
  justify-content: flex-start;
}

.chat_oneself_user {
  margin-top: 1vh;
  display: flex;
  justify-content: flex-end;
}

.chat_user_avatar {
  width: 35px;
  height: 35px;
  /* border-radius: 50%; */
}
.chat_user_pet_name {
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

.chat_content {
  max-width: 14vw;
  word-wrap: break-word;
  padding: 1vh 0.5vw;
}

.chat_message_enter {
  /* background-color: blue; */
  border-radius: 0 0 10px 0;
  height: 18vh;
}

.chat_choose {
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
.chat_input_content {
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

.chat_input_content:empty:before {
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
</style>
