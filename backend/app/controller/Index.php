<?php

namespace app\controller;

use app\BaseController;
use app\Request;
use think\Response;

class Index extends BaseController
{
    public function index(): Response {
        $html = file_get_contents(root_path()."view/dist/index.html");
        return response($html);
    }
    public function assets(Request$request): Response {
        $path = $request->url();
        $file = file_get_contents(root_path()."view/dist".$path);
        $type = "";
        if (str_ends_with($path, ".css")){
            $type = "text/css";
        }
        if (str_ends_with($path, ".js")) {
            $type = "application/javascript";
        }
        return response($file)->contentType($type);
    }
}