import { post } from "@/http/axios"

// 获取用户详情信息
export function getUserDetails(param) {
    return post("/user/getUserDetails", param);
}
// 新增用户
export function insertUser(param) {
    return post("/user/insertUser", param);
}
// 登录
export function login(param) {
    return post("/authentication/form", param);
}