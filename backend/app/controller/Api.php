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

/**
 * Class Api
 * @package app\controller
 */
class Api extends BaseController
{
    public function getNodeList(): Json
{
    try {
        $result = (new Node)->select();
        if ($result->isEmpty()) {
            return jb(msg: "数据不存在");
        }

        foreach ($result as $key => $item) {
            $item->status = "disabled";
            $item["proxyTypeCount"] = [];

            if ($item->enable === "Y") {
                $data = request("get", "/api/serverinfo", $item);

                if ($data->status) {
                    $item->status = "online";
                    $item = array_merge($item->toArray(), $data->data);
                    $item["proxyTypeCount"] = array_fill_keys(
                        ["http", "https", "stcp", "sudp", "tcp", "tcpmux", "udp"],
                        0
                    );

                    foreach ($item["proxyTypeCount"] as $type => &$count) {
                        $count = $data->data["proxyTypeCount"][$type] ?? 0; // 使用空合并运算符
                    }
                    $item["proxyTypeCount"]["all"] = array_sum($item["proxyTypeCount"]);
                } else {
                    $item->status = "offline";
                }
            }

            unset($item["user"], $item["pass"]); // 使用一次性unset
            $result[$key] = $item;
        }

        return jb(data: $result);
    } catch (DataNotFoundException | ModelNotFoundException | DbException $e) {
        return jb(500, "数据库错误: " . $e->getMessage());
    } catch (\Exception $e) {
        return jb(500, "未知错误: " . $e->getMessage());
    }
}


    /**
     * 获取代理列表
     *
     * @param int $id 节点ID
     * @param string $type 代理类型
     * @return Json 返回代理列表的JSON
     * @throws \Exception
     */
    public function getProxyList(int $id, string $type): Json
{
    try {
        $result = (new Node)->where("id", $id)->findOrEmpty();
        if ($result->isEmpty()) {
            return jb(404, "节点不存在");
        }

        $data = request("get", "/api/proxy/$type", $result);
        if (!$data->status) {
            return jb(500, "获取代理数据失败: " . $data->msg);
        }

        $proxies = $data->data["proxies"];
        $user = [];
        foreach ($proxies as &$item) {
            if (str_contains($item["name"], ".")) { // 确保有用户名和节点名
                [$item["user"], $item["name"]] = explode(".", $item["name"], 2);
                $user[$item["user"]] = "";
            }
        }

        return jb(data: [
            "data" => $proxies,
            "user" => array_keys($user)
        ]);
    } catch (\Exception $e) {
        return jb(500, "处理代理列表时发生错误: " . $e->getMessage());
    }
}


    /**
     * 获取所有代理的方法
     *
     * @return Json
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getAllProxy(): Json
    {
        try {
            $result = (new Node)->where('enable', 'Y')->select(); // 仅选择启用的节点
            $list = [];
            $user = [];

            foreach ($result as $item) {
                foreach (["tcp", "udp", "http", "https", "tcpmux", "stcp", "sudp"] as $type) {
                    $data = request("get", "/api/proxy/$type", $item);
                    if ($data->status) {
                        foreach ($data->data["proxies"] as $_item) {
                            $_ = explode(".", $_item["name"]);
                            if (count($_) > 1) { // 确保有用户名和节点名
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
        } catch (Exception $e) {
            return jb(500, "获取代理列表失败: " . $e->getMessage());
        }
    }
    public function serverAuth(Request $request): Json{
        $username = $request->post("username");
        $secret = $request->post("secret");
        if ($username === "test" && $secret === "test") {
            return jb(200, "验证成功");
        } else {
            return jb(401, "验证失败");
        }
    }
}