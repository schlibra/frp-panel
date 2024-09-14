<?php

namespace app\controller;
use app\Request;
use PHPUnit\Framework\TestCase;
use think\App;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

class ApiTest extends TestCase
{
    protected Api $api;
    protected Index $index;
    protected function setUp(): void
    {
        $app = App::getInstance()->initialize();
        $this->api = new Api($app);
        $this->index = new Index($app);
    }

    public function testIndex()
    {
        $response = $this->index->index();
        $this->assertEquals(200, $response->getCode());
    }
    public function testAssets() {
        $request = new Request();
        $response = $this->index->assets($request);
        $this->assertEquals(200, $response->getCode());
    }
    public function testGetProxyList()
    {
        $response = $this->api->getProxyList(1, "tcp");
        $data = $response->getData();
        $this->assertEquals(200, $data['code']);
    }

    public function testGetNodeList()
    {
        $response = $this->api->getNodeList();
        $data = $response->getData();
        $this->assertEquals(200, $data['code']);
    }

    public function testGetAllProxy()
    {
        try {
            $response = $this->api->getAllProxy();
            $data = $response->getData();
            $this->assertEquals(200, $data['code']);
        } catch (DataNotFoundException|ModelNotFoundException|DbException $e) {
            $this->throwException($e);
        }
    }

}
