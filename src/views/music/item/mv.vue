<template>
  <div class="mv">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="mv_body">
      <div class="my_flex">
        <div class="mv_left">
          <div class="my_flex">
            <h2 class="mv_name">{{ mv.name }}</h2>
            <div
              class="mv_auth"
              v-for="(item, index) in mv.artists"
              :key="index"
            >
              <div v-if="index === 0">{{ item.name }}</div>
              <div v-else>&nbsp;/&nbsp;{{ item.name }}</div>
            </div>
          </div>
          <video class="video-wrap" controls :src="url" />
          <div class="mv_comment_title">
            精彩评论
            <div class="mv_comment_total">({{ hotComments.length }})</div>
          </div>
          <div
            class="my_flex align_center my_padding_tb_10 border_top"
            v-for="item in hotComments"
            :key="item"
          >
            <div>
              <el-avatar :size="50" :src="item.user.avatarUrl" />
            </div>
            <div class="my_margin_left_10">
              <el-text class="playlist_comment_nickname">
                {{ item.user.nickname }}：
              </el-text>
              <el-text class="playlist_comment_content">
                {{ item.content }}
              </el-text>
              <div class="playlist_comment_time">
                {{
                  new Date(item.time).getFullYear() +
                  "-" +
                  new Date(item.time).getMonth() +
                  "-" +
                  (new Date(item.time).getDate() < 10
                    ? "0" + new Date(item.time).getDate()
                    : new Date(item.time).getDate()) +
                  " " +
                  (new Date(item.time).getHours() < 10
                    ? "0" + new Date(item.time).getHours()
                    : new Date(item.time).getHours()) +
                  ":" +
                  (new Date(item.time).getMinutes() < 10
                    ? "0" + new Date(item.time).getMinutes()
                    : new Date(item.time).getMinutes()) +
                  ":" +
                  (new Date(item.time).getSeconds() < 10
                    ? "0" + new Date(item.time).getSeconds()
                    : new Date(item.time).getSeconds())
                }}
              </div>
            </div>
          </div>
          <div class="mv_comment_title">
            最新评论
            <div class="mv_comment_total">({{ total }})</div>
          </div>
          <div
            class="my_flex align_center my_padding_tb_10 border_top"
            v-for="item in comments"
            :key="item"
          >
            <div>
              <el-avatar :size="50" :src="item.user.avatarUrl" />
            </div>
            <div class="my_margin_left_10">
              <el-text class="playlist_comment_nickname">
                {{ item.user.nickname }}：
              </el-text>
              <el-text class="playlist_comment_content">
                {{ item.content }}
              </el-text>
              <div class="playlist_comment_time">
                {{
                  0 == Math.floor((nowDate - new Date(item.time)) / 60000)
                    ? "刚刚"
                    : Math.floor((nowDate - new Date(item.time)) / 60000) < 60
                    ? Math.floor((nowDate - new Date(item.time)) / 60000) +
                      "分钟前"
                    : Math.floor((nowDate - new Date(item.time)) / 3600000) < 24
                    ? Math.floor((nowDate - new Date(item.time)) / 3600000) +
                      "小时前"
                    : Math.floor((nowDate - new Date(item.time)) / 3600000) -
                        nowDate.getHours() <
                      24
                    ? "昨天" +
                      (new Date(item.time).getHours() < 10
                        ? "0" + new Date(item.time).getHours()
                        : new Date(item.time).getHours()) +
                      ":" +
                      (new Date(item.time).getMinutes() < 10
                        ? "0" + new Date(item.time).getMinutes()
                        : new Date(item.time).getMinutes()) +
                      ":" +
                      (new Date(item.time).getSeconds() < 10
                        ? "0" + new Date(item.time).getSeconds()
                        : new Date(item.time).getSeconds())
                    : Math.floor((nowDate - new Date(item.time)) / 3600000) -
                        nowDate.getHours() <
                      48
                    ? "1天前"
                    : Math.floor((nowDate - new Date(item.time)) / 3600000) -
                        nowDate.getHours() <
                      72
                    ? "2天前"
                    : Math.floor((nowDate - new Date(item.time)) / 3600000) -
                        nowDate.getHours() <
                      96
                    ? "3天前"
                    : new Date(item.time).getFullYear() +
                      "-" +
                      new Date(item.time).getMonth() +
                      "-" +
                      (new Date(item.time).getDate() < 10
                        ? "0" + new Date(item.time).getDate()
                        : new Date(item.time).getDate()) +
                      " " +
                      (new Date(item.time).getHours() < 10
                        ? "0" + new Date(item.time).getHours()
                        : new Date(item.time).getHours()) +
                      ":" +
                      (new Date(item.time).getMinutes() < 10
                        ? "0" + new Date(item.time).getMinutes()
                        : new Date(item.time).getMinutes()) +
                      ":" +
                      (new Date(item.time).getSeconds() < 10
                        ? "0" + new Date(item.time).getSeconds()
                        : new Date(item.time).getSeconds())
                }}
              </div>
            </div>
          </div>
          <div class="mv_comment_page">
            <el-pagination
              :hide-on-single-page="true"
              @current-change="currentChange"
              background
              layout="prev, pager, next"
              :total="total"
            />
          </div>
        </div>
        <div class="mv_right">
          <h2 class="mv_intro">MV简介</h2>
          <div class="mv_desc">{{ mv.desc }}</div>
          <div class="mv_time">发布时间：{{ mv.publishTime }}</div>
          <div class="mv_time">播放次数：{{ mv.playCount }}次</div>
          <div class="mv_mvs">相关推荐</div>
          <div class="mvs_item" v-for="item in mvs" :key="item">
            <div class="mvs_cover_wrap">
              <div class="my_flex align_center">
                <el-image class="mvs_cover" :src="item.cover" />
                <div class="mvs_name_info">
                  <div class="mvs_name">{{ item.name }}</div>
                  <div class="mvs_artistName">{{ item.artistName }}</div>
                </div>
              </div>
              <div class="mvs_cover_2" @click="goMv(item.id)">
                <img class="play_icon" src="./../../../assets/icon/play.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
