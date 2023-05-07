<template>
  <div class="playLists">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="playLists_body">
      <el-card class="highquality_card" id="highquality_card">
        <div class="highquality">
          <el-image class="highquality_image" :src="highquality.coverImgUrl" />
          <div class="highquality_info">
            <div class="highquality_title">
              <div class="highquality_title_content">精品歌单</div>
            </div>
            <div class="highquality_name">{{ highquality.name }}</div>
            <div class="highquality_description">
              {{ highquality.description }}
            </div>
          </div>
        </div>
      </el-card>
      <div class="my_menu">
        <el-menu
          :default-active="menuList[0]"
          mode="horizontal"
          text-color="#fff"
          active-text-color="burlywood"
          active-background-color="rgba(0,0,0,0)"
          background-color="rgba(0,0,0,0)"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(item, index) in menuList"
            :key="index"
            :index="item"
            >{{ item }}</el-menu-item
          >
        </el-menu>
      </div>
      <div class="my_menu_palylist">
        <div v-for="item in menuPlaylists" :key="item">
          <div class="my_menu_palylist_item">
            <!-- playCount -->
            <el-image class="my_menu_palylist_image" :src="item.coverImgUrl" />
            <div class="my_menu_palylist_name">{{ item.name }}</div>
          </div>
        </div>
        <div class="my_menu_palylist_page">
          <el-pagination
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
import { get } from "@/http/axios";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    // 页面数据
    const state = reactive({
      highquality: {},
      menuList: [
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
        "治愈",
        "旅行",
      ],
      menuPlaylists: [],
      cat: "全部",
      total: 0,
      page: 1,
    });
    const methods = {
      handleSelect(cat) {
        state.cat = cat;
        request.getPlaylists();
      },
      currentChange(num) {
        state.page = num;
        request.getPlaylists();
      },
    };
    onMounted(() => {
      request.getHighquality();
      request.getPlaylists();
    });
    const request = {
      getHighquality() {
        let params = {
          limit: 1,
          cat: state.menuList[0],
        };
        get(
          "https://www.tcefrep.site/music/top/playlist/highquality",
          params
        ).then((res: any) => {
          state.highquality = res.playlists[0];
          let card = document.getElementById("highquality_card");
          card.style.setProperty(
            "background-image",
            "url(" + res.playlists[0].coverImgUrl + ")"
          );
        });
      },
      getPlaylists() {
        let params = {
          limit: 10,
          offset: (state.page - 1) * 10,
          cat: state.cat,
        };
        get("https://www.tcefrep.site/music/top/playlist", params).then(
          (res: any) => {
            state.menuPlaylists = res.playlists;
            state.total = res.total;
          }
        );
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
.playLists_body {
  padding: 12vh 14vw 4vh 14vw;
}

.highquality_card {
  border-radius: 0.4vw;
  border-color: rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0.5);
  /* background-image: url(http://p1.music.126.net/fJVwOtBJo9TK13UVd6z_Dg==/109951164687320270.jpg); */
  background-position: left -1px;
  /* 类似于蒙层 */
  background-blend-mode: overlay;
}
.highquality {
  display: flex;
}
.highquality_image {
  width: 10vw;
  height: 10vw;
}
.highquality_info {
  width: 58vw;
  padding: 0 2.5vw 0 1.5vw;
}
.highquality_title {
  height: 2vw;
  width: 6.5vw;
  min-height: 20px;
  min-width: 60px;
  border: 1px solid burlywood;
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.highquality_title_content {
  width: 100%;
  font-size: 1vw;
  color: burlywood;
  text-align: center;
}
.highquality_name {
  padding-top: 1vw;
  font-size: 0.9vw;
  color: #fff;
  text-align: center;
}
.highquality_description {
  text-align: center;
  color: #ffb6c1;
  font-size: 0.9vw;
  padding-top: 1vw;
}

.my_menu {
  width: 72vw;
  display: flex;
  justify-content: flex-end;
}
:deep(.el-menu-item) {
  padding: 1vw;
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

.my_menu_palylist {
  width: 72vw;
  display: flex;
  flex-wrap: wrap;
}
.my_menu_palylist_item {
  padding: 3vh 0.7vw 0 0.7vw;
}
.my_menu_palylist_image {
  border-radius: 0.5vw;
  width: 13vw;
  height: 13vw;
}
.my_menu_palylist_name {
  color: #fff;
  width: 13vw;
  font-size: 0.9vw;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.my_menu_palylist_page {
  padding: 5vh 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #dd6d60;
}
</style>
