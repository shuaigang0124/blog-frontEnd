<template>
  <div class="about">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="cover">
      <div class="info">
        <div class="info_title">
          <div class="scanner_bg">
            <div class="about_me">关于</div>
            <div class="scanner">
              <div class="not-indent">Hi:</div>
              <div class="indent">欢迎来到隔江明月照莲华</div>
              <div class="indent">很高兴你能够在百忙之中访问本站</div>
              <div class="indent">
                我是作者帅刚，一个来自重庆居于杭州的底层码农
              </div>
              <div class="indent">
                我在2021年首次创办了这个属于自己的个人空间
              </div>
              <div class="indent">
                2022年9月，我推翻了最开始的设计，重写了当前网站
              </div>
              <div class="indent">
                想借次机会引导自己写博客来保留日常的技术笔记，也能够在不断折腾的同时提升自己专业能力
              </div>
              <div class="indent">大千世界之中，我们的一面之缘实属不易</div>
              <div class="indent">
                希望我写东西能够帮到你，哪怕是帮你节约一秒的时间
              </div>
              <div class="indent">我也希望你能够给我一些建议</div>
              <div class="indent">希望你能够爱惜自己，每天早点睡</div>
              <div class="indent">祝你身体安康，并且希望我们能够成为朋友</div>
              <div class="not-indent">本站信息：</div>
              <div class="indent">about：© 2022 - 2023 By ShuaiGang</div>
              <div class="indent">备案号：渝ICP备2021011002号</div>
              <div class="indent">愿景：争取早日攻克全栈，做上架构师</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    const state = reactive({
      data: "",
    });
    const methods = {};
    onMounted(() => {});
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style scoped>
.body_img {
  background-image: url(../../assets/backgroundImg/wb04.jpg);
}
.about_me {
  color: #6d69e9;
  font-size: 26px;
  text-align: center;
}
.scanner_bg {
  padding: 20px 20px;
  text-align: left;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
/* .not-indent {
  font-size: 20px;
} */
.indent {
  padding-left: 34px;
}
.scanner {
  font-family: "Arial";
  --font-color: #b3b2e4;
  /* --font-bgcolor: #123456; */
  /* --img-background: linear-gradient(#000, #000); */
  --font-size: 17px;
  --animation-duration: 8s;
  --animation-iteration: 1;
  display: inline-block;
  background-color: var(--font-bgcolor);
  background-image: var(--img-background);
  background-size: 100% 100%;
}
.scanner div {
  position: relative;
  display: block;
  margin: 0px calc(0.5 * var(--font-size));
  height: calc(var(--font-size) * 1.5);
  line-height: calc(var(--font-size) * 1.5);
  font-size: var(--font-size);
  font-weight: bold;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* background-color: var(--font-bgcolor); */
  background-image: linear-gradient(var(--font-color), var(--font-color));
  background-size: 0% 100%;
  background-repeat: no-repeat;
  -webkit-animation: printing var(--animation-duration) linear
    var(--animation-iteration);
  animation-fill-mode: forwards;
}
.scanner div:nth-child(1) {
  animation-delay: 0;
}
/* .scanner div:nth-child(2) {
  animation-delay: var(--animation-duration);
}
.scanner div:nth-child(3) {
  animation-delay: calc(2 * var(--animation-duration));
}
.scanner div:nth-child(4) {
  animation-delay: calc(3 * var(--animation-duration));
}
.scanner div:nth-child(5) {
  animation-delay: calc(4 * var(--animation-duration));
}
.scanner div:nth-child(6) {
  animation-delay: calc(5 * var(--animation-duration));
}
.scanner div:nth-child(7) {
  animation-delay: calc(6 * var(--animation-duration));
}
.scanner div:nth-child(8) {
  animation-delay: calc(7 * var(--animation-duration));
}
.scanner div:nth-child(9) {
  animation-delay: calc(8 * var(--animation-duration));
}
.scanner div:nth-child(10) {
  animation-delay: calc(9 * var(--animation-duration));
}
.scanner div:nth-child(11) {
  animation-delay: calc(10 * var(--animation-duration));
}
.scanner div:nth-child(12) {
  animation-delay: calc(11 * var(--animation-duration));
}
.scanner div:nth-child(13) {
  animation-delay: calc(12 * var(--animation-duration));
}
.scanner div:nth-child(14) {
  animation-delay: calc(13 * var(--animation-duration));
}
.scanner div:nth-child(15) {
  animation-delay: calc(14 * var(--animation-duration));
}
.scanner div:nth-child(16) {
  animation-delay: calc(15 * var(--animation-duration));
}
.scanner div:nth-child(17) {
  animation-delay: calc(16 * var(--animation-duration));
}
.scanner div:nth-child(18) {
  animation-delay: calc(17 * var(--animation-duration));
}
.scanner div:nth-child(19) {
  animation-delay: calc(18 * var(--animation-duration));
}
.scanner div:nth-child(20) {
  animation-delay: calc(19 * var(--animation-duration));
} */
@-webkit-keyframes printing {
  0% {
    background-size: 0% 100%;
  }
  100% {
    background-size: 100% 100%;
  }
}
</style>
