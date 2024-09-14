<?php

namespace app\controller;

use app\BaseController;
use app\Request;
use think\Response;

class Index extends BaseController
{
    public function index(): Response {
        $file_path = root_path()."view/dist/index.html";
        if (file_exists($file_path)) {
            $html = file_get_contents(root_path()."view/dist/index.html");
        } else {
            $html = "index.html not found";
        }
        return response($html);
    }
    public function assets(Request$request): Response {
        $path = $request->url();
        $file_path = root_path()."view/dist".$path;
        if (file_exists($file_path)) {
            $file = file_get_contents($file_path);
        } else {
            $file = "file not found";
        }
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