import axios from "axios";
import type {AxiosCallbackModel} from "@/model/axiosCallbackModel";

export const Axios = {
    get(url: string, params: object, callback: AxiosCallbackModel) {
        const list = []
        for (const [key, value] of Object.entries(params)) {
            list.push(`${key}=${value}`);
        }
        axios.get(url+list.join("&")).then((res) => {
            if (res.data.code === 200) {
                if (callback.ok) {
                    callback.ok(res, res.data.data)
                }
            } else {
                if (callback.bad) {
                    callback.bad(res)
                }
            }
            if (callback.then) {
                callback.then()
            }
        }).catch((err) => {
            if (callback.error) {
                callback.error(err)
            }
            if (callback.then) {
                callback.then()
            }
        })
    },
    delete(url: string, params: object, callback: AxiosCallbackModel) {
        const list = []
        for (const [key, value] of Object.entries(params)) {
            list.push(`${key}=${value}`);
        }
        axios.get(url+list.join("&")).then((res) => {
            if (res.data.code === 200) {
                if (callback.ok) {
                    callback.ok(res, res.data.data)
                }
            } else {
                if (callback.bad) {
                    callback.bad(res)
                }
            }
            if (callback.then) {
                callback.then()
            }
        }).catch((err) => {
            if (callback.error) {
                callback.error(err)
            }
            if (callback.then) {
                callback.then()
            }
        })
    }
}