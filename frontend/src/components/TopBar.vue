<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";

const title = ref("")
router.beforeResolve((to, from, next) => {
  title.value = to.meta.title + ""
  next()
})
</script>

<template>
  <el-page-header content="Frp管理面板" :icon="null" :title="title" />
</template>

<style scoped>

</style>