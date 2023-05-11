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
            <el-avatar
              :size="40"
              :src="'https://shuaigang.top' + blog.avatar"
              @error="true"
            >
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
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
            :type="
              item.type === 0
                ? 'info'
                : item.type === 1
                ? 'success'
                : item.type === 2
                ? 'warning'
                : item.type === 3
                ? 'danger'
                : ''
            "
            v-for="item in blog.tags"
            :key="item"
          >
            {{ item.name }}
          </el-tag>
          <el-tag
            class="blog_tag_info"
            :type="blog.isOriginality === 0 ? 'danger' : ''"
            >{{ blog.isOriginality === 0 ? "原创" : "转载" }}</el-tag
          >
        </div>
        <h2 class="blog_title">{{ blog.title }}</h2>
        <div class="html_content" v-html="blog.content" />
        <div class="add_click_num">
          <el-button plain round type="danger" @click="clickBlog"
            >赞赏</el-button
          >
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
        <Comment :v-bind:blog="blog" />
      </el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { post } from "@/http/axios";
import { useRoute } from "vue-router";
import myMessage from "@/utils/common";
import Comment from "@/views/blog/comment.vue";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  components: {
    Comment,
  },
  props: {},
  setup() {
    const route = useRoute();
    const state = reactive({
      blog: {
        id: "",
        userId: "",
        userName: "",
        isOriginality: 0,
        oldUserName: "",
        oldTime: "",
        statement: "",
        oldLink: "",
        avatar: "",
        img: "",
        readNum: 0,
        clickNum: 0,
        tags: [],
        content: "",
        title: "数据获取异常！",
        gmtCreate: "",
      },
      blog2: {
        id: "ATC202305090001",
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
          { type: 4, name: "服务器" },
          { type: 3, name: "Linux" },
          { type: 1, name: "Java" },
          { type: 0, name: "部署" },
          { type: 2, name: "Vue" },
        ],
        content:
          '<blockquote>\n<p> 我知道，网上关于这类部署的教程已经写烂了，但是部分教程的内容只仅限于某个步骤，最近有些看了我博客项目的人也来问我这个问题。因此记录一下部署的详细步骤。</p>\n</blockquote>\n<p>@<a href="目录" target="_blank">TOC</a></p>\n<h1 id="一购买服务器">一、购买服务器</h1>\n<p> 链接: <a href="https://developer.aliyun.com/adc/student/?source=5176.11533457&amp;userCode=7u8kgd7u&amp;type=copy" target="_blank">阿里云学生机</a>，没有买过服务器的可以点击左边链接，现在是可以免费领取两个月2核4g的服务器，如果要用ELk的建议用这种，系统选centos的就行了，其他选项看个人喜欢选择。</p>\n<h2 id="11-配置防火墙">1.1 配置防火墙</h2>\n<p> 各位应该都知道某些应用是有固定端口的像是mysql：3306、redis：6379等，在服务器防火墙面板中记得进行配置，后续根据自己需要开放指定的端口。\n</p>\n<h1 id="二安装基本应用">二、安装基本应用</h1>\n<h2 id="21-安装docker">2.1 安装docker</h2>\n<p>用远程面板连上服务器后，输入以下命令即可。</p>\n<blockquote>\n<ul>\n<li>yum 包更新到最新\n<strong>yum update</strong>\n安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的\nyum install -y yum-utils device-mapper-persistent-data lvm2</li>\n<li>设置yum源\n<strong>yum-config-manager --add-repo</strong> <strong>https://download.docker.com/linux/centos/docker-ce.repo</strong></li>\n<li>安装docker，出现输入的界面都按 y\n<strong>yum install -y docker-ce</strong></li>\n<li>查看docker版本，验证是否验证成功\n<strong>docker -v</strong></li>\n<li>使用阿里云docker镜像\n<strong>sudo mkdir -p /etc/docker\nsudo tee /etc/docker/daemon.json &lt;&lt;-\'EOF\'\n{\n&quot;registry-mirrors&quot;: [&quot;https://y5krm9wr.mirror.aliyuncs.com&quot;]\n}\nEOF\nsudo systemctl daemon-reload\nsudo systemctl restart docker</strong></li>\n</ul>\n</blockquote>\n<h2 id="22-部署jdk">2.2 部署jdk</h2>\n<p>网上下载linux的jdk1.8的包，网上找资源即可，下完以后丢到服务器自己创建的文件夹上。</p>\n<pre><code class="language-java">mkdir /usr/local/java/\n</code></pre>\n<p>\n传完后到传的目录下解压缩文件 tar -zxvf jdk-8u211-linux-x64.tar.gz</p>\n<pre><code class="language-java">vi /etc/profile //编辑配置文件：\n</code></pre>\n<p>profile配置变量</p>\n<pre><code class="language-java">\texport JAVA_HOME=/usr/local/java/jdk1.8.0_251\n\texport JRE_HOME=${JAVA_HOME}/jre\n\texport CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib\n\texport PATH=${JAVA_HOME}/bin:$PATH\n\n</code></pre>\n<p>\n生效环境变量：</p>\n<pre><code class="language-java">source /etc/profile\n</code></pre>\n<p>java -version\n</p>\n<h2 id="22-安装mysql">2.2 安装mysql</h2>\n<p>拉取镜像</p>\n<pre><code class="language-java">docker pull mysql:5.7.32\n</code></pre>\n<p>成功后，启动容器</p>\n<pre><code class="language-java">docker run -d --name fjl_mysql -p 3306:3306 -e \nMYSQL_ROOT_PASSWORD=123456 mysql:5.7.32\n</code></pre>\n<p>此时用navicat即可连接上云服务器上的mysql</p>\n<h2 id="23-安装redis">2.3 安装redis</h2>\n<p>同mysql</p>\n<pre><code class="language-java">docker pull redis:5.0\n</code></pre>\n<pre><code class="language-java">docker run -it -d -p 6379:6379 --name fjl_redis redis:5.0\n</code></pre>\n<h2 id="24-安装elk">2.4 安装ELK</h2>\n<p>请看我这篇文章https://blog.csdn.net/Dlihctcefrep/article/details/114641093</p>\n<h2 id="24-安装nginx">2.4 安装nginx</h2>\n<p>同上，一样用docker拉取镜像，</p>\n<p>项目怎么来的就不说了，你会发现你项目里少了两个东西，一个是Dockerfile,另一个是dist。\nDockerfile没有的话好办，直接创建一个</p>\n<pre><code class="language-java">vi Dockerfile\n</code></pre>\n<p>进去过后填入下面的内容</p>\n<pre><code class="language-java">FROM nginx:latest\nMAINTAINER xx\nCOPY dist/ /usr/share/nginx/html/           \n</code></pre>\n<p>在Dockerfile的目录下执行</p>\n<pre><code class="language-java">    docker build -t xxx .\n</code></pre>\n<p>run自己的镜像写自己的容器名就好了</p>\n<pre><code class="language-java">docker run -d --name xx -p 80:80 xxx\n</code></pre>\n<p>此时，前端服务器已经配置完成</p>\n<h1 id="三运行项目">三、运行项目</h1>\n<blockquote>\n<p>maven把项目打成jar包我就不想多说了，然后把jar包拉到服务器上，到jar包目录下</p>\n</blockquote>\n<pre><code class="language-java">nohup java -jar jar包名 &amp;\n\nexit\n</code></pre>\n<p>此时，整个项目就部署完成</p>\n',
        title:
          "怎么部署前后端分离Springboot+vue项目到云服务器(CentOS7.3)上，从购买到部署完成详细教学！",
        gmtCreate: "2023-05-08 11:00:00",
      },
    });
    // 方法体
    const methods = {
      clickBlog() {},
    };
    onMounted(() => {
      if (!route.query.id) {
        myMessage("获取博客数据失败，路由参数未携带！", "警告", 2, null, null);
        return;
      }
      request.getBlog();
    });
    // 请求
    const request = {
      getBlog() {
        post("/article/getById", { id: route.query.id }).then((res: any) => {
          let { code, data } = res;
          if (code == 200) {
            state.blog = data;
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
</style>
