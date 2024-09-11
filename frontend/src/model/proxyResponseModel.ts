import type {ProxyItemModel} from "@/model/proxyItemModel";

export interface ProxyResponseModel {
    data: ProxyItemModel[],
    user: string[]
}