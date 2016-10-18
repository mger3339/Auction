<?php

namespace App\Models;

use Zizaco\Entrust\Traits\EntrustUserTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;

class RoleUser extends Authenticatable
{
    protected  $table = 'role_user';
    public $timestamps = false;
    protected $fillable = [
        'user_id', 'role_id'
    ];

}
