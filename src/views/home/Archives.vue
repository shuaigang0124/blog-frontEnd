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
            v-for="item in leftData"
            :key="item"
            :color="item.id == indexNum ? 'blue' : 'white'"
            @click="aaaa(item.id)"
          >
            <div
              class="archives_item_content"
              :style="{ color: item.id == indexNum ? 'blue' : 'black' }"
            >
              {{ item.content }}
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="archives_body_right">
        <div class="archives_body_right_list">
          <el-timeline class="parent_list">
            <el-timeline-item
              v-for="item in rightData"
              :key="item"
              :timestamp="item.time"
              placement="top"
            >
              <el-card @click="goToDetail(item)" class="my_card_hover">
                <h4>{{ item.content }}</h4>
                <el-tag
                  style="margin-right: 0.5vw"
                  v-for="tag in item.tags"
                  :key="tag.name"
                  :type="tag.type"
                  effect="light"
                >
                  {{ tag.name }}
                </el-tag>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElNotification } from "element-plus";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    const state = reactive({
      leftData: [
        {
          id: 1,
          content: "学习笔记",
        },
        {
          id: 2,
          content: "BUG相关",
        },
        {
          id: 3,
          content: "技术新闻",
        },
        {
          id: 4,
          content: "面试",
        },
        {
          id: 5,
          content: "Vue",
        },
        {
          id: 6,
          content: "Java",
        },
        {
          id: 7,
          content: "软件分享",
        },
        {
          id: 8,
          content: "好物推荐",
        },
        {
          id: 9,
          content: "探索",
        },
        {
          id: 10,
          content: "关于她",
        },
        {
          id: 11,
          content: "其它",
        },
      ],
      rightData: [
        {
          time: "2022-09-19 16:05",
          content: "nima",
          tags: [
            { type: "", name: "java" },
            { type: "success", name: "vue" },
            { type: "info", name: "服务器" },
            { type: "danger", name: "数据库" },
            { type: "warning", name: "kiss" },
          ],
        },
        {
          time: "2022-09-19 16:06",
          content: "0000000",
          tags: [
            { type: "", name: "java" },
            { type: "success", name: "vue" },
          ],
        },
        {
          time: "2022-09-19 16:07",
          content: "呃呃呃呃",
          tags: [
            { type: "", name: "java" },
            { type: "success", name: "vue" },
            { type: "info", name: "服务器" },
          ],
        },
        {
          time: "2022-09-19 16:07",
          content: "呃呃呃呃",
          tags: [
            { type: "", name: "java" },
            { type: "success", name: "vue" },
            { type: "info", name: "服务器" },
          ],
        },
        {
          time: "2022-09-19 16:07",
          content: "呃呃呃呃",
          tags: [
            { type: "", name: "java" },
            { type: "success", name: "vue" },
            { type: "info", name: "服务器" },
          ],
        },
        {
          time: "2022-09-19 16:07",
          content: "呃呃呃呃",
          tags: [
            { type: "", name: "java" },
            { type: "success", name: "vue" },
            { type: "info", name: "服务器" },
          ],
        },
      ],
      indexNum: 1,
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
      aaaa(e) {
        state.indexNum = e;
        // 获取并更改右边数据
        // state.rightData =
      },
      goToDetail(e) {
        ElNotification.warning({
          title: "",
          message: "暂未开放",
          showClose: true,
          duration: 3000,
        });
      },
    };
    onMounted(() => {});
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style scoped>
.body_img {
  background-image: url(../../assets/backgroundImg/26.webp);
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
.archives_body_left {
  padding-top: 4vh;
  width: 15vw;
}
.archives_body_left_list {
  border: 1px solid darkgray;
  border-radius: 5px;
  padding: 2vh;
  height: 78vh;
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
  cursor: pointer;
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
