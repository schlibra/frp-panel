import router from "@/router";

function jump(url: string) {
    router.push(url).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    })
}

export const goto = {
    home() {
        jump("/")
    },
    nodeList() {
        jump("/nodeList")
    },
    nodeDetail(id: number) {
        jump(   `/nodeDetail/${id}`)
    }
}