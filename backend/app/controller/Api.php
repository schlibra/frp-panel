<?php

namespace app\controller;

use app\BaseController;
use app\model\Node;
use think\App;
use think\facade\Db;
use think\Request;
use WpOrg\Requests\Exception;
use WpOrg\Requests\Requests;

class Api extends BaseController
{
    public function getNodeList(Request$request)
    {
        $result = Node::select();
        if ($result->isEmpty()) {
            return jb(msg: "数据不存在");
        } else {
            foreach ($result as $key => $value) {
                $item = $result[$key];
                try {
                    $res = Requests::get($item->ssl === "Y"?"https":"http"."://".$item->host.":".$item->port."/api/serverinfo", [
                        "Authorization" => "Basic " . base64_encode($item->user . ":" . $item->pass)
                    ]);
                    $data = json_decode($res->body, true);
                    $item = array_merge($item->toArray(), $data);
                    $item["status"] = "online";
                } catch (Exception $e) {
                    $item["status"] = "offline";
                }
                $result[$key] = $item;
            }
            return jb(data: $result);
        }
    }
}