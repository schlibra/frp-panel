<?php
// 应用公共文件
use think\response\Json;

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
/**
 * 获取时间数据
 * @return string 时间数据
 */
function now():string {
    return date("Y-m-d H:i:s");
}