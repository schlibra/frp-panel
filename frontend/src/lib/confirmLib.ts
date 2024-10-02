import {ElMessageBox} from "element-plus";
import l from "@/lib/languageLib";
import type {ConfirmCallbackModel} from "@/model/confirmCallbackModel";

function confirm(message: string, title: string, action: ConfirmCallbackModel) {
    ElMessageBox.confirm(message, title, {
        type: "info",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
    }).then(_action => {
        console.log(_action)
        if (_action === "confirm" && action.confirm) action.confirm()
        if (_action === "cancel" && action.cancel) action.cancel()
        if (_action === "close" && action.close) action.close()
    }).catch(_action => {
        if (_action === "cancel" && action.cancel) action.cancel()
        if (_action === "close" && action.close) action.close()
    })
}

export default confirm