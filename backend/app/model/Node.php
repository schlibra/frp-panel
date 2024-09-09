<?php
declare (strict_types = 1);

namespace app\model;

use think\Model;

/**
 * @mixin Model
 */
class Node extends Model
{
    protected $schema = [
        "id" => "int",
        "name" => "string",
        "host" => "string",
        "port" => "int",
        "ssl" => "string",
        "user" => "string",
        "pass" => "string",
        "create" => "datetime",
        "update" => "datetime",
    ];
}
