import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import NodeList from "@/views/NodeList.vue";
import NodeDetail from "@/views/NodeDetail.vue";

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
      path: '/nodeList',
      name: 'nodeList',
      component: NodeList,
      meta: { title: '节点列表' }
    },
    {
      path: '/nodeDetail/:id',
      name: 'nodeDetail',
      component: NodeDetail,
      meta: { title: '节点详情' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title+""
  next()
})
export default router
