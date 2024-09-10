import {Axios} from "@/lib/axiosLib";
import {api} from "@/api/api";
import type {AxiosCallbackModel} from "@/model/axiosCallbackModel";


export const request = {
    getNodeList(callback: AxiosCallbackModel) {
        Axios.get(api.common.nodeList, [], callback)
    },
    getNodeDetail(id: number, callback: AxiosCallbackModel) {
        Axios.get(`${api.common.nodeDetail}/${id}`, [], callback)
    }
}