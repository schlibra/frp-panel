import router from "@/router";

function jump(url: string) {
    router.push(url).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    })
}

export const goto = {
    reload() {
      location.reload()
    },
    home() {
        jump("/")
    },
    nodeList() {
        jump("/node")
    },
    nodeDetail(id: number) {
        jump(`/node/${id}`)
    },
    proxyList(id: number, type: string) {
        jump(`/node/${id}/${type}`)
    }
}