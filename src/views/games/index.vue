<template>
  <div class="types">
    <div class="body_style">
      <div class="body_img"></div>
    </div>
    <div class="cover">
      <div class="info">
        <div class="games_title">游戏在线玩</div>
        <div class="games">
          <div class="games_list">
            <div class="games_info" v-for="games in gamesList" :key="games">
              <div class="games_item" @click="playGame(games.router)">
                <el-image class="game_img" :src="games.img">
                  <template #error>
                    <img class="game_img" src="../../assets/error.png" />
                  </template>
                </el-image>
                <div class="game_msg">{{ games.msg }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
export default defineComponent({
  name: "",
  components: {},
  props: {},
  setup() {
    const state = reactive({
      gamesList: [
        {
          img: "https://shuaigang.top/gsg/static-resource/formal/backgroundImg/games/stick.webp",
          msg: "小飞棍来咯！",
          router: "/html/stick.html",
        },
        {
          img: "https://shuaigang.top/gsg/static-resource/formal/backgroundImg/games/plane.webp",
          msg: "飞船保卫战",
          router: "/html/plane.html",
        },
        {
          img: "https://shuaigang.top/gsg/static-resource/formal/backgroundImg/games/brick.webp",
          msg: "2D打砖块",
          router: "/html/brick.html",
        },
        {
          img: "https://shuaigang.top/gsg/static-resource/formal/backgroundImg/games/spaceship.webp",
          msg: "飞机大战",
          router: "/html/spaceship.html",
        },
        {
          img: "https://shuaigang.top/gsg/static-resource/formal/backgroundImg/games/SinuousWorld.webp",
          msg: "Sinuous World",
          router: "/html/SinuousWorld.html",
        },
      ],
    });
    const methods = {
      playGame(e) {
        window.open(e, "_blank");
      },
    };
    onMounted(() => {});
    return { ...methods, ...toRefs(state) };
  },
});
</script>
<style scoped>
.body_img {
  background-image: url(https://shuaigang.top/gsg/static-resource/formal/backgroundImg/wb01.webp);
}

.games_title {
  font-size: 2rem;
}
.games {
  margin-top: 2vh;
  width: 60vw;
  min-height: 40vh;
}
.games_list {
  display: flex;
  flex-wrap: wrap;
}
.games_info {
  margin-right: 2vw;
}
.games_item {
  width: 12vw;
  margin-top: 2vh;
  text-align: center;
  color: #337ab7;
  background-color: #ffffff;
  border-radius: 5px;
}
.game_img {
  padding: 10px 10px;
}
.game_msg {
  padding-bottom: 10px;
}
</style>
