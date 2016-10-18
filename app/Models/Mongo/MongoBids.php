<?php

namespace App\Models\Mongo;

use Jenssegers\Mongodb\Eloquent\Model;

class MongoBids extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'bids';
    protected $fillable = [
        'productId', 'name', 'type', 'price', 'date'
    ];
}