import { get } from "@/http/axios"
let baseUrl = "/wyy"

// 搜索歌曲
export function search(param) {
    return get(baseUrl + "/search", param);
}

// 获取歌词
export function getLrc(param) {
    return get(baseUrl + "/lyric", param);
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