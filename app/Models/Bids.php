<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bids extends Model
{

    protected  $table = 'bids';
    public $timestamps = false;
    protected $fillable = [
        'product_id', 'name', 'type', 'price', 'date'
    ];
}