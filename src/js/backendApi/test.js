import post from "../../http/axios/index";

const api = {
    getList() {
        // 请求体数据
        const data = {
            data: {},
        };
        // post请求
        post("/admin/user/getTest", data).then((res, any) => {
            console.log(res);
            return res;
        });
    }
};



export default api