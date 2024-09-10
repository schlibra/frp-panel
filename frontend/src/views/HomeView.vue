<script setup lang="ts">
import {goto} from "@/lib/gotoLib.js";
</script>

<template>
  <h2>Frp管理面板</h2>
  <el-button type="primary" size="large" @click="goto.nodeList()">节点列表</el-button>
</template>

<style scoped lang="scss">

</style>