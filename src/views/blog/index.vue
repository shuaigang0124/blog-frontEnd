<template>
  <div class="blog">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="cover">
      <div class="info">
        <div class="info_title">博客详情</div>
      </div>
    </div>
    <div class="blog_body">
      <el-card shadow="always" class="my_el_card">
        <template #header>
          <div class="blog_top">
            <el-image class="blog_avatar" :src="blog.avatar">
              <template #error>
                <img class="blog_avatar" src="../../assets/error.png"
              /></template>
            </el-image>
            <div class="blog_userName">
              <div>{{ blog.userName }}</div>
            </div>
            <div class="blog_info">
              <img class="blog_icon" src="../../assets/icon/calendar.png" />
              <div class="blog_info_content">{{ blog.gmtCreate }}</div>
            </div>
            <div class="blog_info">
              <img class="blog_icon" src="../../assets/icon/browse.png" />
              <div class="blog_info_content">{{ blog.readNum }}</div>
            </div>
            <div class="blog_info">
              <img class="blog_icon" src="../../assets/icon/praise.png" />
              <div class="blog_info_content">{{ blog.clickNum }}</div>
            </div>
          </div>
        </template>
        <el-image class="blog_img" :src="blog.img">
          <template #error>
            <img class="blog_img" src="../../assets/background/hmbb/2.jpg" />
          </template>
        </el-image>
        <div class="blog_tag">
          <el-tag
            class="blog_tag_info"
            :type="item.type"
            v-for="item in blog.tags"
            :key="item"
          >
            {{ item.name }}
          </el-tag>
        </div>
        <h2 class="blog_title">{{ blog.title }}</h2>
        <div class="html_content" v-html="blog.content" />
        <div class="add_click_num">
          <el-button plain round type="danger">赞赏</el-button>
        </div>
        <div class="box_info">
          <div class="box_content">
            作者：{{
              blog.isOriginality !== 0 ? blog.oldUserName : blog.userName
            }}
          </div>
          <div class="box_content">
            发表时间：{{
              blog.isOriginality !== 0 ? blog.oldTime : blog.gmtCreate
            }}
          </div>
          <div class="box_content">
            版权声明：{{
              blog.isOriginality !== 0
                ? blog.statement
                : "自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）"
            }}
          </div>
          <div class="box_content">
            转载：{{
              blog.isOriginality !== 0 ? blog.oldLink : "请在文末添加当前链接"
            }}
          </div>
        </div>
        <!-- 以下为评论 -->
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
            <el-button type="primary" round @click="insertComment">
              发表
            </el-button>
          </div>
          <el-divider
            style="margin-top: 20px; background-color: black"
          ></el-divider>

          <div v-if="commentTotal">
            <h4 align="left">评论列表（{{ commentTotal }}条）</h4>
            <div v-for="(commentData, index) in commentData" :key="commentData">
              <div class="align_center">
                <!-- 一级头像 -->
                <div
                  style="margin-right: 10px; display: flex; align-items: center"
                >
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
                    <b
                      style="font-size: 12px; color: red"
                      class="el-icon-medal-1"
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
                        style="color: #000000"
                        @click="reply(commentData.id, index)"
                      >
                        回复
                      </div>
                      <div
                        style="color: #000000; margin-left: 8px"
                        v-if="commentData.clickState == 0"
                        @click="click(commentData.id, index)"
                      >
                        <div class="align_center">
                          <img
                            class="comment_click_icon"
                            src="../../assets/icon/praise.png"
                          />点赞({{ commentData.clickNum }})
                        </div>
                      </div>
                      <div
                        type="text"
                        icon="el-icon-thumb"
                        style="color: blue"
                        v-else
                        @click="click(commentData.id, index)"
                      >
                        取消（{{ commentData.clickNum }}）
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
              <div v-if="commentData.total !== 0" style="margin-left: 70px">
                <div v-if="!commentData.openAndClose">
                  <el-button
                    type="text"
                    style="color: black"
                    @click="open(index)"
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
                        style="
                          margin-right: 10px;
                          display: flex;
                          align-items: center;
                        "
                      >
                        <el-avatar
                          :size="50"
                          :src="children.avatar"
                          @error="true"
                        >
                          <img
                            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                          />
                        </el-avatar>
                      </div>
                      <!-- 二级内容 -->
                      <div style="width: 100%">
                        <div v-if="children.userNameByReply === null">
                          <div v-if="blog.userId !== children.userId">
                            <b style="font-size: 14px">{{
                              children.userName
                            }}</b>
                          </div>
                          <div v-else>
                            <b style="font-size: 14px"
                              >{{ children.userName }}
                            </b>
                            <b
                              style="
                                font-size: 12px;
                                margin-left: 10px;
                                color: red;
                              "
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
                            <b style="font-size: 14px">{{
                              children.userName
                            }}</b>
                            <b style="color: #87ceeb; margin-left: 10px"
                              >回复</b
                            >
                            <b
                              v-if="blog.userId !== children.beCommentedUserId"
                            >
                              <b style="font-size: 14px; margin-left: 10px">{{
                                children.userNameByReply
                              }}</b>
                            </b>
                            <b v-else>
                              <b style="font-size: 14px; margin-left: 10px"
                                >{{ children.userNameByReply }}
                              </b>
                              <b
                                style="
                                  font-size: 12px;
                                  margin-left: 10px;
                                  color: red;
                                "
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
                            <b
                              style="
                                font-size: 12px;
                                margin-left: 10px;
                                color: red;
                              "
                              >作者【</b
                            >
                            <b
                              style="font-size: 12px; color: red"
                              class="el-icon-medal-1"
                              >优质打工人】</b
                            >
                            <b style="color: #87ceeb; margin-left: 10px"
                              >回复</b
                            >
                            <b
                              v-if="blog.userId !== children.beCommentedUserId"
                            >
                              <b style="margin-left: 10px">{{
                                children.userNameByReply
                              }}</b>
                            </b>
                            <b v-else>
                              <b style="font-size: 14px; margin-left: 10px"
                                >{{ children.userNameByReply }}
                              </b>
                              <b
                                style="
                                  font-size: 12px;
                                  margin-left: 10px;
                                  color: red;
                                "
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
                              style="color: #000000"
                              @click="replyUser(children)"
                            >
                              回复
                            </div>
                            <div
                              style="color: #000000; margin-left: 8px"
                              v-if="children.clickState == 0"
                              @click="childrenClick(children)"
                            >
                              <div class="align_center">
                                <img
                                  class="comment_click_icon"
                                  src="../../assets/icon/praise.png"
                                />点赞({{ children.clickNum }})
                              </div>
                            </div>
                            <div
                              style="color: blue"
                              v-else
                              @click="childrenClick(children)"
                            >
                              取消（{{ children.clickNum }}）
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="children.replyUser" style="margin-left: 60px">
                      <el-form
                        :inline="true"
                        :model="form"
                        class="demo-form-inline"
                      >
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
                    type="text"
                    style="color: black"
                    @click="close(index)"
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
      </el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { post } from "@/http/axios";
