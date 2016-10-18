<?php

namespace App\Models\Mongo;

use Jenssegers\Mongodb\Eloquent\Model;

class MongoProduct extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'products';
    protected $fillable = [
        'productId', 'name', 'started_price', 'real_price', 'started_time', 'status', 'bots'
    ];
}