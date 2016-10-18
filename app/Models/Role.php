<?php

namespace App\Models;

use Zizaco\Entrust\EntrustRole;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Role extends EntrustRole
{
    protected  $table = 'roles';
    protected $fillable = [
        'name', 'display_name', 'description'
    ];

}
