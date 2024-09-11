<?php

namespace app\controller;

use app\BaseController;
use app\model\Node;
use app\Request;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\response\Json;
use WpOrg\Requests\Exception;
use WpOrg\Requests\Requests;

class Api extends BaseController
{
    public function getNodeList(): Json
    {
        try {
            $result = (new Node)->select();
        } catch (DataNotFoundException|ModelNotFoundException|DbException $e) {
            return jb(500, $e->getMessage());
        }
        if ($result->isEmpty()) {
            return jb(msg: "数据不存在");
        } else {
            foreach ($result as $key => $value) {
                $item = $result[$key];
                if ($item->enable === "Y") {
                    $data = request("get", "/api/serverinfo", $item);
                    if ($data->status) {
                        $item->status = "online";
                        $item = array_merge($item->toArray(), $data->data);
                        $all = 0;
                        foreach (["http", "https", "stcp", "sudp", "tcp", "tcpmux", "udp"] as $type) {
                            if (isset($item["proxyTypeCount"][$type])) {
                                $all += $item["proxyTypeCount"][$type];
                            } else {
                                $item["proxyTypeCount"][$type] = 0;
                            }
                        }
                        $item["proxyTypeCount"]["all"] = $all;
                    } else {
                        $item->status = "offline";
                        $item["proxyTypeCount"] = [];
                    }
                } else {
                    $item->status = "disabled";
                    $item["proxyTypeCount"] = [];
                }
                unset($item["user"]);
                unset($item["pass"]);
                $result[$key] = $item;
            }
            return jb(data: $result);
        }
    }
    public function getProxyList($id, $type): Json {
        $result = (new Node)->where("id", $id)->findOrEmpty();
        if ($result->isEmpty()) {
            return jb(404, "节点不存在");
        } else {
            $data = request("get", "/api/proxy/$type", $result);
            if ($data->status) {
                $data = $data->data["proxies"];
                $user = [];
                foreach ($data as &$item) {
                    $_ = explode(".", $item["name"]);
                    $_user = $_[0];
                    $item["name"] = $_[1];
                    $item["user"] = $_user;
                    $user[$_user] = "";
                }
                return jb(data: [
                    "data" => $data,
                    "user" => array_keys($user)
                ]);
            } else {
                return jb(500, $data->msg);
            }
        }
    }
    public function getAllProxy() {
        $result = (new Node)->select();
        $list = [];
        $user = [];
        foreach ($result as $item) {
            if ($item->enable === "Y") {
                foreach (["tcp", "udp", "http", "https", "tcpmux", "stcp", "sudp"] as $type) {
                    $data = request("get", "/api/proxy/$type", $item);
                    if ($data->status) {
                        $data = $data->data["proxies"];
                        foreach ($data as $_item) {
                            $_ = explode(".", $_item["name"]);
                            $_item["user"] = $_[0];
                            $user[$_[0]] = "";
                            $_item["name"] = $_[1];
                            $_item["nodeId"] = $item->id;
                            $_item["nodeName"] = $item->name;
                            $list[] = $_item;
                        }
                    }
                }
            }
        }
        return jb(data: [
            "data" => $list,
            "user" => array_keys($user)
        ]);
    }
}