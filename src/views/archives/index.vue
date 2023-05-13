<template>
  <div class="archives">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="cover">
      <div class="info">
        <div class="info_title">
          <div class="archives_title_style">归档</div>
          <el-button class="go_to_read" round @click="upDown">
            <div class="but_content_center">
              <img class="up_down_png" src="../../assets/icon/upDown.png" />
              开始阅读
            </div>
          </el-button>
        </div>
      </div>
    </div>
    <div class="archives_body">
      <div class="archives_body_left">
        <el-timeline class="archives_body_left_list">
          <el-timeline-item
            v-for="(item, index) in leftData"
            :key="index"
            :color="index == indexNum ? 'blue' : 'white'"
            @click="checkItem(index, item)"
          >
            <div
              class="archives_item_content"
              :style="{ color: index == indexNum ? 'blue' : 'black' }"
            >
              {{ item.name }}
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="archives_body_right">
        <div class="archives_body_right_list">
          <el-timeline
            class="parent_list"
            v-if="rightData.length > 0"
            v-infinite-scroll="loadMore"
            infinite-scroll-distance="20"
            :infinite-scroll-immediate="false"
          >
            <el-timeline-item
              v-for="item in rightData"
              :key="item"
              :timestamp="item.gmtCreate"
              placement="top"
            >
              <div class="index_my_card">
                <el-card @click="goToDetail(item.id)" class="my_card_hover">
                  <b>{{ item.title }}</b>
                  <p>{{ item.description }}</p>
                  <div class="tag_list">
                    <div>
                      <el-tag
                        style="margin-right: 0.5vw"
                        v-for="tag in item.tags"
                        :key="tag.name"
                        :type="
                          tag.type === 0
                            ? 'info'
                            : tag.type === 1
                            ? 'success'
                            : tag.type === 2
                            ? 'warning'
                            : tag.type === 3
                            ? 'danger'
                            : ''
                        "
                        effect="light"
                      >
                        {{ tag.name }}
                      </el-tag>
                    </div>
                    <el-tag :type="item.isOriginality === 0 ? 'danger' : ''">{{
                      item.isOriginality === 0 ? "原创" : "转载"
                    }}</el-tag>
                  </div>
                </el-card>
                <div class="index_my_wrap">
                  <div>
                    <i class="el-icon-view" />
                  </div>
                  <div>&nbsp;{{ item.readNum }}</div>
                </div>
              </div>
            </el-timeline-item>
            <div v-if="params.total <= rightData.length">
              <div align="center" class="is_not_more">
                ———————— 已经到底啦！————————
              </div>
            </div>
          </el-timeline>
          <div v-else class="parent_list">
            <div class="data_is_null">
              <img src="../../assets/icon/noData.png" />
            </div>
            <div class="data_is_null">
              <div>暂无数据！！！</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import myMessage from "@/utils/common";
import { post } from "@/http/axios";
import router from "@/router";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    const state = reactive({
      leftData: [
        {
          id: 0,
          name: "全部",
        },
      ],
      rightData: [],
      indexNum: 0,
      params: { pageNum: 1, pageSize: 10, total: 0, id: null },
    });
    const methods = {
      upDown() {
        const timeTop = setInterval(() => {
          document.documentElement.scrollTop += 20;
          if (
            document.documentElement.scrollTop >=
            document.body.clientHeight - 80
          ) {
            clearInterval(timeTop);
          }
        }, 14);
      },
      checkItem(index, item) {
        if (state.indexNum !== index) {
          state.indexNum = index;
          state.params.id = item.id;
          state.params.pageNum = 1;
          state.params.total = 0;
          // 获取并更改右边数据
          if (index == 0) {
            request.getArticleList();
          } else {
            request.getAtcByTagId();
          }
        }
      },
      goToDetail(id) {
        router.push({
          path: "/blog",
          query: { id },
        });
      },
      loadMore() {
        if (state.params.total > state.rightData.length) {
          state.params.pageNum += 1;
          if (state.indexNum === 0) {
            request.getArticleList();
          } else {
            request.getAtcByTagId();
          }
        }
      },
    };
    onMounted(() => {
      request.getList();
    });
    const request = {
      getList() {
        post("/tag/getList", {}).then((res: any) => {
          let { code, data } = res;
          if (code == 200) {
            state.leftData.push(...data);
            state.params.id = state.leftData[state.indexNum].id;
            request.getArticleList();
          }
        });
      },
      getAtcByTagId() {
        post("/article/getAtcByTagId", state.params).then((res: any) => {
          let { code, message, data } = res;
          if (code == 200) {
            if (state.params.pageNum > 1) {
              state.rightData.push(...data.list);
            } else {
              state.rightData = data.list;
            }
            state.params.total = data.total;
          } else {
            myMessage(message, "", 2, null, null);
          }
        });
      },
      getArticleList() {
        post("/article/getList", state.params).then((res: any) => {
          let { code, message, data } = res;
          if (code == 200) {
            if (state.params.pageNum > 1) {
              state.rightData.push(...data.list);
            } else {
              state.rightData = data.list;
            }
            state.params.total = data.total;
          } else {
            myMessage(message, "", 2, null, null);
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
  background-image: url(../../assets/background/26.webp);
  /* background-image: url(https://shuaigang.top/gsg/static-resource/formal/backgroundImg/hmbb5.webp); */
}
.archives_body {
  min-height: 90vh;
  background-color: #d9d9d9;
  padding: 0 17vw 0 13vw;
  display: flex;
  /* border-top: 2px solid darkgray; */
  /* border-bottom: 4px solid darkgray; */
}

.index_my_card {
  position: relative;
}
.index_my_wrap {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 15px;
  padding-right: 20px;
  padding-top: 10px;
}
.index_my_wrap:hover,
.my_card_hover:hover + .index_my_wrap {
  color: #b88230;
}

.tag_list {
  display: flex;
  justify-content: space-between;
}
.data_is_null {
  margin-top: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.is_not_more {
  padding-bottom: 2vh;
}

.archives_body_left {
  padding-top: 4vh;
  width: 15vw;
}
.archives_body_left_list {
  border: 1px solid darkgray;
  border-radius: 5px;
  padding: 2vh;
  height: 80vh;
  overflow: auto;
}

.archives_body_right {
  width: 55vw;
  /* border-left: 2px solid darkgray; */
}
.archives_body_right_list {
  padding: 4vh 0 0 1vw;
}
.parent_list {
  padding: 1.5vh 1vw 0 1vw;
  border-radius: 5px;
  border: 1px solid darkgray;
  height: 80vh;
  overflow: auto;
}
.my_card_hover:hover {
  background-color: #d9d9d9;
  border: 1px solid #d9d9d9;
}
.el-timeline-item:hover {
  color: blue;
}

.archives_item_content:hover {
  color: blue !important;
}

.archives_title_style {
  font-weight: bold;
  text-shadow: 3px 3px 3px black;
}
.go_to_read {
  margin-top: 6vh;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
}
.go_to_read:hover {
  border: 1px solid #f44336;
  /* cursor: pointer; */
  background-color: #f44336;
}
.but_content_center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.up_down_png {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
