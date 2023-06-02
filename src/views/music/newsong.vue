<template>
  <div class="newsong">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="newsong_body">
      <div class="newsong_menu">
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
      <div class="newsong_table">
        <el-table
          :height="tableHeight"
          ref="singleTableRef"
          :data="tableData"
          highlight-current-row
          @row-dblclick="addOnePlayList"
        >
          <el-table-column type="index" width="50" />
          <el-table-column property="album.picUrl" width="100">
            <template #default="scope">
              <!-- scroll-container=".el-table__body-wrapper"解决图片在table里的懒加载问题 -->
              <el-image
                lazy
                scroll-container=".el-table__body-wrapper"
                class="table_image"
                :src="scope.row.album.picUrl"
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
          <el-table-column
            property="album.artists[0].name"
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
                ><img class="play_icon" src="./../../assets/icon/play.png"
              /></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getTopSong, addPlayList } from "@/api/music";
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  toRefs,
} from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    // 页面数据
    const state = reactive({
      menuList: ["全部", "华语", "欧美", "日本", "韩国"],
      type: 0,
      tableData: [],
      tableHeight: 500,
      addOnePlayListState: false,
    });
    // 方法体
    const methods = {
      handleSelect(cat) {
        switch (cat) {
          case "全部":
            state.type = 0;
            break;
          case "华语":
            state.type = 7;
            break;
          case "欧美":
            state.type = 96;
            break;
          case "日本":
            state.type = 8;
            break;
          case "韩国":
            state.type = 16;
            break;
        }
        request.getNewsongList();
      },
      async addOnePlayList(row) {
        state.addOnePlayListState = true;
        await addPlayList([
          {
            id: row.id,
            author: row.album.artists[0].name,
            title: row.name,
            pic: row.album.picUrl,
          },
        ]);
        state.addOnePlayListState = false;
      },
    };
    onBeforeMount(() => {
      state.tableHeight = document.body.clientHeight * 0.78;
    });
    // 页面默认请求
    onMounted(() => {
      request.getNewsongList();
    });
    // 请求
    const request = {
      getNewsongList() {
        // 请求体数据
        const params = {
          type: state.type,
        };
        // post请求
        getTopSong(params).then((res: any) => {
          state.tableData = res.data;
        });
      },
    };
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style scoped>
.body_img {
  background-image: url(./../../assets/music/music.jpg);
}
.newsong_body {
  padding: 6vh 14vw 6vh 14vw;
}
.newsong_menu {
  width: 72vw;
  display: flex;
  justify-content: flex-start;
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
.table_image {
  width: 70px;
  height: 70px;
  border-radius: 8%;
}
.play_icon {
  width: 30px;
  height: 30px;
}
</style>
