<template>
  <div class="playlist">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="playlist_info">
      <div class="playlist_top">
        <div class="playlist_top_left">
          <el-image class="playlist_img" :src="playlist.coverImgUrl" />
        </div>
        <div class="playlist_top_right">
          <div class="playlist_name">{{ playlist.name }}</div>
          <div class="playlist_avatar">
            <el-avatar :size="30" :src="playlist.creator.avatarUrl" />
            <div class="playlist_nickname">
              &nbsp;{{ playlist.creator.nickname }} &nbsp;|&nbsp;
            </div>
            <div>
              <!-- {{
              new Date(playlist.createTime).getFullYear() +
              "-" +
              new Date(playlist.createTime).getMonth() +
              "-" +
              (new Date(playlist.createTime).getDate() < 10
                ? "0" + new Date(playlist.createTime).getDate()
                : new Date(playlist.createTime).getDate()) +
              " " +
              (new Date(playlist.createTime).getHours() < 10
                ? "0" + new Date(playlist.createTime).getHours()
                : new Date(playlist.createTime).getHours()) +
              ":" +
              (new Date(playlist.createTime).getMinutes() < 10
                ? "0" + new Date(playlist.createTime).getMinutes()
                : new Date(playlist.createTime).getMinutes()) +
              ":" +
              (new Date(playlist.createTime).getSeconds() < 10
                ? "0" + new Date(playlist.createTime).getSeconds()
                : new Date(playlist.createTime).getSeconds())
            }} -->
              {{ new Date(playlist.createTime) }}
              &nbsp;创建
            </div>
          </div>
          <div class="playlist_button">
            <el-button
              type="danger"
              size="small"
              icon="el-icon-video-play"
              @click="exchange"
              :loading="exchangeLoading"
              :disabled="exchangeLoading"
            >
              仅播放当前歌单
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-plus"
              @click="add"
              :loading="addLoading"
              :disabled="addLoading"
            >
              添加到播放列表
            </el-button>
          </div>
          <div class="playlist_tags">
            <div class="playlist_tags_1">标签：</div>
            <div
              class="playlist_tags_2"
              v-for="(item, index) in playlist.tags"
              :key="index"
            >
              {{ index === 0 ? item : "&nbsp;/&nbsp;" + item }}
            </div>
          </div>
          <div class="playlist_description">
            <div class="playlist_description_1">简介：</div>
            <div class="playlist_description_2">
              {{ playlist.description }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-menu
          :default-active="nowMenu"
          mode="horizontal"
          text-color="#dd6d60"
          active-text-color="deeppink"
          active-background-color="rgba(0,0,0,0)"
          background-color="rgba(0,0,0,0)"
          @select="handleSelect"
        >
          <el-menu-item v-for="item in menuList" :key="item" :index="item">
            {{ item }}
          </el-menu-item>
        </el-menu>
        <el-divider />
        <div class="playlist_table" v-if="nowMenu === menuList[0]">
          <el-table
            :data="playlist.tracks"
            highlight-current-row
            @row-dblclick="addOnePlayList"
          >
            <el-table-column type="index" width="50" />
            <el-table-column property="al.picUrl" width="100">
              <template #default="scope">
                <!-- scroll-container=".el-table__body-wrapper"解决图片在table里的懒加载问题 -->
                <el-image
                  lazy
                  scroll-container=".el-table__body-wrapper"
                  class="playlist_table_img"
                  :src="scope.row.al.picUrl"
                >
                  <template #error>
                    <el-image
                      class="chat_user_avatar"
                      src="../../assets/error.png"
                    />
                  </template>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column property="name" label="音乐" />
            <el-table-column property="ar[0].name" label="歌手" />
            <el-table-column property="al.name" label="专辑" />
            <el-table-column label="时长" width="100">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <span>{{
                    (parseInt(parseInt(scope.row.dt / 1000)) / 60 >= 10
                      ? parseInt(scope.row.dt / 1000) / 60
                      : "0" + parseInt(parseInt(scope.row.dt / 1000) / 60)) +
                    ":" +
                    (parseInt(scope.row.dt / 1000) -
                      parseInt(parseInt(scope.row.dt / 1000) / 60) * 60 >=
                    10
                      ? parseInt(scope.row.dt / 1000) -
                        parseInt(parseInt(scope.row.dt / 1000) / 60) * 60
                      : "0" +
                        (parseInt(scope.row.dt / 1000) -
                          parseInt(parseInt(scope.row.dt / 1000) / 60) * 60))
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="80">
              <template #default="scope">
                <el-button
                  @click="addOnePlayList(scope.row)"
                  type="text"
                  :disabled="addOnePlayListState"
                  ><img class="play_icon" src="./../../../assets/icon/play.png"
                /></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="playlist_comment" v-else>
          <div class="playlist_omment_title">
            精彩评论
            <div class="playlist_comment_total">({{ hotComments.length }})</div>
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
          <div class="playlist_omment_title">
            最新评论
            <div class="playlist_comment_total">({{ commentTotal }})</div>
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
          <div class="playlist_comment_page">
            <el-pagination
              :hide-on-single-page="true"
              @current-change="currentChange"
              background
              layout="prev, pager, next"
              :total="commentTotal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
import {
  getPalylistDetail,
  getPalylistComments,
  addPlayList,
  exchangePlayList,
} from "@/api/music";
import router from "@/router";
import myMessage from "@/utils/common";
export default defineComponent({
  setup() {
    const state = reactive({
      playlist: {
        coverImgUrl: "",
        name: "",
        creator: {
          avatarUrl: "",
          nickname: "",
        },
        description: "",
        tags: [],
        createTime: 1503624885761,
        tracks: [],
      },
      nowMenu: "歌曲列表",
      menuList: ["歌曲列表", "评论"],
      hotComments: [],
      comments: [],
      commentTotal: 0,
      nowDate: new Date(),
      timer: null,
      id: router.currentRoute.value.query.id,
      limit: 10,
      offset: 0,
      exchangeLoading: false,
      addLoading: false,
      addOnePlayListState: false,
    });
    const methods = {
      handleSelect(e) {
        state.nowMenu = e;
      },
      async addOnePlayList(row) {
        state.addOnePlayListState = true;
        await addPlayList([
          {
            id: row.id,
            author: row.ar[0].name,
            title: row.name,
            pic: row.al.picUrl,
          },
        ]);
        state.addOnePlayListState = false;
      },
      currentChange(n) {
        state.offset = (n - 1) * state.limit;
        request.getComments();
      },
      async exchange() {
        if (state.playlist.tracks.length < 1) {
          return;
        }
        state.exchangeLoading = true;
        await exchangePlayList(
          state.playlist.tracks.map((r: any) => {
            return {
              id: r.id,
              author: r.ar[0].name,
              title: r.name,
              pic: r.al.picUrl,
            };
          })
        );
        state.exchangeLoading = false;
      },
      async add() {
        if (state.playlist.tracks.length < 1) {
          return;
        }
        state.addLoading = true;
        await addPlayList(
          state.playlist.tracks.map((r: any) => {
            return {
              id: r.id,
              author: r.ar[0].name,
              title: r.name,
              pic: r.al.picUrl,
            };
          })
        );
        state.addLoading = false;
      },
    };
    onMounted(() => {
      request.getDetails();
      request.getComments();
      state.timer = setInterval(() => {
        state.nowDate = new Date();
      }, 1000);
    });
    onUnmounted(() => {
      if (state.timer) {
        clearInterval(state.timer);
      }
    });
    const request = {
      getDetails() {
        getPalylistDetail({ id: state.id }).then((res: any) => {
          let { code, playlist } = res;
          if (code === 200) {
            state.playlist = playlist;
          }
        });
      },
      getComments() {
        getPalylistComments({
          id: state.id,
          limit: state.limit,
          offset: state.offset,
        }).then((res: any) => {
          let { code, hotComments, comments, total } = res;
          if (code === 200) {
            if (total > 99) {
              state.menuList[1] = "评论(99+)";
            } else {
              state.menuList[1] = "评论(" + total + ")";
            }
            if (state.offset === 0) {
              state.commentTotal = total;
              state.comments = comments;
              state.hotComments = hotComments;
            } else {
              state.commentTotal = total;
              state.comments = comments;
            }
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
  background-image: url(https://shuaigang.top/gsg/static-resource/formal/music/music.webp);
}
.playlist_info {
  padding: 16vh 14vw 0 14vw;
}
.playlist_top {
  display: flex;
  font-size: 14px;
}
.playlist_top_left {
  margin-right: 30px;
}
.playlist_img {
  height: 230px;
  width: 230px;
}
.playlist_top_right {
  width: 100%;
}
.playlist_name {
  color: #ffb6c1;
  font-weight: bold;
  text-align: center;
}
.playlist_avatar {
  display: flex;
  align-items: center;
  margin-top: 10px;
  color: #ffffff;
}
.playlist_nickname {
  font-size: 17px;
}
.playlist_button {
  margin: 20px 0;
}
.playlist_tags {
  display: flex;
  align-items: baseline;
  color: #ffffff;
}
.playlist_tags_1 {
  font-size: 17px;
}
.playlist_tags_2 {
  font-size: 15px;
}
.playlist_description {
  margin-top: 20px;
  color: #ffffff;
  font-size: 15px;
  display: flex;
  align-items: baseline;
}
.playlist_description_1 {
  font-size: 17px;
  white-space: nowrap;
}
.playlist_description_2 {
  text-align: center;
}

:deep(.el-menu-item) {
  font-size: 18px;
  padding: 2vh 0;
  margin-right: 3vw;
  height: 100%;
  line-height: 100%;
}
:deep(.el-menu.el-menu--horizontal) {
  border-bottom: none;
}
:deep(.el-menu .el-menu-item:hover) {
  background: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 100%
  ) !important;
}
:deep(.el-divider--horizontal) {
  margin: -1px 0 0 0;
  z-index: -1;
  height: 1px;
}
.playlist_table {
  padding: 2vh 0 50px 0;
}
.playlist_table_img {
  width: 70px;
  height: 70px;
  border-radius: 8%;
}
.play_icon {
  width: 30px;
  height: 30px;
}

.playlist_omment_title {
  font-size: 20px;
  color: #ffffff;
  display: flex;
  padding: 20px 0 10px 0;
  border-bottom: 1px solid #cfcfcf;
}
.playlist_comment_total {
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
  color: deeppink;
  white-space: nowrap;
}
.playlist_comment_content {
  font-size: 14px;
  font-weight: bold;
  color: #dd6d60;
}
.playlist_comment_time {
  margin-top: 4px;
  color: #bebebe;
}

.playlist_comment_page {
  padding-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
}
:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #dd6d60;
}
</style>
