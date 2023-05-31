import { get } from "@/http/axios"
import myMessage from "@/utils/common";
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

// 添加歌曲到播放列表：id/author/title/pic
export async function addPlayList(list) {
    let audio = [];
    let urlIsHave = 0;
    for (let i = 0; i < list.length; i++) {
        let param = list[i];
        let lrc = "";
        let url = null;
        let data = { id: param.id }
        await getSongUrl(data).then((res: any) => {
            if (res.code === 200) {
                url = res.data[0].url;
            }
        });
        if (!param.pic) {
            await getSongDetail({ ids: param.id }).then((res: any) => {
                param.pic = res.songs[0].al.picUrl;
            })
        }
        if (url) {
            await getLrc(data).then((res: any) => {
                if (res.code === 200) {
                    lrc = res.lrc.lyric;
                }
            });
            audio.push(new Audio(
                param.author,
                param.title,
                url,
                param.pic,
                lrc
            ));
        } else {
            urlIsHave += 1;
        }
    }
    if (urlIsHave > 0) {
        myMessage(urlIsHave + "首歌曲资源未找到！请尝试搜索歌名查找其他资源。", null, 1, null, null);
    }
    if (audio.length > 0) {
        localStorage.setItem("audio", JSON.stringify(audio));
    }
}
// 替换当前播放列表：id/author/title/pic
export async function exchangePlayList(list) {
    let audioList = [];
    let urlIsHave = 0;
    for (let i = 0; i < list.length; i++) {
        let param = list[i];
        let lrc = "";
        let url = null;
        let data = { id: param.id }
        await getSongUrl(data).then((res: any) => {
            if (res.code === 200) {
                url = res.data[0].url;
            }
        });
        if (!param.pic) {
            await getSongDetail({ ids: param.id }).then((res: any) => {
                param.pic = res.songs[0].al.picUrl;
            })
        }
        if (url) {
            await getLrc(data).then((res: any) => {
                if (res.code === 200) {
                    lrc = res.lrc.lyric;
                }
            });
            audioList.push(new Audio(
                param.author,
                param.title,
                url,
                param.pic,
                lrc
            ));
        } else {
            urlIsHave += 1;
        }
    }
    if (urlIsHave > 0) {
        myMessage(urlIsHave + "首歌曲资源未找到！请尝试搜索歌名查找其他资源。", null, 1, null, null);
    }
    if (audioList.length > 0) {
        // console.log(audioList);
        localStorage.setItem("audioList", JSON.stringify(audioList));
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
// 获取歌单详情
export function getPalylistDetail(param) {
    return get(baseUrl + "/playlist/detail", param);
}
// 获取歌单评论
export function getPalylistComments(param) {
    return get(baseUrl + "/comment/playlist", param);
}

// 获取100首最新音乐
export function getTopSong(param) {
    return get(baseUrl + "/top/song", param);
}

// 获取全部mv
export function getMvAllList(param) {
    return get(baseUrl + "/mv/all", param);
}
// 获取mv详情:mvid
export function getMvDetail(param) {
    return get(baseUrl + "/mv/detail", param);
}
// 获取mv-url:id
export function getMvUrl(param) {
    return get(baseUrl + "/mv/url", param);
}
// 获取mv相关推荐:mvid
export function getMvs(param) {
    return get(baseUrl + "/simi/mv", param);
}
// 获取mv评论:id、limit、offset
export function getMvComment(param) {
    return get(baseUrl + "/comment/mv", param);
}