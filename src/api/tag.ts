import {post} from "@/http/axios";

// 获取标签列表
export function getTagList(param) {
    return post("/tag/getList", param);
}