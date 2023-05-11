import { ElNotification } from "element-plus"

const myMessage = (message: string, title: string, tt: number, d: number, p: any) => {
    setTimeout(() => {
        ElNotification({
            title: title === null ? '提示' : title,
            type: tt === 0 ? 'success' : tt === 1 ? 'warning' : tt === 2 ? 'error' : 'info',
            message,
            showClose: true,
            duration: d !== null ? d : 2000,
            offset: 50,
            dangerouslyUseHTMLString: true,
            position: p === 'BL' ? 'bottom-left' : p === 'BR' ? 'bottom-right' :
                p === 'TL' ? 'top-left' : 'top-right'
        });
    }, 1)
}

export default myMessage
