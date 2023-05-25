<template>
  <div ref="playerRef"></div>
</template>

<script lang="ts">
import APlayer from "aplayer";
import "../../css/APlayer.min.css";
import type { PropType } from "@vue/runtime-core";
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";
import { get } from "@/http/axios";

export default defineComponent({
  props: {
    // 开启吸底模式
    fixed: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    // 开启迷你模式
    mini: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    // 音频自动播放
    autoplay: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    // 主题色
    theme: {
      type: String as PropType<string>,
      default: "rgba(255,255,255,0.2)",
    },
    // 音频循环播放
    loop: {
      type: String as PropType<"all" | "one" | "none">,
      default: "all",
    },
    // 音频循环顺序
    order: {
      type: String as PropType<"list" | "random">,
      default: "random",
    },
    // 预加载
    preload: {
      type: String as PropType<"auto" | "metadata" | "none">,
      default: "auto",
    },
    // 默认音量
    volume: {
      type: Number as PropType<number>,
      default: 0.7,
      validator: (value: Number) => {
        return value >= 0 && value <= 1;
      },
    },
    // 歌曲服务器(netease-网易云, tencent-qq音乐, kugou-酷狗, xiami-小米音乐, baidu-百度音乐)
    songServer: {
      type: String as PropType<
        "netease" | "tencent" | "kugou" | "xiami" | "baidu"
      >,
      default: "netease",
    },
    // 播放类型(song-歌曲, playlist-播放列表, album-专辑, search-搜索, artist-艺术家)
    songType: {
      type: String as PropType<string>,
      default: "playlist",
    },
    // 歌的id
    songId: {
      type: String as PropType<string>,
      default: "19723756",
    },
    // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    mutex: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    // 传递歌词方式
    lrcType: {
      type: Number as PropType<number>,
      default: 3,
    },
    // 列表是否默认折叠
    listFolded: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    // 列表最大高度
    listMaxHeight: {
      type: String as PropType<string>,
      default: "263px",
    },
    // 存储播放器设置的 localStorage key
    storageName: {
      type: String as PropType<string>,
      default: "aplayer-setting",
    },
  },
  setup(props: any) {
    const playerRef = ref();
    let instance: APlayer;
    const state = reactive({
      audioList: [],
    });

    // APlayer歌曲信息
    class Audio {
      // 音频艺术家
      artist: String;
      // 音频名称
      name: String;
      // 音频链接
      url: String;
      // 音频封面
      cover: String;
      // 歌词
      lrc: String;

      constructor(
        artist: String,
        name: String,
        url: String,
        cover: String,
        lrc: String
      ) {
        this.artist = artist;
        this.name = name;
        this.url = url;
        this.cover = cover;
        this.lrc = lrc;
      }
    }
    const methods = {
      changeInstance() {
        instance = new APlayer({
          container: playerRef.value,
          fixed: props.fixed,
          mini: props.mini,
          autoplay: props.autoplay,
          theme: props.theme,
          loop: props.loop,
          order: props.order,
          preload: props.preload,
          volume: props.volume,
          mutex: props.mutex,
          lrcType: props.lrcType,
          listFolded: props.listFolded,
          listMaxHeight: props.listMaxHeight,
          storageName: props.storageName,
          audio: state.audioList,
        });
      },
      watchLocalStorage() {
        // 监听localStorage.setItem
        window.addEventListener("setItemEvent", (e: any) => {
          if (e.key === "audioList") {
            state.audioList = JSON.parse(e.newValue).map(
              (value: any) =>
                new Audio(
                  // 歌手
                  value.author,
                  // 歌名
                  value.title,
                  // 播放地址
                  value.url,
                  // 图片地址
                  value.pic,
                  // 歌词地址
                  value.lrc
                )
            );
            methods.changeInstance();
          }
        });
      },
    };

    // 初始化
    onMounted(() => {
      methods.watchLocalStorage();
      nextTick(() => {
        get(
          `https://api.i-meto.com/meting/api?server=${props.songServer}&type=${
            props.songType
          }&id=${props.songId}&r=${Math.random()}`
        ).then((res: any) => {
          localStorage.setItem("audioList", JSON.stringify(res));
        });
      });
    });
    // 销毁
    onBeforeUnmount(() => {
      instance.destroy();
    });
    return { Audio, ...toRefs(state), instance, playerRef, ...methods };
  },
});
</script>
