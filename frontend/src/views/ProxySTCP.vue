<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, onMounted, type Ref, ref} from "vue";
import {request} from "@/lib/request";
import type {ProxyItemModel} from "@/model/proxyItemModel";
import type {ProxyResponseModel} from "@/model/proxyResponseModel";
import {useNodeStore} from "@/stores/useNodeStore";
import {goto} from "@/lib/gotoLib";

const route = useRoute()
// @ts-ignore
let id = parseInt(route.params.id)
const selectedId = ref(id)
const nodeStore = useNodeStore()
const nodeDetail = computed(()=>nodeStore.nodeList.filter(item=>item.id===selectedId.value)[0])
const proxy: Ref<ProxyItemModel[]> = ref([])
const users: Ref<any[]> = ref([])
onMounted(()=>{
  getList()
})
function getDetail() {
  goto.proxyList(selectedId.value, "stcp")
  getList()
}
function getList() {
  nodeStore.nodeListLoading = true
  console.log(selectedId.value)
  request.getProxy(selectedId.value, "stcp", {
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
  <h2>STCP映射列表</h2>
  <el-form label-position="top">
    <el-row :gutter="16">
      <el-col :span="8">
        <el-form-item label="节点名称">
          <el-select v-model="selectedId" @change="getDetail">
            <el-option label="请选择节点" value="0" disabled />
            <el-option v-for="item in nodeStore.nodeList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.status==='disabled'" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="节点地址">
          <el-text type="primary" v-if="nodeDetail">{{ nodeDetail.host }}</el-text>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="清理离线映射">
          <el-button type="danger" @click="request.deleteProxy(id)">清理</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="映射列表">
      <el-table :data="proxy" max-height="calc(100vh - 270px)">
        <el-table-column label="映射名称" prop="name" sortable />
        <el-table-column label="映射用户" prop="user" sortable :filters="users" :filter-method="(user: string, row: ProxyItemModel) => row.user === user" />
        <el-table-column label="映射状态" :filters="[{text: '在线', value: 'online'}, {text: '离线', value: 'offline'}]" :filter-method="(status: string, row: ProxyItemModel) => row.status === status">
          <template #default="{ row }">
            <el-tag v-if="row.status === 'online'" type="success">在线</el-tag>
            <el-tag v-else-if="row.status === 'offline'" type="danger">离线</el-tag>
            <el-text v-else>-</el-text>
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