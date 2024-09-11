<script setup lang="ts">
import {Cpu, Document, Grid, HomeFilled, List} from "@element-plus/icons-vue";
import {ref} from "vue";
import {goto} from "@/lib/gotoLib";
import router from "@/router";
import {useNodeStore} from "@/stores/useNodeStore";
import {useRoute} from "vue-router";
const path = ref(location.pathname);
const nodeStore = useNodeStore()
const route = useRoute()

router.beforeResolve(to => {
  let url = to.path
  if (url === "/") {
    path.value = "1"
  } else if (url === "/node") {
    path.value = "2"
  } else if (url === "/node/all"){
    path.value = "5"
  } else if (url.startsWith("/node/")) {
    if (url.endsWith("/tcp")) {
      path.value = "4-1"
    } else if (url.endsWith("/udp")) {
      path.value = "4-2"
    } else if (url.endsWith("/http")){
      path.value = "4-3"
    } else if (url.endsWith("/https")) {
      path.value = "4-4"
    } else if (url.endsWith("/tcpmux")){
      path.value = "4-5"
    } else if (url.endsWith("/stcp")) {
      path.value = "4-6"
    } else if (url.endsWith("/sudp")){
      path.value = "4-7"
    } else {
      path.value = "3"
    }
  }
  console.log(path.value)
})
function gotoDetail() {
  if (nodeStore.nodeList.length) {
    if (nodeStore.nodeList[0].id) {
      goto.nodeDetail(nodeStore.nodeList[0].id)
    }
  }
}
function gotoProxy(type: string) {
  let id: number = 0
  if (route.params.id) {
    // @ts-ignore
    id = parseInt(route.params.id)
  } else if (nodeStore.nodeList.length) {
    if (nodeStore.nodeList[0].id) {
      id = nodeStore.nodeList[0].id
    }
  }
  if (id > 0) {
    goto.proxyList(id, type)
  }
}
</script>

<template>
  <el-menu :default-active="path">
    <el-menu-item disabled>
      <h3>Frp管理面板</h3>
    </el-menu-item>
    <el-menu-item index="1" @click="goto.home">
      <el-icon><HomeFilled /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="2" @click="goto.nodeList">
      <el-icon><List /></el-icon>
      <span>节点列表</span>
    </el-menu-item>
    <el-menu-item index="3" @click="gotoDetail">
      <el-icon><Document /></el-icon>
      <span>节点详情</span>
    </el-menu-item>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><List /></el-icon>
        <span>映射列表</span>
      </template>
      <el-menu-item index="4-1" @click="gotoProxy('tcp')">
        <el-icon><Cpu /></el-icon>
        <span>TCP映射</span>
      </el-menu-item>
      <el-menu-item index="4-2" @click="gotoProxy('udp')">
        <el-icon><Cpu /></el-icon>
        <span>UDP映射</span>
      </el-menu-item>
      <el-menu-item index="4-3" @click="gotoProxy('http')">
        <el-icon><Cpu /></el-icon>
        <span>HTTP映射</span>
      </el-menu-item>
      <el-menu-item index="4-4" @click="gotoProxy('https')">
        <el-icon><Cpu /></el-icon>
        <span>HTTPS映射</span>
      </el-menu-item>
      <el-menu-item index="4-5" @click="gotoProxy('tcpmux')">
        <el-icon><Cpu /></el-icon>
        <span>TCPMUX映射</span>
      </el-menu-item>
      <el-menu-item index="4-6" @click="gotoProxy('stcp')">
        <el-icon><Cpu /></el-icon>
        <span>STCP映射</span>
      </el-menu-item>
      <el-menu-item index="4-7" @click="gotoProxy('sudp')">
        <el-icon><Cpu /></el-icon>
        <span>SUDP映射</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="5" @click="goto.proxyAll">
      <el-icon><Grid /></el-icon>
      <span>全部映射</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>