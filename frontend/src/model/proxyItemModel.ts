export interface ProxyItemModel {
    user?: string,
    name?: string,
    conf?: {
        name?: string,
        type?: string,
        transport?: {
            bandwidthLimit?: string,
            bandwidthLimitMode?: string
        },
        loadBalancer?: {
            group?: string
        },
        healthCheck?: {
            type?: string,
            intervalSeconds?: number
        },
        localIP?: string,
        plugin?: null,
        remotePort?: number
    },
    clientVersion?: string,
    todayTrafficIn?: number,
    todayTrafficOut?: number,
    curConns?: number,
    lastStartTime?: string,
    lastCloseTime?: string,
    status?: string
}