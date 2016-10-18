<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use League\Flysystem\Exception;
use \Tymon\JWTAuth\Facades\JWTAuth;
use Request;

class VerifyAngularToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Request::wantsJson() && isset($request->header()['authorization'][0])) {
            if( JWTAuth::getToken() != str_replace("Bearer ", "", $request->header()['authorization'][0])) {
                return response()->json([
                   'status' => 401
                ]);
            }
        }

        return $next($request);
    }
}
