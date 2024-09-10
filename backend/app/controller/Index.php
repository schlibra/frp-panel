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
        $file = file_get_contents(root_path()."view/dist".$request->url());
        return response($file)->contentType("application/javascript");
    }
}