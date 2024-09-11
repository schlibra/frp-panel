<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from "@/components/TopBar.vue";
import SideBar from "@/components/SideBar.vue";
import {onMounted} from "vue";
import {useNodeStore} from "@/stores/useNodeStore";
const nodeStore = useNodeStore()
onMounted(() => {
  nodeStore.getNodeList().then(()=>{
    console.log(nodeStore.nodeList)
  })
})
</script>

<template>
  <el-container>
    <el-aside>
      <SideBar />
    </el-aside>
    <el-container>
      <el-header>
        <TopBar />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.el-aside {
  width: 200px !important;
  height: calc(100vh - 16px) !important;
  .el-menu {
    height: 100% !important;
  }
}
.el-header {
  height: 30px !important;
}
.el-main {
  padding-top: 0 !important;
}
</style>
