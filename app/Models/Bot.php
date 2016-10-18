<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bot extends Model
{

    protected  $table = 'bots';
    public $timestamps = true;
    protected $fillable = [
        'id', 'user_id', 'name', 'created_at'
    ];
}