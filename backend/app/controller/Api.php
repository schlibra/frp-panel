<?php

namespace app\controller;

use app\BaseController;
use app\model\Node;
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
                $result[$key] = $item;
            }
            return jb(data: $result);
        }
    }
}