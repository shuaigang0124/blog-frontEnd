import { post } from "@/http/axios"

// 发送聊天消息
export function sendMsg(param) {
    return post("/chat/sendMsg", param);
}
// 获取聊天消息列表
export function getChatList(param) {
    return post("/chat/getChatList", param);
}