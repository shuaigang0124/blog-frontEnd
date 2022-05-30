import axios from "axios";

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
    baseUrl = "/meiqi"
} else {
    // 本地环境
    baseUrl = "/api/meiqi"
}

const post = async (url: string, param?: any) => {
    let token = await getToken()
    let userInfo = await getUserInfo()
    return new Promise((resolve, reject) => {
        instance
            .post(`${baseUrl}${url}`, param, {
                headers: {
                    "Authorization": token || '',
                    "userInfo": userInfo || '',
                }
            })
            .then(res => {
                resolve(res);
            })
            .catch(err =>
                reject(err));
    })

}
const getToken = () => {
    return localStorage.getItem('token')
}
const getUserInfo = () => {
    return localStorage.getItem('userInfo')
}

export default post