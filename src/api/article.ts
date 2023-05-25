import { post } from "@/http/axios"

// 获取文章列表
export function getArticleList(param) {
    return post("/article/getList", param);
}
// 通过标签id获取文章
export function getArticleByTagId(param) {
    return post("/article/getAtcByTagId", param);
}