<template>
  <div class="search_result">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="result_body">
      <div class="result_top">
        <div class="result_keywords">
          <h1>{{ keywords }}</h1>
        </div>
        <div class="result_total">找到 {{ total }} 个结果</div>
      </div>
      <div class="result_menu">
        <el-menu
          :default-active="type"
          mode="horizontal"
          text-color="#dd6d60"
          active-text-color="deeppink"
          active-background-color="rgba(0,0,0,0)"
          background-color="rgba(0,0,0,0)"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="item in resultMenuList"
            :key="item"
            :index="item.type"
            >{{ item.name }}</el-menu-item
          >
        </el-menu>
        <el-divider />
        <div class="result_table" v-if="type === resultMenuList[0].type">
          <el-table
            :data="resultTableData"
            highlight-current-row
            @row-dblclick="addOnePlayList"
          >
            <el-table-column type="index" width="50" />
            <el-table-column property="name" label="音乐" />
            <el-table-column
              property="artists[0].name"
              label="歌手"
              width="150"
            />
            <el-table-column property="album.name" label="专辑" />
            <el-table-column label="时长" width="100">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <span>{{
                    (parseInt(parseInt(scope.row.duration / 1000)) / 60 >= 10
                      ? parseInt(scope.row.duration / 1000) / 60
                      : "0" +
                        parseInt(parseInt(scope.row.duration / 1000) / 60)) +
                    ":" +
                    (parseInt(scope.row.duration / 1000) -
                      parseInt(parseInt(scope.row.duration / 1000) / 60) * 60 >=
                    10
                      ? parseInt(scope.row.duration / 1000) -
                        parseInt(parseInt(scope.row.duration / 1000) / 60) * 60
                      : "0" +
                        (parseInt(scope.row.duration / 1000) -
                          parseInt(parseInt(scope.row.duration / 1000) / 60) *
                            60))
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
        <div class="result_playlists" v-if="type === resultMenuList[1].type">
          <div
            v-for="item in resultPlaylists"
            :key="item"
            @click="goToPlaylistDetails(item)"
          >
            <div class="result_palylist_item">
              <el-image class="result_palylist_image" :src="item.coverImgUrl" />
              <div class="result_palylist_name">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <div class="result_mvs" v-if="type === resultMenuList[2].type">
          <div v-for="item in resultMvs" :key="item">
            <div class="result_mvs_item">
              <!-- playCount -->
              <div class="result_mvs_image_playCount">
                <el-image class="result_mvs_image" :src="item.cover" />
                <div class="result_mvs_wrap">
                  <div>
                    <i class="el-icon-video-play" />
                  </div>
                  <div class="result_mvs_playCount">
                    {{
                      item.playCount / 10000 > 10
                        ? parseInt(item.playCount / 10000) + "万"
                        : item.playCount
                    }}
                  </div>
                </div>
                <div class="result_mvs_wrap2">
                  <div class="result_mvs_time">
                    {{
                      (parseInt(parseInt(item.duration / 1000)) / 60 > 10
                        ? parseInt(item.duration / 1000) / 60
                        : "0" + parseInt(parseInt(item.duration / 1000) / 60)) +
                      ":" +
                      (parseInt(item.duration / 1000) -
                        parseInt(parseInt(item.duration / 1000) / 60) * 60 >
                      10
                        ? parseInt(item.duration / 1000) -
                          parseInt(parseInt(item.duration / 1000) / 60) * 60
                        : "0" +
                          (parseInt(item.duration / 1000) -
                            parseInt(parseInt(item.duration / 1000) / 60) * 60))
                    }}
                  </div>
                </div>
                <div class="play_icon_cover" @click="goMv(item.id)">
                  <img
                    class="play_icon2"
                    src="./../../../assets/icon/play.png"
                  />
                </div>
              </div>
              <div class="result_mvs_name">{{ item.name }}</div>
              <div class="result_mvs_auth">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
        <div class="search_result_page" v-if="keywords !== ''">
          <el-pagination
            :hide-on-single-page="true"
            @current-change="currentChange"
            background
            layout="prev, pager, next"
            :total="total"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { search, addPlayList } from "@/api/music";
import myMessage from "@/utils/common";
import router from "@/router";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    const state = reactive({
      resultMenuList: [
        {
          type: "1",
          name: "歌曲",
        },
        {
          type: "1000",
          name: "歌单",
        },
        {
          type: "1004",
          name: "MV",
        },
      ],
      type: "1",
      total: 0,
      offset: 0,
      limit: 10,
      keywords: "",
      resultTableData: [],
      resultPlaylists: [],
      resultMvs: [],
      addOnePlayListState: false,
    });
    const methods = {
      handleSelect(e) {
        state.type = e;
        if (e === state.resultMenuList[2].type) {
          state.limit = 8;
        } else {
          state.limit = 10;
        }
        request.searchMusic();
      },
      currentChange(num) {
        state.offset = (num - 1) * state.limit;
        request.searchMusic();
      },
      async addOnePlayList(row) {
        state.addOnePlayListState = true;
        await addPlayList([
          {
            id: row.id,
            author: row.artists[0].name,
            title: row.name,
          },
        ]);
        state.addOnePlayListState = false;
      },
      watchLocalStorage() {
        window.addEventListener("setItemEvent2", (e: any) => {
          if (e.key === "keywords") {
            state.keywords = e.newValue;
            request.searchMusic();
          }
        });
      },
      goToPlaylistDetails(r) {
        router.push({
          path: "playlist",
          query: {
            id: r.id,
          },
        });
      },
      goMv(id) {
        router.push({ path: "/mv", query: { id } });
      },
    };
    onMounted(() => {
      methods.watchLocalStorage();
      let kw = localStorage.getItem("keywords");
      if (kw === undefined || kw === null || kw === "") {
        myMessage("请输入关键字搜索", null, 1, null, null);
        return;
      }
      state.keywords = kw;
      request.searchMusic();
    });
    const request = {
      searchMusic() {
        search({
          keywords: state.keywords,
          type: state.type,
          limit: state.limit,
          offset: state.offset,
        }).then((res: any) => {
          if (res.code === 200) {
            switch (state.type) {
              case state.resultMenuList[0].type:
                state.resultTableData = res.result.songs;
                state.total = res.result.songCount;
                return;
              case state.resultMenuList[1].type:
                state.resultPlaylists = res.result.playlists;
                state.total = res.result.playlistCount;
                return;
              case state.resultMenuList[2].type:
                state.resultMvs = res.result.mvs;
                state.total = res.result.mvCount;
                return;
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
.result_body {
  padding: 8vh 14vw 0 14vw;
}
.result_top {
  display: flex;
  align-items: baseline;
}
.result_keywords {
  color: #ffffff;
}
.result_total {
  height: 100%;
  color: lightpink;
  margin-left: 10px;
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
  margin: -2px 0 0 0;
  z-index: -1;
  height: 2px;
}
.result_table {
  margin-top: 2vh;
}
.result_playlists {
  width: 72vw;
  display: flex;
  flex-wrap: wrap;
}

.result_palylist_item {
  padding: 3vh 0.7vw 0 0.7vw;
}
.result_palylist_image {
  border-radius: 0.5vw;
  width: 13vw;
  height: 13vw;
}
.result_palylist_image:hover {
  cursor: pointer;
  box-shadow: 0 0 10px rgba(35, 173, 278, 1);
}
.result_palylist_name {
  color: #fff;
  width: 13vw;
  font-size: 0.9vw;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.result_mvs {
  width: 72vw;
  display: flex;
  flex-wrap: wrap;
}
.result_mvs_item {
  padding: 3vh 0.5vw 0 0.5vw;
}
.result_mvs_image {
  border-radius: 0.5vw;
  width: 17vw;
  min-height: 9.55vw;
}
.result_mvs_name {
  color: #fff;
  width: 17vw;
  font-size: 0.9vw;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.result_mvs_auth {
  color: deeppink;
  width: 17vw;
  font-size: 0.9vw;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.result_mvs_image_playCount {
  position: relative;
}
.result_mvs_wrap {
  position: absolute;
  color: #fff;
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}
.result_mvs_wrap2 {
  position: absolute;
  color: #fff;
  bottom: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 15px;
  padding-right: 5px;
  padding-bottom: 5px;
}
.result_mvs_playCount,
.result_mvs_time {
  color: #fff;
}
.result_mvs_playCount {
  margin-left: 5px;
}
.play_icon_cover {
  display: none;
  position: absolute;
  top: 4vw;
  left: 7.5vw;
}
.result_mvs_image_playCount:hover .play_icon_cover {
  display: flex;
  align-items: center;
}
.result_mvs_image_playCount:hover .result_mvs_image {
  cursor: pointer;
  box-shadow: 0 0 10px rgba(35, 173, 278, 1);
}
.play_icon2 {
  width: 2vw;
  height: 2vw;
}

.search_result_page {
  padding: 3vh 0 10vh 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.play_icon {
  width: 30px;
  height: 30px;
}
</style>
