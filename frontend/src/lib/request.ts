import {Axios} from "@/lib/axiosLib";
import {api} from "@/api/api";
import type {AxiosCallbackModel} from "@/model/axiosCallbackModel";
import confirmLib from "@/lib/confirmLib";
import {goto} from "@/lib/gotoLib";
import {alertError} from "@/lib/requestAlert";


export const request = {
    getNodeList(callback: AxiosCallbackModel) {
        Axios.get(api.common.nodeList, [], callback)
    },
    getProxy(id: number, type: string, callback: AxiosCallbackModel) {
        Axios.get(api.common.proxyList(id, type), [], callback)
    },
    getAllProxy(callback: AxiosCallbackModel) {
        Axios.get(api.common.proxyAll, [], callback)
    },
    deleteProxy(id: number) {
        confirmLib("是否删除离线映射？", "删除确认", {
            confirm() {
                Axios.delete(api.common.nodeItem(id), [], {
                    ok() {
                        goto.reload()
                    },
                    error(err) {
                        alertError(err, "删除失败", goto.reload)
                    }
                })
            }
        })

    }
}