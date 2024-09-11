<script setup lang="ts">
import { useRoute } from "vue-router";
import {computed, onMounted, type Ref, ref} from "vue";
import {goto} from "@/lib/gotoLib";
import {useNodeStore} from "@/stores/useNodeStore";
import {DrawProxyChart, DrawTrafficChart} from "@/lib/chart";
const route = useRoute()
// @ts-ignore
const selectedId: Ref<number> = ref(parseInt(route.params.id))
const nodeDetail = computed(() => {
  return nodeStore.nodeList.filter(node => node.id === selectedId.value)[0]
})
const nodeStore = useNodeStore()
onMounted(()=> {
  getDetail()
  DrawTrafficChart('traffic', nodeDetail.value.totalTrafficIn ?? 0, nodeDetail.value.totalTrafficOut ?? 0)
  DrawProxyChart('proxies', nodeDetail.value)
})
function getDetail() {
  goto.nodeDetail(selectedId.value)
}
function traffic(count: number|undefined) {
  if (typeof count === "number") {
    let ext = ["B", "KB", "MB", "GB", "TB"]
    let index = 0
    while (count >= 1024) {
      count = Math.round(count / 1024)
      index += 1
    }
    return `${count}${ext[index]}`
  } else {
    return "-"
  }
}
function port(port: number|undefined) {
  return typeof port === "number" ?
      port === 0 ? "-" : port :
      "-"
}
function gotoList(type: string) {
  goto.proxyList(selectedId.value, type)
}
</script>

<template>
  <el-form label-position="top" v-loading="nodeStore.nodeListLoading">
    <h2>节点详情</h2>
    <el-form-item label="选择节点">
      <el-select v-model="selectedId" @change="getDetail">
        <el-option label="选择一个节点" value="0" disabled />
        <el-option v-for="item in nodeStore.nodeList" :key="item.id" :label="item.name" :value="item.id" :disabled="item.status==='disabled'" />
      </el-select>
    </el-form-item>
    <el-form-item label="节点详情">
      <el-descriptions border size="large" :column="5">
        <el-descriptions-item label="节点id">{{ nodeDetail.id ?? "-" }}</el-descriptions-item>
        <el-descriptions-item label="节点名称">{{ nodeDetail.name ?? "-" }}</el-descriptions-item>
        <el-descriptions-item label="节点地址">{{ nodeDetail.host ?? "-" }}</el-descriptions-item>
        <el-descriptions-item label="节点状态">
          <el-tag type="success" v-if="nodeDetail.status === 'online'">在线</el-tag>
          <el-tag type="danger" v-else-if="nodeDetail.status === 'offline'">离线</el-tag>
          <el-text v-else>-</el-text>
        </el-descriptions-item>
        <el-descriptions-item label="节点版本">{{ nodeDetail.version ?? "-" }}</el-descriptions-item>
        <el-descriptions-item label="绑定端口">{{ nodeDetail.bindPort ?? "-" }}</el-descriptions-item>
        <el-descriptions-item label="客户端数量">{{ nodeDetail.clientCounts ?? "-" }}</el-descriptions-item>
        <el-descriptions-item label="映射数量">{{ nodeDetail.proxyTypeCount.all ?? "-"}}</el-descriptions-item>
        <el-descriptions-item label="入站流量">{{ traffic(nodeDetail.totalTrafficIn) }}</el-descriptions-item>
        <el-descriptions-item label="出站流量">{{ traffic(nodeDetail.totalTrafficOut) }}</el-descriptions-item>
        <el-descriptions-item label="TCP映射数量">
          <el-space direction="horizontal">
            <el-text>{{ nodeDetail.proxyTypeCount.tcp ?? "-" }}</el-text>
            <el-button v-if="nodeDetail.proxyTypeCount.tcp" type="primary" @click="gotoList('tcp')">查看</el-button>
          </el-space>
        </el-descriptions-item>
        <el-descriptions-item label="UDP映射数量">
          <el-space direction="horizontal">
            <el-text>{{ nodeDetail.proxyTypeCount.udp ?? "-" }}</el-text>
            <el-button v-if="nodeDetail.proxyTypeCount.udp" type="primary" @click="gotoList('udp')">查看</el-button>
          </el-space>
        </el-descriptions-item>
        <el-descriptions-item label="HTTP映射数量">
          <el-space direction="horizontal">
            <el-text>{{ nodeDetail.proxyTypeCount.http ?? "-" }}</el-text>
            <el-button v-if="nodeDetail.proxyTypeCount.http" type="primary" @click="gotoList('http')">查看</el-button>
          </el-space>
        </el-descriptions-item>
        <el-descriptions-item label="HTTPS映射数量">
          <el-space direction="horizontal">
            <el-text>{{ nodeDetail.proxyTypeCount.https ?? "-" }}</el-text>
            <el-button v-if="nodeDetail.proxyTypeCount.https" type="primary" @click="gotoList('https')">查看</el-button>
          </el-space>
        </el-descriptions-item>
        <el-descriptions-item label="TCPMUX映射数量">
          <el-space direction="horizontal">
            <el-text>{{ nodeDetail.proxyTypeCount.tcpmux ?? "-" }}</el-text>
            <el-button v-if="nodeDetail.proxyTypeCount.tcpmux" type="primary" @click="gotoList('tcpmux')">查看</el-button>
          </el-space>
        </el-descriptions-item>
        <el-descriptions-item label="STCP映射数量">
          <el-space direction="horizontal">
            <el-text>{{ nodeDetail.proxyTypeCount.stcp ?? "-" }}</el-text>
            <el-button v-if="nodeDetail.proxyTypeCount.stcp" type="primary" @click="gotoList('stcp')">查看</el-button>
          </el-space>
        </el-descriptions-item>
        <el-descriptions-item label="TCP映射数量">
          <el-space direction="horizontal">
            <el-text>{{ nodeDetail.proxyTypeCount.sudp ?? "-" }}</el-text>
            <el-button v-if="nodeDetail.proxyTypeCount.sudp" type="primary" @click="gotoList('sudp')">查看</el-button>
          </el-space>
        </el-descriptions-item>
        <el-descriptions-item label="HTTP端口">{{ port(nodeDetail.vhostHTTPPort) }}</el-descriptions-item>
        <el-descriptions-item label="HTTPS端口">{{ port(nodeDetail.vhostHTTPSPort) }}</el-descriptions-item>
        <el-descriptions-item label="TCPMUX端口">{{ port(nodeDetail.tcpmuxHTTPConnectPort) }}</el-descriptions-item>
      </el-descriptions>
    </el-form-item>
    <el-form-item label="节点状态">
      <el-row>
        <el-col :span="12">
          <div
              id="traffic"
              style="width: 400px; height: 250px; margin-bottom: 30px"
          ></div>
        </el-col>
        <el-col :span="12">
          <div id="proxies" style="width: 400px; height: 250px"></div>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>