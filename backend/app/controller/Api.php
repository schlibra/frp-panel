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
                $data = request("get", "/api/serverinfo", $item);
                if ($data->status) {
                    $item->status = "online";
                    $item = array_merge($item->toArray(), $data->data);
                } else {
                    $item->status = "offline";
                }
                unset($item["user"]);
                unset($item["pass"]);
                $result[$key] = $item;
            }
            return jb(data: $result);
        }
    }
    public function getNodeDetail(Request$request, $id): Json
    {
        $result = (new Node)->where('id', $id)->findOrEmpty();
        if ($result->isEmpty()) {
            return jb(404, "节点不存在");
        }
        $res = request("get", "/api/serverinfo", $result);
        if ($res->status) {
            $result->status = "online";
            $result = array_merge($result->toArray(), $res->data);
            unset($result["user"]);
            unset($result["pass"]);
        } else {
            $result->status = "offline";
        }
        return jb(data: $result);
    }
}