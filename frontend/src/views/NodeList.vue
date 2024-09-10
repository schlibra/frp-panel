<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";
import {request} from "@/lib/request";
import type {NodeItemModel} from "@/model/nodeItemModel";
import {goto} from "@/lib/gotoLib";
const list: Ref<NodeItemModel[]> = ref([])
const mainLoading = ref(true)
onMounted(()=>{
  request.getNodeList({
    ok(_, data: NodeItemModel[]) {
      list.value = data
    },
    bad(res) {
      console.log(res)
    },
    error(err) {
      console.log(err)
    },
    then() {
      mainLoading.value = false
    }
  })
})
</script>

<template>
  <h2>节点列表</h2>
  <el-table :data="list" v-loading="mainLoading">
    <el-table-column label="节点ID" prop="id" sortable />
    <el-table-column label="节点名称" prop="name" sortable />
    <el-table-column label="节点地址" prop="host" sortable />
    <el-table-column label="节点状态" sortable
                     :filters="[{text: '在线', value: 'online'}, {text: '离线', value: 'offline'}]"
                     :filter-method="(value: string, row: NodeItemModel) => row.status === value">
      <template #default="{ row }">
        <el-tag type="success" v-if="row.status === 'online'">在线</el-tag>
        <el-tag type="danger" v-else-if="row.status === 'offline'">离线</el-tag>
        <el-tag type="warning" v-else>异常</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" prop="create" sortable />
    <el-table-column label="修改时间" prop="update" sortable />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button @click="goto.nodeDetail(row.id)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>