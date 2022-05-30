import axios from "axios";

const MyHttpUtil = {};

MyHttpUtil.install = (Vue) => {
    Vue.prototype.$http = axios;
}

export default MyHttpUtil