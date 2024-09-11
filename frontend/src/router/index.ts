import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import NodeList from "@/views/NodeList.vue";
import NodeDetail from "@/views/NodeDetail.vue";
import ProxyTCP from "@/views/ProxyTCP.vue";
import ProxyUDP from "@/views/ProxyUDP.vue";
import ProxyHTTP from "@/views/ProxyHTTP.vue";
import ProxyHTTPS from "@/views/ProxyHTTPS.vue";
import ProxyTCPMUX from "@/views/ProxyTCPMUX.vue";
import ProxySTCP from "@/views/ProxySTCP.vue";
import ProxySUDP from "@/views/ProxySUDP.vue";
import ProxyAll from "@/views/ProxyAll.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' }
    },
    {
      path: '/node',
      name: 'nodeList',
      component: NodeList,
      meta: { title: '节点列表' }
    },
    {
      path: '/node/all',
      name: 'allProxy',
      component: ProxyAll,
      meta: { title: '全部映射' }
    },
    {
      path: '/node/:id',
      name: 'nodeDetail',
      component: NodeDetail,
      meta: { title: '节点详情' }
    },
    {
      path: '/node/:id/tcp',
      name: 'proxyTcp',
      component: ProxyTCP,
      meta: { title: 'TCP映射列表' }
    },
    {
      path: '/node/:id/udp',
      name: 'proxyUdp',
      component: ProxyUDP,
      meta: { title: 'UDP映射列表' }
    },
    {
      path: '/node/:id/http',
      name: 'proxyHttp',
      component: ProxyHTTP,
      meta: { title: 'HTTP映射列表' }
    },
    {
      path: '/node/:id/https',
      name: 'proxyHttps',
      component: ProxyHTTPS,
      meta: { title: 'HTTPS映射列表' }
    },
    {
      path: '/node/:id/tcpmux',
      name: 'proxyTcpmux',
      component: ProxyTCPMUX,
      meta: { title: 'TCPMUX映射列表' }
    },
    {
      path: '/node/:id/stcp',
      name: 'proxyStcp',
      component: ProxySTCP,
      meta: { title: 'STCP映射列表' }
    },
    {
      path: '/node/:id/sudp',
      name: 'proxySudp',
      component: ProxySUDP,
      meta: { title: 'SUDP映射列表' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title+""
  next()
})
export default router
