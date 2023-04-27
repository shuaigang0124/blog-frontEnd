<template>
  <router-view />
</template>

<script lang="ts">
import { ElNotification } from "element-plus";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import router from "./router";
export default defineComponent({
  components: {},
  props: {},
  setup() {
    // 页面数据
    const state = reactive({
      notificationMessage2:
        '<div style="color: #008080"><i>shuaigang更新了前端页面</i></div><div style="color: blue;font-size: 0.1rem;">10s后自动关闭</div>',
    });
    // 方法体
    const methods = {
      isMobile() {
        let flag = navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
        return flag;
      },
      // 通知提醒
      openNotification1() {
        ElNotification({
          title: "消息",
          dangerouslyUseHTMLString: true,
          message:
            "<div style='font-size: 12px;'>在本站中各位可以创建用户发布博客、评论、留言等进行测试，但是没有实际意义的博客会被站主删除，望各位知悉<div>网站第一版地址：</div><div>https://shuaigang.top/website</div></div>",
          duration: 0,
        });
      },
      openNotification2() {
        // var timeNum = 10;
        // const countdown = setInterval(() => {
        //   timeNum -= 1;
        //   var data =
        //     '<div style="color: #008080"><i>shuaigang更新了前端页面</i></div><div style="color: blue;font-size: 0.1rem;">' +
        //     timeNum +
        //     "s后自动关闭</div>";
        //   state.notificationMessage2 = data;
        //   if (timeNum === 0) {
        //     clearInterval(countdown);
        //   }
        // }, 1000);
        ElNotification({
          title: "通知",
          dangerouslyUseHTMLString: true,
          message: state.notificationMessage2,
          position: "top-left",
          duration: 10000,
        });
      },
    };
    // 页面默认请求
    onMounted(() => {
      // if (methods.isMobile()) {
      //   router.push({
      //     path: "/500",
      //   });
      // } else {
      // let ntf = localStorage.getItem("notification");
      // let nowTime = new Date().getTime();
      // if (ntf) {
      //   let time = Number(ntf);
      //   if (time < nowTime - 24 * 60 * 60 * 1000) {
      //     methods.openNotification1();
      //     localStorage.setItem("notification", nowTime.toString());
      //   }
      // } else {
      //   localStorage.setItem("notification", nowTime.toString());
      //   methods.openNotification1();
      // }
      // // methods.openNotification1();
      // methods.openNotification2();
      // }
    });
    // 请求
    const request = {};
    return { ...methods, ...toRefs(state) };
  },
  // created() {
  //   let imgs = [
  //     "https://shuaigang.top/gsg/static-resource/formal/backgroundImg/6.webp",
  //     "https://shuaigang.top/gsg/static-resource/formal/backgroundImg/wb03.webp",
  //     "https://shuaigang.top/gsg/static-resource/formal/backgroundImg/wb04.webp",
  //     "https://shuaigang.top/gsg/static-resource/formal/backgroundImg/hmbb/13.webp",
  //     "https://shuaigang.top/gsg/static-resource/formal/backgroundImg/hmbb/7.webp",
  //   ];
  //   let loadCount = 0;
  //   for (let img of imgs) {
  //     let image = new Image();
  //     image.src = img;
  //     image.onload = () => {
  //       // console.log("image.onload:length:" + state.imgs.length);
  //       console.log("image.onload:src:" + image.src);
  //       loadCount++;
  //       //判断是否结束
  //       if (loadCount >= imgs.length) {
  //         //loading end
  //         console.log("end:");
  //       }
  //     };
  //   }
  // },
});
</script>
<style>
/* .mini_chat_gray {
  background-color: #ffffff;
  box-shadow: 0 0 6px rgb(0 0 0 / 12%);
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
.mini_chat_gray:hover {
  background-color: #f2f6fc;
}
.mini_font {
  width: 40px;
  height: 40px;
  text-align: center;
}
.img_icon {
  margin-top: 7px;
  width: 26px;
  height: 26px;
  cursor: pointer;
} */
</style>
