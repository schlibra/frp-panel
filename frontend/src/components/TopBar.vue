<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";
import {Loading} from "@element-plus/icons-vue";
import {useNodeStore} from "@/stores/useNodeStore";

const title = ref("")
const nodeStore = useNodeStore()
router.beforeResolve((to, from, next) => {
  title.value = to.meta.title + ""
  next()
})
</script>

<template>
  <el-page-header :icon="null" :title="title">
    <template #content>
      <el-space direction="horizontal">
        <span>Frp管理面板</span>
        <el-icon class="is-loading" v-if="nodeStore.nodeListLoading"><Loading /></el-icon>
      </el-space>
    </template>
  </el-page-header>
</template>

<style scoped>

</style>