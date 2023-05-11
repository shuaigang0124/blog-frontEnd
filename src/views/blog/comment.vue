<template>
  <div>
    <h3 align="left">发表评论</h3>
    <div class="align_center">
      <div>
        <el-avatar :size="60" :src="user.avatar" @error="true">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
      </div>
      <el-input
        v-model="insertData.content"
        style="border-radius: 10px; padding-left: 20px"
        placeholder="高低整两句吧！"
        clearable
        :rows="4"
        type="textarea"
      />
    </div>
    <div align="right" style="margin-top: 15px">
      <el-button type="primary" round @click="insertComment"> 发表 </el-button>
    </div>
    <el-divider style="margin-top: 20px; background-color: black"></el-divider>

    <div v-if="commentTotal">
      <h4 align="left">评论列表（{{ commentTotal }}条）</h4>
      <div v-for="(commentData, index) in commentData" :key="commentData">
        <div class="align_center">
          <!-- 一级头像 -->
          <div style="margin-right: 10px; display: flex; align-items: center">
            <el-avatar :size="60" :src="commentData.avatar" @error="true">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
          </div>
          <!-- 一级评论内容 -->
          <div style="width: 100%">
            <div v-if="blog.userId !== commentData.userId">
              <b style="font-size: 14px">{{ commentData.userName }}</b>
            </div>
            <div v-else>
              <b style="font-size: 14px">{{ commentData.userName }} </b>
              <b style="font-size: 12px; margin-left: 10px; color: red"
                >作者【</b
              >
              <b style="font-size: 12px; color: red" class="el-icon-medal-1"
                >优质打工人】</b
              >
            </div>
            <div style="margin: 5px 0">
              <span>{{ commentData.content }}</span>
            </div>
            <div class="time_reply_cilck">
              <div>
                <span>{{ commentData.gmtCreate }}</span>
                <el-popconfirm
                  v-if="commentData.userId === user.id"
                  title="你确定删除此评论吗？"
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  @confirm="handleDelete(commentData.id)"
                  @cancel="cancelEvent"
                >
                  <template #reference>
                    <el-button
                      type="text"
                      style="margin-left: 10px"
                      icon="el-icon-delete"
                    ></el-button>
                  </template>
                </el-popconfirm>
              </div>
              <!-- 操作（回复与点赞） -->
              <div class="align_center">
                <div
                  icon="el-icon-chat-line-square"
                  style="color: #000000; margin-right: 8px"
                  @click="reply(commentData.id, index)"
                >
                  回复
                </div>
                <div
                  v-if="!commentData.clickState"
                  @click="click(commentData.id, index)"
                >
                  <div class="align_center">
                    <img
                      class="comment_click_icon"
                      src="../../assets/icon/praise.png"
                    />点赞{{
                      commentData.clickNum > 0
                        ? "(" + commentData.clickNum + ")"
                        : ""
                    }}
                  </div>
                </div>
                <div
                  type="text"
                  icon="el-icon-thumb"
                  v-else
                  @click="click(commentData.id, index)"
                >
                  <div class="align_center">
                    <img
                      class="comment_click_icon"
                      src="../../assets/icon/praise.png"
                    />取消({{ commentData.clickNum }})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 一级回复框 -->
        <div v-if="commentData.reply === true" style="margin-left: 70px">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item
              :label="'回复' + commentData.userName + '：'"
              prop="content"
            >
              <el-input
                v-model="form.content"
                placeholder="diss一下吧"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="cancelReply(index)">取消</el-button>
              <el-button type="primary" @click="replyMessage(index)"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- 子评论 -->
        <div
          v-if="commentData.total !== 0 && commentData.total !== null"
          style="margin-left: 70px"
        >
          <div v-if="!commentData.openAndClose">
            <el-button type="text" style="color: black" @click="open(index)"
              >—————展开{{ commentData.total }}条回复<el-icon
                class="el-icon-arrow-right"
              />
            </el-button>
          </div>
          <div v-else>
            <!-- 子评论 -->
            <div
              v-for="children in commentData.children"
              :key="children"
              style="padding: 2px"
            >
              <div class="align_center">
                <!-- 二级头像 -->
                <div
                  style="margin-right: 10px; display: flex; align-items: center"
                >
                  <el-avatar :size="50" :src="children.avatar" @error="true">
                    <img
                      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                    />
                  </el-avatar>
                </div>
                <!-- 二级内容 -->
                <div style="width: 100%">
                  <div v-if="children.userNameByReply === null">
                    <div v-if="blog.userId !== children.userId">
                      <b style="font-size: 14px">{{ children.userName }}</b>
                    </div>
                    <div v-else>
                      <b style="font-size: 14px">{{ children.userName }} </b>
                      <b style="font-size: 12px; margin-left: 10px; color: red"
                        >作者【</b
                      >
                      <b
                        style="font-size: 12px; color: red"
                        class="el-icon-medal-1"
                        >优质打工人】</b
                      >
                    </div>
                  </div>
                  <div v-else>
                    <div v-if="blog.userId !== children.userId">
                      <b style="font-size: 14px">{{ children.userName }}</b>
                      <b style="color: #87ceeb; margin-left: 10px">回复</b>
                      <b v-if="blog.userId !== children.beCommentedUserId">
                        <b style="font-size: 14px; margin-left: 10px">{{
                          children.userNameByReply
                        }}</b>
                      </b>
                      <b v-else>
                        <b style="font-size: 14px; margin-left: 10px"
                          >{{ children.userNameByReply }}
                        </b>
                        <b
                          style="font-size: 12px; margin-left: 10px; color: red"
                          >作者【</b
                        >
                        <b
                          style="font-size: 12px; color: red"
                          class="el-icon-medal-1"
                          >优质打工人】</b
                        >
                      </b>
                    </div>
                    <div v-else>
                      <b style="font-size: 14px; font-size: 14px"
                        >{{ children.userName }}
                      </b>
                      <b style="font-size: 12px; margin-left: 10px; color: red"
                        >作者【</b
                      >
                      <b
                        style="font-size: 12px; color: red"
                        class="el-icon-medal-1"
                        >优质打工人】</b
                      >
                      <b style="color: #87ceeb; margin-left: 10px">回复</b>
                      <b v-if="blog.userId !== children.beCommentedUserId">
                        <b style="margin-left: 10px">{{
                          children.userNameByReply
                        }}</b>
                      </b>
                      <b v-else>
                        <b style="font-size: 14px; margin-left: 10px"
                          >{{ children.userNameByReply }}
                        </b>
                        <b
                          style="font-size: 12px; margin-left: 10px; color: red"
                          >作者【</b
                        >
                        <b
                          style="font-size: 12px; color: red"
                          class="el-icon-medal-1"
                          >优质打工人】</b
                        >
                      </b>
                    </div>
                  </div>

                  <div style="margin: 5px 0">
                    <span>{{ children.content }}</span>
                  </div>
                  <div class="time_reply_cilck">
                    <div>
                      <span>{{ children.gmtCreate }}</span>
                      <el-popconfirm
                        v-if="children.userId === user.id"
                        title="你确定删除此评论吗？"
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        @confirm="handleDelete(children.id)"
                        @cancel="cancelEvent"
                      >
                        <template #reference>
                          <el-button
                            type="text"
                            style="margin-left: 10px"
                            icon="el-icon-delete"
                          ></el-button>
                        </template>
                      </el-popconfirm>
                    </div>
                    <div class="align_center">
                      <div
                        style="margin-right: 8px"
                        @click="replyUser(children)"
                      >
                        回复
                      </div>
                      <div
                        v-if="!children.clickState"
                        @click="childrenClick(children)"
                      >
                        <div class="align_center">
                          <img
                            class="comment_click_icon"
                            src="../../assets/icon/praise.png"
                          />点赞{{
                            commentData.clickNum > 0
                              ? "(" + commentData.clickNum + ")"
                              : ""
                          }}
                        </div>
                      </div>
                      <div v-else @click="childrenClick(children)">
                        <img
                          class="comment_click_icon"
                          src="../../assets/icon/praise.png"
                        />取消({{ children.clickNum }})
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="children.replyUser" style="margin-left: 60px">
                <el-form :inline="true" :model="form" class="demo-form-inline">
                  <el-form-item
                    :label="'回复' + children.userName + '：'"
                    prop="content"
                  >
                    <el-input
                      v-model="form.content"
                      placeholder="diss一下吧"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="cancelReplyUser(children)"
                      >取消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="ReplyUserMessage(children)"
                      >确定</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <el-button type="text" style="color: black" @click="close(index)"
              >———收起<el-icon class="el-icon-arrow-up" />
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div align="center" style="margin-top: 40px">
        暂无评论哦，快来评论一下吧！
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { post } from "@/http/axios";
import myMessage from "@/utils/common";
import { Base64 } from "js-base64";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {
    blog: { type: Object, default: {} },
  },
  setup(props) {
    const blog = props.blog;
    // 页面数据
    const state = reactive({
      commentTotal: 0,
      commentData: null,
      // commentData: [
      //   {
      //     id: "",
      //     clickNum: 0,
      //     openAndClose: false,
      //     reply: false,
      //     avatar: "",
      //     userId: "GSG1",
      //     userName: "shauigang",
      //     content: "dasdas",
      //     total: 1,
      //     clickState: false,
      //     gmtCreate: "2023-02-02 00:12:33",
      //     children: [
      //       {
      //         clickNum: 0,
      //         replyUser: false,
      //         userId: "GSG1",
      //         userName: "dasda",
      //         avatar: "",
      //         beCommentedUserId: "GSG10",
      //         userNameByReply: "1233",
      //         content: "dasdadasdasds",
      //         gmtCreate: "2023-02-02 00:12:33",
      //         clickState: false,
      //       },
      //       {
      //         clickNum: 0,
      //         replyUser: false,
      //         userId: "GSG1",
      //         userName: "dasda",
      //         avatar: "",
      //         beCommentedUserId: "GSG10",
      //         userNameByReply: "1233",
      //         content: "dasdadasdasds",
      //         gmtCreate: "2023-02-02 00:12:33",
      //         clickState: false,
      //       },
      //     ],
      //   },
      // ],
      // 用户登录数据
      user: {
        id: null,
        avatar: null,
        userName: null,
      },
      // 新增评论
      insertData: {
        userId: null,
        content: null,
        parentId: null,
        articleId: blog.id,
      },
      // 评论回复
      form: {
        userId: null,
        content: null,
        parentId: null,
        articleId: blog.id,
      },
      // 点赞
      updateData: {
        id: null,
        clickNum: 0,
      },
    });
    // 方法体
    const methods = {
      // 新增评论
      insertComment() {
        // console.log(state.insertData);
        request.insertComment();
      },
      // 展开
      open(index) {
        state.commentData[index].openAndClose = true;
      },
      // 关闭
      close(index) {
        state.commentData[index].openAndClose = false;
      },
      // 取消删除
      cancelEvent() {},
      // 确定删除
      handleDelete(id) {
        request.delete(id);
      },
      // 回复
      reply(id, index) {
        state.commentData[index].reply = true;
        state.form.parentId = id;
      },
      // 点赞
      click(id, index) {
        let clickNum = state.commentData[index].clickNum;
        request.update(id, clickNum);
      },
      // 取消回复
      cancelReply(index) {
        state.commentData[index].reply = false;
      },
      // 确定回复
      replyMessage(index) {
        request.addReply();
        state.commentData[index].reply = false;
      },
      // 二级回复
      replyUser(children) {
        children.replyUser = true;
        state.form.parentId = children.id;
      },
      // 二级点赞
      childrenClick(children) {
        // children.clickNum = children.clickNum + 1;
        request.update(children.id, children.clickNum);
      },
      // 取消二级回复
      cancelReplyUser(children) {
        children.replyUser = false;
      },
      // 确定二级回复
      ReplyUserMessage(children) {
        request.addReply();
        children.replyUser = false;
      },
    };
    // 页面默认请求
    onMounted(() => {
      if (sessionStorage.getItem("shuaigangOVO")) {
        state.user.id = Base64.decode(sessionStorage.getItem("shuaigangOVO"));
      }
      if (
        !sessionStorage.getItem("avatar") ||
        !sessionStorage.getItem("username")
      ) {
        request.getUserDetails(state.user.id);
      }
      state.user.avatar = sessionStorage.getItem("avatar");
      state.user.userName = sessionStorage.getItem("username");
      request.getCommentList();
    });
    // 请求
    const request = {
      getCommentList() {
        // 请求体数据
        const data = {
          pageNum: 1,
          pageSize: 10,
          level: 0,
          nowUserId: state.user.id,
          articleId: blog.id,
        };
        // post请求
        post("/articleComment/getList", data).then((res: any) => {
          let { code, data } = res;
          if (code == 200) {
            state.commentTotal = data.total;
            state.commentData = data.list;
          }
        });
      },
      insertComment() {
        state.insertData.userId = state.user.id;
        console.log(state.insertData);
        post("/articleComment/insert", state.insertData).then((res: any) => {
          console.log(res);
          let { code, message } = res;
          if (code == 200) {
            myMessage(message, "", 0, null, null);
            state.insertData.content = "";
          }
        });
      },
      delete(id) {
        console.log(id);
      },
      update(id, clickNum) {
        console.log(id, clickNum);
      },
      addReply() {
        state.form.userId = state.user.id;
        console.log(state.form);
      },
      getUserDetails(userId) {
        post("/user/getUserDetails", { userId }).then((res: any) => {
          let { code, data } = res;
          if (code == 200) {
            sessionStorage.setItem("avatar", data.avatar);
            sessionStorage.setItem("username", data.userName);
          }
        });
      },
    };
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style scoped>
.align_center {
  display: flex;
  align-items: center;
}
.time_reply_cilck {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #999;
  font-size: 12px;
}
.comment_click_icon {
  width: 14px;
  height: 14px;
  margin-right: 2px;
}
</style>
