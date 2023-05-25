import myMessage from "@/utils/common";
import axios from "axios";
import { Base64 } from "js-base64";

const instance = axios.create({
    timeout: 20000,
    responseType: 'json'
})

let codes = {
    SUCCESS: 200,
    CODE_NOT_FOUND: 404,
    ERROR_PARAMS: 4004,
    CODE_ERROR: 500,
    TOKEN_IS_EXPIRED: 4006,
    UNAUTHORIZED: 4001
}
// 添加响应拦截器
instance.interceptors.response.use(

    response => {
        const responseData = response.data
        if (response.config.method === 'get') {
            // get请求不做响应拦截处理
            return responseData;
        }
        if (responseData.data) {
            let { code, message } = JSON.parse(Base64.decode(response.data.data));
            if (!code) {
                return responseData;
            }
            switch (code) {
                // token失效
                case codes.TOKEN_IS_EXPIRED:
                    let userId = sessionStorage.getItem("shuaigangOVO");
                    if (userId) {
                        post("/authentication/generateToken", { userId }).then((res: any) => {
                            if (res.code === codes.SUCCESS && res.data.Authorization) {
                                sessionStorage.setItem("shuaigangOVO", res.data.Authorization)
                            }
                        })
                    } else {
                        sessionStorage.clear();
                    }
                    break
                // 未认证
                case codes.UNAUTHORIZED:
                    sessionStorage.clear();
                    break
            }
            // if (code !== codes.SUCCESS) {
            //     myMessage(null, message, 2, null, null);
            // }
        }
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
                if (res.data) {
                    // console.log(Base64.decode(res.data))
                    // console.log(JSON.parse(Base64.decode(res.data)))
                    resolve(JSON.parse(Base64.decode(res.data)));
                }
            })
            .catch(err =>
                reject(err));
    })

}

const get = async (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
        instance
            .get(`${url}`, { params })
            .then(res => {
                // console.log(res)
                if (res) {
                    resolve(res);
                }
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

// export default post
export { post, get }