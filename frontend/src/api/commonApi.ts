const baseUrl = "/api"
export const commonApi = {
    nodeList: baseUrl + "/node",
    proxyList: (id: number, type: string) => baseUrl + `/node/${id}/${type}`,
    proxyAll: baseUrl + "/node/all"
}