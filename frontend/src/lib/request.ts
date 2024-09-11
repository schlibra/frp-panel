import {Axios} from "@/lib/axiosLib";
import {api} from "@/api/api";
import type {AxiosCallbackModel} from "@/model/axiosCallbackModel";


export const request = {
    getNodeList(callback: AxiosCallbackModel) {
        Axios.get(api.common.nodeList, [], callback)
    },
    getProxy(id: number, type: string, callback: AxiosCallbackModel) {
        Axios.get(api.common.proxyList(id, type), [], callback)
    },
    getAllProxy(callback: AxiosCallbackModel) {
        Axios.get(api.common.proxyAll, [], callback)
    }
}