<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use \Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
//    public function index()
//    {
//            return view('user/home');
//            return view('admin/home');
//    }

    public function getToken()
    {
        return response()->json([
            'token' => JWTAuth::fromUser(Auth::user())
        ]);
    }

    public function getUser()
    {
        if(Auth::user() ->hasRole('admin')) {
            $user = 'admin';
        } else {
            $user = '';
        }
        return response()->json($user);
    }
}
