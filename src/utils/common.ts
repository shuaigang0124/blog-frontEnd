import { ElNotification } from "element-plus"

const myMessage = (title: string, message: string, tt: number) => {
    ElNotification({
        title,
        type: tt === 0 ? 'success' : tt === 1 ? 'warning' : tt === 2 ? 'error' : '',
        message,
        showClose: true,
        duration: 2000,
        offset: 50
    });
}

export default myMessage
