<template>
  <div class="discovery">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="discovery_body">
      <el-carousel :interval="200000" type="card">
        <el-carousel-item v-for="item in banners" :key="item">
          <el-image class="banners_image" :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
      <div class="discovery_title">推荐歌单</div>
      <div class="recommended_playlist">
        <div v-for="item in palylist" :key="item">
          <div class="playlist_item">
            <el-image class="playlist_image" :src="item.picUrl" />
            <div class="playlist_name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="discovery_title">最新音乐</div>
      <div class="new_song_list">
        <div v-for="item in newSongList" :key="item">
          <div class="new_song_item">
            <el-image :src="item.picUrl" class="new_song_image" />
            <div class="new_song_info">
              <div class="new_song_name">{{ item.song.name }}</div>
              <div class="new_song_auth">
                <div>{{ item.song.artists[0].name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="discovery_title">推荐MV</div>
      <div class="recommended_mv_list">
        <div v-for="item in mvList" :key="item">
          <div class="mv_item">
            <div>
              <div class="mv_image_playCount">
                <el-image class="mv_image" :src="item.picUrl" />
                <div class="mv_wrap">
                  <div>
                    <i class="el-icon-video-play" />
                  </div>
                  <div class="mv_playCount">{{ item.playCount }}</div>
                </div>
              </div>
              <div class="mv_name">{{ item.name }}</div>
              <div class="mv_auth">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { get } from "@/http/axios";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    const state = reactive({
      banners: [],
      palylist: [],
      newSongList: [],
      mvList: [],
    });
    const methods = {
      getBanners() {
        get("https://www.tcefrep.site/music/banner", null).then((res: any) => {
          // console.log(res)
          localStorage.setItem("banners", JSON.stringify(res.banners));
          state.banners = res.banners;
        });
      },
      getPalylist() {
        get("https://www.tcefrep.site/music/personalized?limit=10", null).then(
          (res: any) => {
            // console.log(res)
            localStorage.setItem("palylist", JSON.stringify(res.result));
            state.palylist = res.result;
          }
        );
      },
      getNewSongList() {
        get("https://www.tcefrep.site/music/personalized/newsong", null).then(
          (res: any) => {
            // console.log(res)
            localStorage.setItem("newSongList", JSON.stringify(res.result));
            state.newSongList = res.result;
          }
        );
      },
      getMvList() {
        get("https://www.tcefrep.site/music/personalized/mv", null).then(
          (res: any) => {
            // console.log(res)
            localStorage.setItem("mvList", JSON.stringify(res.result));
            state.mvList = res.result;
          }
        );
      },
    };
    onMounted(() => {
      let banners = localStorage.getItem("banners");
      let palylist = localStorage.getItem("palylist");
      let newSongList = localStorage.getItem("newSongList");
      let mvList = localStorage.getItem("mvList");
      if (banners) {
        state.banners = JSON.parse(banners);
      }
      if (palylist) {
        state.palylist = JSON.parse(palylist);
      }
      if (newSongList) {
        state.newSongList = JSON.parse(newSongList);
      }
      if (mvList) {
        state.mvList = JSON.parse(mvList);
      }
      methods.getBanners();
      methods.getPalylist();
      methods.getNewSongList();
      methods.getMvList();
    });
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style scoped>
.body_img {
  /* background-image: url(https://shuaigang.top/gsg/static-resource/formal/backgroundImg/hmbb/7.webp); */
  background-color: gray;
}
.discovery_body {
  padding: 10vh 14vw 4vh 14vw;
}
:deep(.el-carousel__container) {
  height: 16vw;
}
.banners_image {
  border-radius: 0.5vw;
  width: 100%;
  height: 100%;
}
:deep(.el-carousel__mask) {
  border-radius: 0.5vw;
}
:deep(.el-carousel__indicators--outside button) {
  background-color: black;
}

.discovery_title {
  padding-top: 3vh;
  text-align: center;
  color: #fff;
  font-size: 1.2vw;
}
.recommended_playlist {
  width: 72vw;
  display: flex;
  flex-wrap: wrap;
}
.playlist_item {
  padding: 3vh 0.7vw 0 0.7vw;
}
.playlist_image {
  border-radius: 0.5vw;
  width: 13vw;
  height: 13vw;
  min-width: 50px;
  min-height: 50px;
}
.playlist_name {
  color: #fff;
  width: 13vw;
  font-size: 0.9vw;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.new_song_list {
  width: 72vw;
  display: flex;
  flex-wrap: wrap;
}
.recommended_mv_list {
  width: 72vw;
  display: flex;
  flex-wrap: wrap;
}
.new_song_item {
  width: 36vw;
  padding-top: 3vh;
  display: flex;
}
.new_song_image {
  width: 6vw;
  height: 6vw;
  min-width: 50px;
  min-height: 50px;
}
.new_song_info {
  width: 20vw;
  margin: 0.5vw 1vw;
}
.new_song_name {
  font-size: 1.1vw;
  height: 4vw;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.new_song_auth {
  height: 1vw;
  font-size: 0.9vw;
  color: deeppink;
  display: table-cell;
  vertical-align: bottom;
}

.recommended_mv_list {
  margin-top: 3vh;
  width: 72vw;
  display: flex;
}
.mv_item {
  width: 36vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mv_image {
  width: 18vw;
  min-width: 100px;
}
.mv_image_playCount {
  position: relative;
}
.mv_wrap {
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
.mv_playCount {
  margin-left: 5px;
  font-size: 0.8vw;
  color: #fff;
}
.mv_name {
  text-align: center;
  color: #fff;
  font-size: 1.1vw;
}
.mv_auth {
  text-align: center;
  color: deeppink;
  font-size: 0.9vw;
}
</style>
