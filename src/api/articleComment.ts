import { post } from "@/http/axios";

// 获取评论列表
export function getArticleCommentList(param) {
    return post("/articleComment/getList", param);
}
// 新增评论
export function insertArticleComment(param) {
    return post("/articleComment/insert", param);
}
// 删除评论
export function deleteArticleComment(param) {
    return post("/articleComment/delete", param);
}
// 点赞评论
export function kudosArticleComment(param) {
    return post("/articleComment/kudos", param);
}