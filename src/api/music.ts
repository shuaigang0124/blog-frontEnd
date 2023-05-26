import { get } from "@/http/axios"
let baseUrl = "/wyy"

// APlayer歌曲信息
export class Audio {
    // 音频艺术家
    author: String;
    // 音频名称
    title: String;
    // 音频链接
    url: String;
    // 音频封面
    pic: String;
    // 歌词
    lrc: String;

    constructor(
        author: String,
        title: String,
        url: String,
        pic: String,
        lrc: String
    ) {
        this.author = author;
        this.title = title;
        this.url = url;
        this.pic = pic;
        this.lrc = lrc;
    }
}
// 获取初始化播放列表
export function getAudioList(param) {
    return get("https://api.i-meto.com/meting/api", param);
}

// 添加单曲到播放列表：id/author/title/pic
export async function addOnePlayList(param) {
    let lrc = "";
    let url = null;
    await getSongUrl({ id: param.id }).then((res: any) => {
        if (res.code === 200) {
            url = res.data[0].url;
        }
    });
    await getLrc({ id: param.id }).then((res: any) => {
        if (res.code === 200) {
            lrc = res.lrc.lyric;
        }
    });
    if (url) {
        let music = new Audio(
            param.author,
            param.title,
            url,
            param.pic,
            lrc
        );
        localStorage.setItem("audio", JSON.stringify(music));
    }
}

// 获取歌词：id
export function getLrc(param) {
    return get(baseUrl + "/lyric", param);
}
// 获取歌曲详情：ids
export function getSongDetail(param) {
    return get(baseUrl + "/song/detail", param);
}
// 获取歌曲url：id
export function getSongUrl(param) {
    return get(baseUrl + "/song/url", param);
}

// 搜索歌曲
export function search(param) {
    return get(baseUrl + "/search", param);
}

// 获取轮播图
export function getBanners(param) {
    return get(baseUrl + "/banner", param);
}
// 获取推荐歌单
export function getPalylist(param) {
    return get(baseUrl + "/personalized", param);
}
// 获取最新音乐
export function getNewSongList(param) {
    return get(baseUrl + "/personalized/newsong", param);
}
// 获取最新mv
export function getMvList(param) {
    return get(baseUrl + "/personalized/mv", param);
}

// 获取精品歌单
export function getHighquality(param) {
    return get(baseUrl + "/top/playlist/highquality", param);
}
// 获取推荐歌单
export function getTopPlayList(param) {
    return get(baseUrl + "/top/playlist", param);
}

// 获取100首最新音乐
export function getTopSong(param) {
    return get(baseUrl + "/top/song", param);
}

// 获取全部mv
export function getMvAllList(param) {
    return get(baseUrl + "/mv/all", param);
}