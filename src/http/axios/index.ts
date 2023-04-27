import axios from "axios";
import { Base64 } from "js-base64";

const instance = axios.create({
    timeout: 20000,
    responseType: 'json'
})

let codes = {
    CODE_SUCCESS: 200,
    CODE_NOT_FOUND: 404,
    CODE_ERROR: 500,
    CODE_ERROR_PARAMETER: 500,
    CODE_NET_ERROR: 500,
    CODE_NGINX_ERROR: 500
}
// 添加响应拦截器
instance.interceptors.response.use(

    response => {
        const responseData = response.data
        // const ERRCOR_CODE = responseData.code

        // switch (ERRCOR_CODE) {
        //     case codes.CODE_SUCCESS:
        //         // 返回的数据
        //         return responseData
        // }
        return responseData
    },
)


let baseUrl = ""
if (process.env.NODE_ENV === 'production') {
    // 生产环境
    baseUrl = "/gsg"
} else {
    // 本地环境
    baseUrl = "/api/gsg"
}

const post = async (url: string, param?: any) => {
    let token = await getToken()
    let userInfo = await getUserInfo()
    let paramData = {
        // encryption_type: "base64",
        data: Base64.encode(JSON.stringify(param !== null ? param : {})),
    }
    return new Promise((resolve, reject) => {
        instance
            .post(`${baseUrl}${url}`, paramData, {
                headers: {
                    "Authorization": token || '',
                    // "userInfo": userInfo || '',
                }
            })
            .then(res => {
                // console.log(Base64.decode(res.data))
                resolve(JSON.parse(Base64.decode(res.data)));
            })
            .catch(err =>
                reject(err));
    })

}
const getToken = () => {
    return sessionStorage.getItem('token')
}
const getUserInfo = () => {
    return sessionStorage.getItem('userInfo')
}

export default post