import { useRoute } from "vue-router";
import myMessage from "@/utils/common";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    const route = useRoute();
    const state = reactive({
      blog: {
        id: "",
        userId: "GSG1",
        userName: "帅刚",
        isOriginality: 0,
        oldUserName: "moumou",
        oldTime: "2023-05-06 11:00:00",
        statement: "suibaian g",
        oldLink: "https://shuaigang.top/blog",
        avatar:
          "https://shuaigang.top/gsg/static-resource/formal/2/20220730/1659166634126-3559486829291024.jpg",
        img: "https://unsplash.it/800/450?image=249",
        readNum: 1053,
        clickNum: 23,
        tags: [
          { type: "", name: "服务器" },
          { type: "success", name: "Java" },
          { type: "info", name: "Java" },
          { type: "warning", name: "Java" },
          { type: "danger", name: "原创" },
        ],
        content:
          '<blockquote>\n<p> 我知道，网上关于这类部署的教程已经写烂了，但是部分教程的内容只仅限于某个步骤，最近有些看了我博客项目的人也来问我这个问题。因此记录一下部署的详细步骤。</p>\n</blockquote>\n<p>@<a href="目录" target="_blank">TOC</a></p>\n<h1 id="一购买服务器">一、购买服务器</h1>\n<p> 链接: <a href="https://developer.aliyun.com/adc/student/?source=5176.11533457&amp;userCode=7u8kgd7u&amp;type=copy" target="_blank">阿里云学生机</a>，没有买过服务器的可以点击左边链接，现在是可以免费领取两个月2核4g的服务器，如果要用ELk的建议用这种，系统选centos的就行了，其他选项看个人喜欢选择。</p>\n<h2 id="11-配置防火墙">1.1 配置防火墙</h2>\n<p> 各位应该都知道某些应用是有固定端口的像是mysql：3306、redis：6379等，在服务器防火墙面板中记得进行配置，后续根据自己需要开放指定的端口。\n</p>\n<h1 id="二安装基本应用">二、安装基本应用</h1>\n<h2 id="21-安装docker">2.1 安装docker</h2>\n<p>用远程面板连上服务器后，输入以下命令即可。</p>\n<blockquote>\n<ul>\n<li>yum 包更新到最新\n<strong>yum update</strong>\n安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的\nyum install -y yum-utils device-mapper-persistent-data lvm2</li>\n<li>设置yum源\n<strong>yum-config-manager --add-repo</strong> <strong>https://download.docker.com/linux/centos/docker-ce.repo</strong></li>\n<li>安装docker，出现输入的界面都按 y\n<strong>yum install -y docker-ce</strong></li>\n<li>查看docker版本，验证是否验证成功\n<strong>docker -v</strong></li>\n<li>使用阿里云docker镜像\n<strong>sudo mkdir -p /etc/docker\nsudo tee /etc/docker/daemon.json &lt;&lt;-\'EOF\'\n{\n&quot;registry-mirrors&quot;: [&quot;https://y5krm9wr.mirror.aliyuncs.com&quot;]\n}\nEOF\nsudo systemctl daemon-reload\nsudo systemctl restart docker</strong></li>\n</ul>\n</blockquote>\n<h2 id="22-部署jdk">2.2 部署jdk</h2>\n<p>网上下载linux的jdk1.8的包，网上找资源即可，下完以后丢到服务器自己创建的文件夹上。</p>\n<pre><code class="language-java">mkdir /usr/local/java/\n</code></pre>\n<p>\n传完后到传的目录下解压缩文件 tar -zxvf jdk-8u211-linux-x64.tar.gz</p>\n<pre><code class="language-java">vi /etc/profile //编辑配置文件：\n</code></pre>\n<p>profile配置变量</p>\n<pre><code class="language-java">\texport JAVA_HOME=/usr/local/java/jdk1.8.0_251\n\texport JRE_HOME=${JAVA_HOME}/jre\n\texport CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib\n\texport PATH=${JAVA_HOME}/bin:$PATH\n\n</code></pre>\n<p>\n生效环境变量：</p>\n<pre><code class="language-java">source /etc/profile\n</code></pre>\n<p>java -version\n</p>\n<h2 id="22-安装mysql">2.2 安装mysql</h2>\n<p>拉取镜像</p>\n<pre><code class="language-java">docker pull mysql:5.7.32\n</code></pre>\n<p>成功后，启动容器</p>\n<pre><code class="language-java">docker run -d --name fjl_mysql -p 3306:3306 -e \nMYSQL_ROOT_PASSWORD=123456 mysql:5.7.32\n</code></pre>\n<p>此时用navicat即可连接上云服务器上的mysql</p>\n<h2 id="23-安装redis">2.3 安装redis</h2>\n<p>同mysql</p>\n<pre><code class="language-java">docker pull redis:5.0\n</code></pre>\n<pre><code class="language-java">docker run -it -d -p 6379:6379 --name fjl_redis redis:5.0\n</code></pre>\n<h2 id="24-安装elk">2.4 安装ELK</h2>\n<p>请看我这篇文章https://blog.csdn.net/Dlihctcefrep/article/details/114641093</p>\n<h2 id="24-安装nginx">2.4 安装nginx</h2>\n<p>同上，一样用docker拉取镜像，</p>\n<p>项目怎么来的就不说了，你会发现你项目里少了两个东西，一个是Dockerfile,另一个是dist。\nDockerfile没有的话好办，直接创建一个</p>\n<pre><code class="language-java">vi Dockerfile\n</code></pre>\n<p>进去过后填入下面的内容</p>\n<pre><code class="language-java">FROM nginx:latest\nMAINTAINER xx\nCOPY dist/ /usr/share/nginx/html/           \n</code></pre>\n<p>在Dockerfile的目录下执行</p>\n<pre><code class="language-java">    docker build -t xxx .\n</code></pre>\n<p>run自己的镜像写自己的容器名就好了</p>\n<pre><code class="language-java">docker run -d --name xx -p 80:80 xxx\n</code></pre>\n<p>此时，前端服务器已经配置完成</p>\n<h1 id="三运行项目">三、运行项目</h1>\n<blockquote>\n<p>maven把项目打成jar包我就不想多说了，然后把jar包拉到服务器上，到jar包目录下</p>\n</blockquote>\n<pre><code class="language-java">nohup java -jar jar包名 &amp;\n\nexit\n</code></pre>\n<p>此时，整个项目就部署完成</p>\n',
        title:
          "怎么部署前后端分离Springboot+vue项目到云服务器(CentOS7.3)上，从购买到部署完成详细教学！",
        gmtCreate: "2023-05-08 11:00:00",
      },
      // 评论数据
      commentTotal: 0,
      commentData: [
        {
          id: "",
          clickNum: 0,
          openAndClose: false,
          reply: false,
          avatar: "",
          userId: "GSG1",
          userName: "shauigang",
          content: "dasdas",
          clickState: 0,
          gmtCreate: "2023-02-02 00:12:33",
          children: [
            {
              clickNum: 0,
              replyUser: false,
              userId: "GSG1",
              userName: "dasda",
              avatar: "",
              beCommentedUserId: "GSG10",
              userNameByReply: "1233",
              content: "dasdadasdasds",
              gmtCreate: "2023-02-02 00:12:33",
              clickState: 0,
            },
            {
              clickNum: 0,
              replyUser: false,
              userId: "GSG1",
              userName: "dasda",
              avatar: "",
              beCommentedUserId: "GSG10",
              userNameByReply: "1233",
              content: "dasdadasdasds",
              gmtCreate: "2023-02-02 00:12:33",
              clickState: 0,
            },
          ],
        },
      ],
      // 用户登录数据
      user: {
        id: "",
        avatar: "",
        userName: "",
      },
      // 新增评论
      insertData: {
        userId: "",
        content: "",
        parentId: "",
        blogId: "",
      },
      // 评论回复
      form: {
        userId: "",
        content: "",
        parentId: "",
        blogId: "",
      },
      // 点赞
      updateData: {
        id: "",
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
      // 点赞
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
      console.log(route.query.id);
      if (!route.query.id) {
        myMessage("获取博客数据失败，请联系管理员！", "警告", 2, null, null);
        // return;
      }
      state.commentData = [];
      //   state.commentTotal = 10;
      //   state.commentData.push(state.commentData[0]);
    });
    // 请求
    const request = {
      getList() {
        // 请求体数据
        const data = {};
        // post请求
        post("/gsg/user/getAllUser", data).then((res: any) => {
          console.log(res);
          let { message, customData } = res;
        });
      },
      insertComment() {
        console.log(state.insertData);
      },
      delete(id) {
        console.log(id);
      },
      update(id, clickNum) {
        console.log(id, clickNum);
      },
      addReply() {
        console.log(state.form);
      },
    };
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style>
.body_img {
  background-image: url(../../assets/background/hmbb/2.jpg);
}
.cover {
  height: 60vh !important;
}
.blog_body {
  background-color: #f2f6fc;
  min-height: 20vh;
  min-width: 370px;
  padding: 10vh 22vw;
}
.my_el_card {
  background-color: #f2f3f5;
}
.blog_top {
  height: 100%;
  display: flex;
  align-items: center;
}
.blog_img {
  border-radius: 1%;
  width: 100%;
  height: 100%;
}
.blog_avatar {
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
}
.blog_userName {
  margin-left: 0.4vw;
  color: #4183c4;
}
.blog_info {
  margin-left: 1vw;
  color: #00000066;
  display: flex;
  align-items: center;
}
.blog_info_content {
  margin-left: 0.4vw;
}
.blog_icon {
  width: 1.2vw;
  height: 1.2vw;
}

.blog_tag {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.blog_tag_info {
  margin-left: 0.5vw;
}
.blog_title {
  text-align: center;
  border: none;
  margin: calc(2rem - 0.142857em) 0px 1rem;
  padding: 0px;
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 700;
  line-height: 1.28571em;
  text-transform: none;
  color: rgba(0, 0, 0, 0.87);
}
.html_content {
  padding: 3vh 4vw;
}
.html_content blockquote {
  position: relative;
  color: #999;
  font-weight: 400;
  border-left: 1px solid #1abc9c;
  padding-left: 1em;
  margin: 1em 3em 1em 2em;
}
.html_content h1 {
  font-size: 2em;
}
.html_content h2 {
  font-size: 1.8em;
}
.html_content h3 {
  font-size: 1.6em;
}
.html_content h4 {
  font-size: 1.4em;
}
.html_content h5 {
  font-size: 1.2em;
}
.html_content h6 {
  font-size: 1em;
}
.html_content h1,
.html_content h2,
.html_content h3,
.html_content h4,
.html_content h5,
.html_content h6 {
  font-family: PingFang SC, Verdana, Helvetica Neue, Microsoft Yahei,
    Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
  font-weight: 100;
  color: #000;
  line-height: 1.35;
}
.html_content p {
  font-size: 16px;
  font-weight: 300;
  line-height: 1.8;
  text-align: justify;
}
.html_content a {
  color: #1abc9c;
}
.html_content b,
.html_content strong {
  font-weight: 700;
  color: #000;
}
.html_content ul {
  padding-left: 1.3em;
  list-style: disc;
}
.html_content pre {
  background: #f8f8f8;
  border: 1px solid #ddd;
  padding: 1em 1.5em;
  display: block;
  -webkit-overflow-scrolling: touch;
}

.add_click_num {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box_info {
  margin: 3vh -20px;
  padding: 20px;
  background-color: #fcfff5;
  color: #2c662d;
  box-shadow: rgb(163, 194, 147) 0px 0px 0px 1px inset,
    transparent 0px 0px 0px 0px;
}
.box_content {
  margin: 5px 0;
}

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
