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

Route::get("/api/nodeList", "Api/getNodeList");
Route::get("/api/nodeDetail/:id", "Api/getNodeDetail");

Route::get("/", "Index");
Route::get("/nodeList", "Index");

Route::get("/assets/:file", "Index/assets");