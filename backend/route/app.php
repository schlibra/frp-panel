<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\facade\Route;

Route::get("/api/node/all", "Api/getAllProxy");
Route::get("/api/node/:id/:type", "Api/getProxyList");
Route::get("/api/node", "Api/getNodeList");

Route::get("/", "Index");
Route::get("/node", "Index");
Route::get("/node/:id", "Index");
Route::get("/node/:id/:type", "Index");

Route::get("/assets/:file", "Index/assets");