import { getMvDetail, getMvUrl, getMvs, getMvComment } from "@/api/music";
import router from "@/router";
export default defineComponent({
  components: {},
  props: {},
  setup() {
    // 页面数据
    const state = reactive({
      id: router.currentRoute.value.query.id,
      url: "",
      mv: {
        name: "",
        artists: [],
        publishTime: "2000-01-01 00:00:00",
        playCount: 0,
      },
      mvs: [],
      comments: [],
      hotComments: [],
      limit: 10,
      offset: 0,
      total: 0,
      nowDate: new Date(),
      timer: null,
    });
    // 方法体
    const methods = {
      currentChange(n) {
        state.offset = (n - 1) * state.limit;
        request.getMvCommentPage();
      },
      goMv(id) {
        state.id = id;
        request.init();
      },
    };
    // 页面默认请求
    onMounted(() => {
      request.init();
      state.timer = setInterval(() => {
        state.nowDate = new Date();
      }, 1000);
    });
    onUnmounted(() => {
      if (state.timer) {
        clearInterval(state.timer);
      }
    });
    // 请求
    const request = {
      init() {
        getMvDetail({ mvid: state.id }).then((res: any) => {
          let { code, data } = res;
          if (code === 200) {
            state.mv = data;
          }
        });
        getMvs({ mvid: state.id }).then((res: any) => {
          let { code, mvs } = res;
          if (code === 200) {
            state.mvs = mvs;
          }
        });
        getMvUrl({ id: state.id }).then((res: any) => {
          let { code, data } = res;
          if (code === 200) {
            state.url = data.url;
          }
        });
        request.getMvCommentPage();
      },
      getMvCommentPage() {
        getMvComment({
          id: state.id,
          limit: state.limit,
          offset: state.offset,
        }).then((res: any) => {
          let { code, comments, hotComments, total } = res;
          if (code === 200) {
            if (state.offset === 0) {
              state.hotComments = hotComments;
            }
            state.comments = comments;
            state.total = total;
          }
        });
      },
    };
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style scoped>
.body_img {
  /* background-image: url(https://shuaigang.top/gsg/static-resource/formal/backgroundImg/6.webp); */
  background-color: gray;
}
.my_flex {
  display: flex;
}
.align_center {
  align-items: center;
}
.my_text_center {
  text-align: center;
}

.mv_body {
  padding: 12vh 14vw 0 14vw;
}
.mv_left {
  width: 45vw;
}
.video-wrap {
  width: 45vw;
  height: 25.3125vw;
  border-radius: 5px;
  background-color: black;
}
.mv_right {
  margin-left: 3vw;
  width: 24vw;
}
.mv_name {
  float: left;
  max-width: 100%;
  margin-top: -10px;
  margin-right: 8px;
  font-size: 24px;
  line-height: 32px;
  font-weight: normal;
}
.mv_auth {
  float: left;
  margin: 2px 0 0 0;
  line-height: 17px;
  color: #0c73c2;
}
.mv_intro {
  max-width: 100%;
  margin-top: -10px;
  font-size: 20px;
  line-height: 32px;
  font-weight: normal;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
.mv_time {
  color: #999;
}
.mv_desc {
  text-indent: 30px;
  margin-bottom: 10px;
}
.mv_mvs {
  max-width: 100%;
  font-size: 20px;
  line-height: 32px;
  font-weight: normal;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.mv_comment_title {
  font-size: 20px;
  color: #ffffff;
  display: flex;
  padding: 20px 0 10px 0;
  border-bottom: 1px solid #cfcfcf;
}
.mv_comment_total {
  font-size: 18px;
  color: #ae81ff;
}
.my_flex {
  display: flex;
}
.align_center {
  align-items: center;
}
.my_margin_left_10 {
  margin-left: 10px;
}
.my_padding_tb_10 {
  padding: 10px 0;
}
.border_top {
  border-top: 1px dotted #ccc;
}
.playlist_comment_nickname {
  font-size: 14px;
  font-weight: bold;
  color: #dd6d60;
  white-space: nowrap;
}
.playlist_comment_content {
  font-size: 14px;
  font-weight: bold;
  color: #303133;
}
.playlist_comment_time {
  margin-top: 4px;
  color: #bebebe;
}

.mv_comment_page {
  padding-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: right;
}
:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #dd6d60;
}

.mvs_item {
  margin: 20px 0;
  border-radius: 5px;
}
.mvs_item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.mvs_cover_wrap {
  position: relative;
}
.mvs_cover_2 {
  display: none;
  position: absolute;
  top: 2.5vw;
  left: 5vw;
}
.mvs_cover {
  width: 12vw;
  border-radius: 5px;
}
.mvs_item:hover .mvs_cover_2 {
  display: flex;
}
.play_icon {
  width: 2vw;
  height: 2vw;
}
.mvs_name_info {
  width: 12vw;
}
.mvs_name {
  text-align: center;
  font-size: 15px;
  color: black;
}
.mvs_artistName {
  text-align: center;
  font-size: 14px;
  color: #c5c5c5;
}
</style>
