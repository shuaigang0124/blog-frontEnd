import { post } from "@/http/axios"

// 获取留言列表
export function getMsg(param) {
    return post("/msg/getMsg", param);
}
// 新增留言
export function insertMsg(param) {
    return post("/msg/insertMsg", param);
}