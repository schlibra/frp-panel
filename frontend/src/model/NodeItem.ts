export interface NodeItem {
    "id"?: number,
    "name"?: string,
    "host"?: string,
    "port"?: number,
    "ssl"?: string,
    "user"?: string,
    "pass"?: string,
    "create"?: string,
    "update"?: string,
    "status"?: string,
    "version"?: string,
    "bindPort"?: string,
    "vhostHTTPPort"?: string,
    "vhostHTTPSPort"?: string,
    "tcpmuxHTTPConnectPort"?: string,
    "kcpBindPort"?: string,
    "quicBindPort"?: string,
    "subdomainHost"?: string,
    "maxPoolCount"?: string,
    "maxPortsPerClient"?: string,
    "heartbeatTimeout"?: string,
    "totalTrafficIn"?: string,
    "totalTrafficOut"?: string,
    "curConns"?: string,
    "clientCounts"?: string,
    "proxyTypeCount"?: {
        "tcp"?: 6
    }
}