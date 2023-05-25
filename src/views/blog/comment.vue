<template>
  <div>
    <h3 align="left">发表评论</h3>
    <div class="align_center">
      <div>
        <el-avatar
          :size="60"
          :src="
            user.avatar !== null ? 'https://shuaigang.top' + user.avatar : ''
          "
          @error="true"
        >
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
      </div>
      <el-input
        v-model="insertData.content"
        class="insert_content"
        placeholder="高低整两句吧！"
        clearable
        :rows="4"
        type="textarea"
      />
    </div>
    <div align="right" class="insert_click">
      <el-button type="primary" round @click="insertComment"> 发表 </el-button>
    </div>
    <el-divider class="my_divider"></el-divider>

    <div v-if="commentTotal">
      <h4 align="left">评论列表（{{ commentTotal }}条）</h4>
      <div v-for="(commentData, index) in commentData" :key="commentData">
        <div class="align_center margin_top_5">
          <!-- 一级头像 -->
          <div class="align_center margin_right_5">
            <el-avatar
              :size="50"
              :src="
                commentData.avatar !== null
                  ? 'https://shuaigang.top' + commentData.avatar
                  : ''
              "
              @error="true"
            >
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
          </div>
          <!-- 一级评论内容 -->
          <div class="width_100">
            <div v-if="blog.userId !== commentData.userId">
              <b class="name_size">{{ commentData.userName }}</b>
            </div>
            <div v-else>
              <b class="name_size">{{ commentData.userName }} </b>
              <b class="auth_info color_red margin_left_5"> [作者] </b>
            </div>
            <div class="margin_top_5">
              <span>{{ commentData.content }}</span>
            </div>
            <div class="time_reply_cilck margin_top_5">
              <div>
                <span>{{
                  0 ==
                  Math.floor(
                    (nowDate - new Date(commentData.gmtCreate)) / 60000
                  )
                    ? "刚刚"
                    : Math.floor(
                        (nowDate - new Date(commentData.gmtCreate)) / 60000
                      ) < 60
                    ? Math.floor(
                        (nowDate - new Date(commentData.gmtCreate)) / 60000
                      ) + "分钟前"
                    : Math.floor(
                        (nowDate - new Date(commentData.gmtCreate)) / 3600000
                      ) < 24
                    ? Math.floor(
                        (nowDate - new Date(commentData.gmtCreate)) / 3600000
                      ) + "小时前"
                    : Math.floor(
                        (nowDate - new Date(commentData.gmtCreate)) / 3600000
                      ) -
                        nowDate.getHours() <
                      24
                    ? "昨天" + commentData.gmtCreate.split(" ")[1].slice(0, 5)
                    : Math.floor(
                        (nowDate - new Date(commentData.gmtCreate)) / 3600000
                      ) -
                        nowDate.getHours() <
                      48
                    ? "1天前"
                    : Math.floor(
                        (nowDate - new Date(commentData.gmtCreate)) / 3600000
                      ) -
                        nowDate.getHours() <
                      72
                    ? "2天前"
                    : Math.floor(
                        (nowDate - new Date(commentData.gmtCreate)) / 3600000
                      ) -
                        nowDate.getHours() <
                      96
                    ? "3天前"
                    : commentData.gmtCreate.split(" ")[0]
                }}</span>
                <el-popconfirm
                  v-if="commentData.userId === user.id"
                  title="你确定删除此评论吗？"
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  @confirm="handleDelete(commentData.id)"
                  @cancel="cancelEvent"
                >
                  <template #reference>
                    <i class="el-icon-delete margin_left_5 color_red" />
                  </template>
                </el-popconfirm>
              </div>
              <!-- 操作（回复与点赞） -->
              <div class="align_center">
                <div
                  icon="el-icon-chat-line-square"
                  class="margin_right_5"
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
        <div v-if="commentData.reply === true" class="margin_left_60">
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
          class="margin_left_60"
        >
          <div v-if="!commentData.openAndClose">
            <el-button type="text" class="color_black" @click="open(index)"
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
              class="margin_top_5"
            >
              <div class="align_center">
                <!-- 二级头像 -->
                <div class="margin_right_5 align_center">
                  <el-avatar
                    :size="50"
                    :src="
                      children.avatar !== null
                        ? 'https://shuaigang.top' + children.avatar
                        : ''
                    "
                    @error="true"
                  >
                    <img
                      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                    />
                  </el-avatar>
                </div>
                <!-- 二级内容 -->
                <div class="width_100">
                  <div v-if="!children.userNameByReply">
                    <div v-if="blog.userId !== children.userId">
                      <b class="name_size">{{ children.userName }}</b>
                    </div>
                    <div v-else>
                      <b class="name_size">{{ children.userName }} </b>
                      <b class="auth_info color_red margin_left_5"> [作者] </b>
                    </div>
                  </div>
                  <div v-else>
                    <div v-if="blog.userId !== children.userId">
                      <b class="name_size">{{ children.userName }}</b>
                      <b class="reply_info margin_left_5 color_blue">回复</b>
                      <b v-if="blog.userId !== children.beCommentedUserId">
                        <b class="name_size_reply">{{
                          children.userNameByReply
                        }}</b>
                      </b>
                      <b v-else>
                        <b class="name_size_reply"
                          >{{ children.userNameByReply }}
                        </b>
                        <b class="auth_info color_red margin_left_5">
                          [作者]
                        </b>
                      </b>
                    </div>
                    <div v-else>
                      <b class="name_size">{{ children.userName }} </b>
                      <b class="auth_info color_red margin_left_5"> [作者] </b>
                      <b class="reply_info margin_left_5 color_blue">回复</b>
                      <b v-if="blog.userId !== children.beCommentedUserId">
                        <b class="margin_left_5">{{
                          children.userNameByReply
                        }}</b>
                      </b>
                      <b v-else>
                        <b class="name_size_reply"
                          >{{ children.userNameByReply }}
                        </b>
                        <b class="auth_info color_red margin_left_5">
                          [作者]
                        </b>
                      </b>
                    </div>
                  </div>

                  <div class="margin_top_5">
                    <span>{{ children.content }}</span>
                  </div>
                  <div class="time_reply_cilck margin_top_5">
                    <div>
                      <span>{{
                        0 ==
                        Math.floor(
                          (nowDate - new Date(children.gmtCreate)) / 60000
                        )
                          ? "刚刚"
                          : Math.floor(
                              (nowDate - new Date(children.gmtCreate)) / 60000
                            ) < 60
                          ? Math.floor(
                              (nowDate - new Date(children.gmtCreate)) / 60000
                            ) + "分钟前"
                          : Math.floor(
                              (nowDate - new Date(children.gmtCreate)) / 3600000
                            ) < 24
                          ? Math.floor(
                              (nowDate - new Date(children.gmtCreate)) / 3600000
                            ) + "小时前"
                          : Math.floor(
                              (nowDate - new Date(children.gmtCreate)) / 3600000
                            ) -
                              nowDate.getHours() <
                            24
                          ? "昨天" +
                            children.gmtCreate.split(" ")[1].slice(0, 5)
                          : Math.floor(
                              (nowDate - new Date(children.gmtCreate)) / 3600000
                            ) -
                              nowDate.getHours() <
                            48
                          ? "1天前"
                          : Math.floor(
                              (nowDate - new Date(children.gmtCreate)) / 3600000
                            ) -
                              nowDate.getHours() <
                            72
                          ? "2天前"
                          : Math.floor(
                              (nowDate - new Date(children.gmtCreate)) / 3600000
                            ) -
                              nowDate.getHours() <
                            96
                          ? "3天前"
                          : children.gmtCreate.split(" ")[0]
                      }}</span>
                      <el-popconfirm
                        v-if="children.userId === user.id"
                        title="你确定删除此评论吗？"
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        @confirm="handleDelete(children.id)"
                        @cancel="cancelEvent"
                      >
                        <template #reference>
                          <i class="el-icon-delete margin_left_5 color_red" />
                        </template>
                      </el-popconfirm>
                    </div>
                    <div class="align_center">
                      <div
                        class="margin_right_5"
                        @click="replyUser(children, commentData)"
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
              <!-- 二级回复框 -->
              <div v-if="children.replyUser" class="margin_left_60">
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
            <el-button
              v-if="
                !commentData.children ||
                commentData.total > commentData.children.length
              "
              type="text"
              class="color_black"
              @click="addCommentChildrenList(index)"
              :loading="loadingChildren"
              >———加载更多回复<el-icon class="el-icon-arrow-right" />
            </el-button>
            <el-button
              v-else
              type="text"
              class="color_black"
              @click="close(index)"
              >———收起<el-icon class="el-icon-arrow-up" />
            </el-button>
          </div>
        </div>
      </div>
      <div
        v-if="commentTotal > commentData.length"
        align="center"
        class="margin_top_5"
      >
        <el-button type="text" :loading="loading" @click="loadingComment"
          >加载更多评论</el-button
        >
      </div>
    </div>
    <div v-else>
      <div align="center" class="margin_top_40">
        暂无评论哦，快来评论一下吧！
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  getArticleCommentList,
  insertArticleComment,
  deleteArticleComment,
  kudosArticleComment,
} from "@/api/articleComment";
import { getUserDetails } from "@/api/user";
import myMessage from "@/utils/common";
import { Base64 } from "js-base64";
import { useRoute } from "vue-router";
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { ElMessageBox } from "element-plus";
import router from "@/router";
export default defineComponent({
  name: "",
  components: {},
  props: {
    blog: { type: Object, default: {} },
  },
  setup() {
    const route = useRoute();
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
        articleId: route.query.id,
      },
      // 评论回复
      form: {
        userId: null,
        content: null,
        parentId: null,
        beCommentedUserId: null,
        articleId: route.query.id,
        level: 1,
      },
      // 点赞
      updateData: {
        id: null,
        clickNum: 0,
      },
      openIndex: {
        level: null,
        index: null,
        children: {},
      },
      pageNum: 1,
      pageSize: 10,
      pageNumChildren: 1,
      pageSizeChildren: 20,
      loading: false,
      loadingChildren: false,
      nowDate: new Date(),
      timer: null,
    });
    const methods = {
      // 新增评论
      insertComment() {
        state.insertData.userId = state.user.id;
        request.insertComment(state.insertData);
      },
      // 展开
      open(index) {
        state.commentData[index].openAndClose = true;
        request.getCommentChildrenList(
          index,
          state.commentData[index].id,
          state.pageNum
        );
      },
      addCommentChildrenList(index) {
        state.loadingChildren = true;
        request.getCommentChildrenList(
          index,
          state.commentData[index].id,
          Math.ceil(
            state.commentData[index].children.length / state.pageSizeChildren
          ) + 1
        );
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
        if (state.openIndex.level !== null) {
          switch (state.openIndex.level) {
            case 0:
              methods.cancelReply(state.openIndex.index);
            case 1:
              methods.cancelReplyUser(state.openIndex.children);
          }
        }
        state.openIndex.level = 0;
        state.openIndex.index = index;

        state.commentData[index].reply = true;
        state.form.parentId = id;
        state.form.userId = state.user.id;
      },
      // 点赞
      click(id, index) {
        if (!state.user.id) {
          ElMessageBox.confirm("是否前往登录?", "Warning", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              sessionStorage.setItem(
                "router",
                route.path + "?id=" + route.query.id
              );
              router.push("/login");
            })
            .catch(() => {});
          return;
        }
        if (state.commentData[index].clickState) {
          request.update(id, false);
          state.commentData[index].clickState = false;
          state.commentData[index].clickNum -= 1;
        } else {
          request.update(id, true);
          state.commentData[index].clickState = true;
          state.commentData[index].clickNum += 1;
        }
      },
      // 取消回复
      cancelReply(index) {
        state.commentData[index].reply = false;
      },
      // 确定回复
      replyMessage(index) {
        request.insertComment(state.form);
        state.commentData[index].reply = false;
      },
      // 二级回复
      replyUser(children, commentData) {
        if (state.openIndex.level !== null) {
          switch (state.openIndex.level) {
            case 0:
              methods.cancelReply(state.openIndex.index);
            case 1:
              methods.cancelReplyUser(state.openIndex.children);
          }
        }
        state.openIndex.level = 1;
        state.openIndex.children = children;
        children.replyUser = true;
        state.form.parentId = commentData.id;
        state.form.userId = state.user.id;
        state.form.beCommentedUserId = children.userId;
      },
      // 二级点赞
      childrenClick(children) {
        if (!state.user.id) {
          ElMessageBox.confirm("是否前往登录?", "Warning", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              sessionStorage.setItem(
                "router",
                route.path + "?id=" + route.query.id
              );
              router.push("/login");
            })
            .catch(() => {});
          return;
        }
        if (children.clickState) {
          request.update(children.id, false);
          children.clickState = false;
          children.clickNum -= 1;
        } else {
          request.update(children.id, true);
          children.clickState = true;
          children.clickNum += 1;
        }
      },
      // 取消二级回复
      cancelReplyUser(children) {
        children.replyUser = false;
      },
      // 确定二级回复
      ReplyUserMessage(children) {
        request.insertComment(state.form);
        children.replyUser = false;
      },
      loadingComment() {
        if (state.loading == false) {
          state.loading = true;
          state.pageNum += 1;
          request.getCommentList();
        }
      },
    };
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
      state.timer = setInterval(() => {
        state.nowDate = new Date();
      }, 1000);
    });
    const request = {
      getCommentList() {
        // 请求体数据
        const data = {
          pageNum: state.pageNum,
          pageSize: state.pageSize,
          level: 0,
          nowUserId: state.user.id,
          articleId: route.query.id,
        };
        // post请求
        getArticleCommentList(data).then((res: any) => {
          let { code, data } = res;
          if (code == 200) {
            if (state.pageNum === 1) {
              state.commentTotal = data.total;
              state.commentData = data.list;
            } else {
              state.commentTotal = data.total;
              for (let i = 0; i < data.list.length; i++) {
                state.commentData.push(data.list[i]);
              }
            }
          }
          state.loading = false;
        });
      },
      getCommentChildrenList(index, parentId, pageNum) {
        // 请求体数据
        const data = {
          pageNum,
          pageSize: state.pageSizeChildren,
          level: 1,
          nowUserId: state.user.id,
          articleId: route.query.id,
          parentId,
        };
        // post请求
        getArticleCommentList(data).then((res: any) => {
          let { code, data } = res;
          if (code == 200) {
            if (pageNum == 1) {
              state.commentData[index].children = data.list;
            } else {
              state.commentData[index].children.push(...data.list);
            }
          }
          state.loadingChildren = false;
        });
      },
      insertComment(data) {
        if (!data.userId) {
          ElMessageBox.confirm("是否前往登录?", "Warning", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              sessionStorage.setItem(
                "router",
                route.path + "?id=" + route.query.id
              );
              router.push("/login");
            })
            .catch(() => {});
          return;
        }
        insertArticleComment(data).then((res: any) => {
          let { code, message } = res;
          if (code == 200) {
            myMessage(message, "", 0, null, null);
            request.getCommentList();
            state.insertData.content = null;
          } else {
            myMessage(message, "", 2, null, null);
          }
          state.form.content = null;
          state.form.parentId = null;
          state.form.beCommentedUserId = null;
        });
      },
      delete(id) {
        if (!state.user.id) {
          ElMessageBox.confirm("是否前往登录?", "Warning", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              sessionStorage.setItem(
                "router",
                route.path + "?id=" + route.query.id
              );
              router.push("/login");
            })
            .catch(() => {});
          return;
        }
        deleteArticleComment({ id }).then((res: any) => {
          let { code, message } = res;
          if (code == 200) {
            myMessage(message, "", 0, null, null);
            request.getCommentList();
          } else {
            myMessage(message, "", 2, null, null);
          }
        });
      },
      update(id, status) {
        kudosArticleComment({
          serviceId: id,
          nowUserId: state.user.id,
          status,
        }).then((res: any) => {
          let { code, message } = res;
          if (code == 200) {
            myMessage(message, "", 0, null, null);
          } else {
            myMessage(message, "", 2, null, null);
          }
        });
      },
      getUserDetails(userId) {
        getUserDetails({ userId }).then((res: any) => {
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
.insert_content {
  border-radius: 10px;
  padding-left: 20px;
}
.insert_click {
  margin-top: 20px;
}
.my_divider {
  margin-top: 20px;
  background-color: black;
}
.name_size,
.name_size_reply {
  font-size: 14px;
}
.name_size_reply {
  margin-left: 5px;
}
.auth_info,
.reply_info {
  font-size: 13px;
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
/**
common
 */
.margin_top_5 {
  margin-top: 5px;
}
.margin_top_40 {
  margin-top: 40px;
}
.margin_right_5 {
  margin-right: 5px;
}
.margin_left_5 {
  margin-left: 5px;
}
.margin_left_60 {
  margin-left: 55px;
}
.width_100 {
  width: 100%;
}

.color_blue {
  color: #409eff;
}
.color_red {
  color: #f56c6c;
}
.color_black {
  color: #303133;
}
.align_center {
  display: flex;
  align-items: center;
}
</style>
