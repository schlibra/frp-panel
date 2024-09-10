<script setup lang="ts">
import { useRoute } from "vue-router";
import {onMounted, type Ref, ref} from "vue";
import {request} from "@/lib/request";
import type {NodeItemModel} from "@/model/nodeItemModel";
import {goto} from "@/lib/gotoLib";
const route = useRoute()
// @ts-ignore
const selectedId: Ref<number> = ref(parseInt(route.params.id))
const mainLoading = ref(true)
const dataLoading = ref(false)
const nodeList: Ref<NodeItemModel[]> = ref([])
const nodeDetail: Ref<NodeItemModel> = ref({})
onMounted(()=> {
  mainLoading.value = true
  request.getNodeList({
    ok(_, data: NodeItemModel[]) {
      nodeList.value = data
    },
    then() {
      mainLoading.value = false
      getDetail()
    }
  })
})
function getDetail() {
  goto.nodeDetail(selectedId.value)
  dataLoading.value = true
  request.getNodeDetail(selectedId.value, {
    ok(_, data: NodeItemModel) {
      nodeDetail.value = data
    },
    then() {
      dataLoading.value = false
    }
  })
}
</script>

<template>
  <h2>节点详情</h2>
  <el-form label-position="top" v-loading="mainLoading">
    <el-form-item label="选择节点">
      <el-select v-model="selectedId" @change="getDetail">
        <el-option label="选择一个节点" value="0" disabled />
        <el-option v-for="item in nodeList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="节点详情">
      <el-descriptions v-loading="dataLoading" border>
        <el-descriptions-item label="节点id">{{ nodeDetail.id }}</el-descriptions-item>
        <el-descriptions-item label="节点名称">{{ nodeDetail.name }}</el-descriptions-item>
        <el-descriptions-item label="节点地址">{{ nodeDetail.host }}</el-descriptions-item>
        <el-descriptions-item label="节点状态">
          <el-tag type="success" v-if="nodeDetail.status === 'online'">在线</el-tag>
          <el-tag type="danger" v-else-if="nodeDetail.status === 'offline'">离线</el-tag>
          <el-tag type="warning" v-else>异常</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="节点版本">{{ nodeDetail.version }}</el-descriptions-item>
      </el-descriptions>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>