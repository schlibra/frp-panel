<script setup lang="ts">
import {Document, HomeFilled, List} from "@element-plus/icons-vue";
import {ref} from "vue";
import {goto} from "@/lib/gotoLib";
const path = ref(location.pathname);
</script>

<template>
  <el-menu :default-active="path">
    <el-menu-item disabled>
      <h3>Frp管理面板</h3>
    </el-menu-item>
    <el-menu-item index="/" @click="goto.home">
      <el-icon><HomeFilled /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/nodeList" @click="goto.nodeList">
      <el-icon><List /></el-icon>
      <span>节点列表</span>
    </el-menu-item>
    <el-menu-item index="/nodeDetail" @click="goto.nodeDetail(0)">
      <el-icon><Document /></el-icon>
      <span>节点详情</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>