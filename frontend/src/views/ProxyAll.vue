<script setup lang="ts">
import {computed, onMounted, type Ref, ref} from "vue";
import {request} from "@/lib/request";
import type {ProxyItemModel} from "@/model/proxyItemModel";
import type {ProxyResponseModel} from "@/model/proxyResponseModel";
import {useNodeStore} from "@/stores/useNodeStore";

const nodeStore = useNodeStore()
const proxy: Ref<ProxyItemModel[]> = ref([])
const users: Ref<any[]> = ref([])
const nodeFilter = computed(()=>nodeStore.nodeList.map(item=>{
  return {
    text: item.name,
    value: item.id
  }
}))
onMounted(()=>{
  getList()
})
function getList() {
  nodeStore.nodeListLoading = true

  request.getAllProxy( {
    ok(_, data: ProxyResponseModel) {
      proxy.value = data.data
      users.value = data.user.map(item => {
        return {
          value: item,
          text: item
        }
      })
    },
    bad() {
      proxy.value = []
      users.value = []
    },
    then() {
      nodeStore.nodeListLoading = false
    }
  })
}
</script>

<template>
  <h2>全部映射列表</h2>
  <el-form label-position="top">
    <el-form-item label="映射列表">
      <el-table :data="proxy" max-height="calc(100vh - 190px)">
        <el-table-column label="映射名称" prop="name" sortable />
        <el-table-column label="映射用户" prop="user" sortable :filters="users" :filter-method="(user: string, row: ProxyItemModel) => row.user === user" />
        <el-table-column label="映射状态" :filters="[{text: '在线', value: 'online'}, {text: '离线', value: 'offline'}]" :filter-method="(status: string, row: ProxyItemModel) => row.status === status">
          <template #default="{ row }">
            <el-tag v-if="row.status === 'online'" type="success">在线</el-tag>
            <el-tag v-else-if="row.status === 'offline'" type="danger">离线</el-tag>
            <el-text v-else>-</el-text>
          </template>
        </el-table-column>
        <el-table-column label="映射节点" prop="nodeId" :filters="nodeFilter" :filter-method="(nodeId: number, row: ProxyItemModel)=>row.nodeId===nodeId">
          <template #default="{ row }">
            <el-text>{{ row.nodeName }}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="映射类型">
          <template #default="{ row }">
            <el-text>{{ row.conf ? row.conf.type : "-" }}</el-text>
          </template>
        </el-table-column>
        <el-table-column label="上线时间" prop="lastStartTime" sortable>
          <template #default="{ row }">
            <span>{{ row.lastStartTime ? "2024-"+row.lastStartTime: "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="离线时间" prop="lastCloseTime" sortable>
          <template #default="{ row }">
            <span>{{ row.status === "offline" ? "2024-"+row.lastCloseTime: "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="本地IP">
          <template #default="{ row }">
            <span>{{ row.conf ? row.conf.localIP : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="远程端口">
          <template #default="{ row }">
            <span>{{ row.conf ? row.conf.remotePort : "-" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户端版本" prop="clientVersion" sortable>
          <template #default="{ row }">
            <span>{{ row.clientVersion ?? "-" }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>