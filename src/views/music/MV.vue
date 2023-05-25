<template>
  <div class="mv">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="mv_body">
      <div
        class="mv_tag_info"
        v-for="(tag, tagIndex) in tagList"
        :key="tagIndex"
      >
        <div class="mv_tag_title">{{ tag.key }}</div>
        <div
          v-for="(item, index) in tag.list"
          :key="index"
          class="mv_tag_list"
          :style="{
            borderLeft: index !== 0 ? '1px solid #f2f2f1' : 'none',
          }"
        >
          <span
            class="mv_tag_content"
            @click="tagHandle(item, tagIndex)"
            :style="{
              backgroundColor: item === tag.value ? '#fff' : 'rgba(0,0,0,0)',
              color: item === tag.value ? '#dd6d60' : 'burlywood',
              borderRadius: item === tag.value ? '20px' : 'none',
            }"
          >
            {{ item }}
          </span>
        </div>
      </div>
      <div class="mv_list">
        <div v-for="item in mvlist" :key="item">
          <div class="mv_list_item">
            <!-- playCount -->
            <div class="mv_list_image_playCount">
              <el-image class="mv_list_image" :src="item.cover" />
              <div class="mv_list_wrap">
                <div>
                  <i class="el-icon-video-play" />
                </div>
                <div class="mv_list_playCount">
                  {{
                    item.playCount / 10000 > 10
                      ? parseInt(item.playCount / 10000) + "万"
                      : item.playCount
                  }}
                </div>
              </div>
            </div>
            <div class="mv_list_name">{{ item.name }}</div>
            <div class="mv_list_auth">{{ item.artistName }}</div>
          </div>
        </div>
        <div class="mv_list_page">
          <el-pagination
            @current-change="currentChange"
            background
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getMvAllList } from "@/api/music";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    // 页面数据
    const state = reactive({
      tagList: [
        {
          key: "地区：",
          value: "全部",
          list: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
        },
        {
          key: "类型：",
          value: "全部",
          list: ["全部", "官方版", "原声", "现场版", "网易出品"],
        },
        {
          key: "排序：",
          value: "上升最快",
          list: ["上升最快", "最热", "最新"],
        },
      ],
      mvlist: [],
      page: 1,
      total: 0,
    });
    // 方法体
    const methods = {
      tagHandle(item, index) {
        state.tagList[index].value = item;
        request.getMvList();
      },
      currentChange(num) {
        state.page = num;
        request.getMvList();
      },
    };
    // 页面默认请求
    onMounted(() => {
      request.getMvList();
    });
    // 请求
    const request = {
      getMvList() {
        let params = {
          area: state.tagList[0].value,
          type: state.tagList[1].value,
          order: state.tagList[2].value,
          limit: 8,
          offset: (state.page - 1) * 8,
        };
        getMvAllList(params).then((res: any) => {
          state.mvlist = res.data;
          if (res.count) {
            state.total = res.count;
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
.mv_body {
  padding: 10vh 14vw 4vh 14vw;
}
.mv_tag_info {
  padding: 6vh 0.5vw 0 0.5vw;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #fff;
  height: 5vh;
}
.mv_tag_title {
  min-width: 60px;
  min-height: 20px;
}
.mv_tag_list {
  height: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mv_tag_content {
  margin: 0 1.5vw;
  width: 6vw;
  height: 4vh;
  min-width: 60px;
  min-height: 20px;
  font-size: 1vw;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.mv_tag_content:hover {
  cursor: pointer;
}
.mv_list {
  width: 72vw;
  display: flex;
  flex-wrap: wrap;
}
.mv_list_item {
  padding: 3vh 0.5vw 0 0.5vw;
}
.mv_list_image {
  border-radius: 0.5vw;
  width: 17vw;
  min-height: 9.55vw;
}
.mv_list_name {
  color: #fff;
  width: 17vw;
  font-size: 0.9vw;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mv_list_auth {
  color: deeppink;
  width: 17vw;
  font-size: 0.9vw;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mv_list_page {
  padding: 5vh 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #dd6d60;
}
.mv_list_image_playCount {
  position: relative;
}
.mv_list_wrap {
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
.mv_list_playCount {
  margin-left: 5px;
  color: #fff;
}
</style>
