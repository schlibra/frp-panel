import {defineStore} from "pinia";
import {type Ref, ref} from "vue";
import type {NodeItemModel} from "@/model/nodeItemModel";
import {request} from "@/lib/request";
import {alertError, alertWarning} from "@/lib/alertLib";
import {goto} from "@/lib/gotoLib";

export const useNodeStore = defineStore('node', ()=>{
    const nodeList: Ref<NodeItemModel[]> = ref([])
    const nodeListLoading = ref(false)
    function getNodeList() {
        return new Promise((resolve)=>{
            nodeListLoading.value = true
            request.getNodeList({
                ok(_, data) {
                    nodeList.value = data
                },
                bad(res) {
                    alertWarning(res, "请求失败", goto.reload)
                },
                error(err) {
                    alertError(err, "请求异常", goto.reload)
                },
                then() {
                    nodeListLoading.value = false
                    resolve(true)
                }
            })
        })
    }
    return {
        nodeList,
        nodeListLoading,
        getNodeList
    }
})