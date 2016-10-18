<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected  $table = 'products';
    public $timestamps = true;
    protected $fillable = [
        'id', 'user_id', 'name', 'description', 'started_price', 'img','real_price', 'started_time', 'created_at', 'updated_at', 'bots', 'winner'
    ];
}
