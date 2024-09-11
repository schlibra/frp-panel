import {ElMessageBox} from "element-plus";
import type {AxiosError, AxiosResponse} from "axios";

export function alertSuccess(msg: string | AxiosResponse = "", title: string = "操作成功", callback = () => {}) {
    ElMessageBox.alert(typeof msg === "string" ? msg : msg.data.msg, title, {
        type: "success"
    }).then(callback)
}

export function alertWarning(msg: string | AxiosResponse = "", title: string = "操作失败", callback = () => {}) {
    ElMessageBox.alert(typeof msg === "string" ? msg : msg.data.msg, title, {
        type: "warning"
    }).then(callback)
}

export function alertError(msg: string|AxiosError, title: string = "操作异常", callback = () => {}) {
    let message: string;
    console.log(msg)
    if (typeof msg === "string") {
        message = msg
    } else {
        if (msg.response) {
            message = msg.response.statusText
        } else {
            message = ""
        }
    }
    ElMessageBox.alert(message, title, {
        type: "error"
    }).then(callback)
}
