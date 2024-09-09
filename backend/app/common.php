<?php
// 应用公共文件
use think\response\Json;
use WpOrg\Requests\Exception;
use WpOrg\Requests\Requests;

/**
 * JsonBack，返回JSON格式助手
 * @param int $code 返回状态码
 * @param string $msg 返回消息
 * @param mixed|null $data 返回数据
 * @param int|null $count 返回数据数量
 * @param int|string|null $token 登录token
 * @return Json
 */
function jb(int $code = 200, string $msg = "", mixed $data = null, int $count = null, int|string $token = null): Json {
    return json(["code" => $code, "msg" => $msg, "data" => $data, "count" => $count, "token" => $token]);
}
function returnData(bool $status = true, string $msg = "", mixed $data = null): stdClass {
    $result = new StdClass;
    $result->status = $status;
    $result->msg = $msg;
    $result->data = $data;
    return $result;
}
/**
 * 获取时间数据
 * @return string 时间数据
 */
function now():string {
    return date("Y-m-d H:i:s");
}

function request($method="get", $url="", $obj=[]): stdClass{
    try {
        $res = null;
        $url = $obj->ssl==="Y"?'https':'http'."://".$obj->host.":".$obj->port.$url;
        $header = ["Authorization" => "Basic ".base64_encode($obj->user.":".$obj->pass)];
        if ($method == "get") {
            $res = Requests::get($url, $header);
        } elseif ($method == "post") {
            $res = Requests::post($url, $header);
        } elseif ($method == "put") {
            $res = Requests::put($url, $header);
        } elseif ($method == "delete") {
            $res = Requests::delete($url, $header);
        }
        $data = json_decode($res->body, true);
        return returnData(data: $data);
    } catch (Exception$e) {
        return returnData(false, $e->getMessage());
    }

}