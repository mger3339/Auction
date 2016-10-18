<?php

namespace App\Http\Controllers\Auth;

use App\Models\RoleUser;
use Illuminate\Http\Request;
use App\User;
//use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Symfony\Component\HttpFoundation\Response;
use \Tymon\JWTAuth\Facades\JWTAuth;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    public function __construct()
    {
//        $this->middleware($this->guestMiddleware(), ['except' => ['logout', 'authenticate']]);
        $this->middleware('app', ['except' => ['logout']]);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    public function postRegistr(Request $request)
    {
        return $this->create($request->all());
    }

    protected function create(array $data)
    {
         $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        RoleUser::create([
            'user_id' => $user->id,
            'role_id' => 2,
        ]);

        if($user) {
            $response = response()->json([
                'status' => 'success',
                'message' => 'You have successfully signed up'
            ]);
        } else {
            $response = response()->json([
                'status' => 'error',
                'message' => 'failed to register'
            ]);
        }
        return $response;
    }

    public function getLogin()
    {
        return view('auth/login');
    }

    public function authenticate(Request $request)
    {
        if (Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password')])) {
            $jvtToken = JWTAuth::fromUser(Auth::user());
            User::where('id', Auth::user()->id)->update([
                'jwt_token' => $jvtToken
            ]);
            if(Auth::user()->hasRole('admin')) {
                $user = 'admin';
            } else {
                $user = '';
            }

            Redis::publish(
                'laravel',
                json_encode([
                    'action' => 'addUser',
                    'data' => [
                        'id' => Auth::user()->id,
                        'token' => $jvtToken,
                        'name' => Auth::user()->name
                    ]
                ])
            );

            return response()->json([
                'token' => $jvtToken,
                'user' => $user,
                'name' => Auth::user()->name
            ]);
        }
    }

    public function getLogout()
    {
        if(Auth::user() != null) {
            User::where('id', Auth::user()->id)->update([
                'jwt_token' => null
            ]);
        }

        Redis::publish(
            'laravel',
            json_encode([
                'action' => 'deleteUser',
                'data' => [
                    'id' => Auth::user()->id,
                    'token' => Auth::user()->jwt_token,
                    'name' => Auth::user()->name
                ]
            ])
        );

        return $this->logout();
    }
}
