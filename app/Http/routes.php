<?php
use \Illuminate\Support\Facades\Route;

Route::get('/', function () {
   return redirect ('login');
});

Route::get('/getUsers', ['as' => 'getUser','uses' => 'SystemController@getUser']);
Route::post('/products/updateStatus', ['as' => 'updateStatus','uses' => 'SystemController@updateProductTimeStatus']);

Route::group(['middleware' => ['web', 'app']], function () {
    Route::get('login', 'Auth\AuthController@getLogin');
    Route::post('login', 'Auth\AuthController@postLogin');
    Route::get('logout', 'Auth\AuthController@logout');
    Route::get('logout', 'Auth\AuthController@getLogout');

    Route::get('register', 'Auth\AuthController@showRegistrationForm');
    Route::post('register', 'Auth\AuthController@register');

    // Password Reset Routes...
    Route::get('password/reset/{token?}', 'Auth\PasswordController@showResetForm');
    Route::post('password/email', 'Auth\PasswordController@sendResetLinkEmail');
    Route::post('password/reset', 'Auth\PasswordController@reset');

    Route::post('authenticate', ['as' => 'authenticate','uses' => 'Auth\AuthController@authenticate']);
    Route::post('getUser', ['as' => 'authenticate','uses' => 'Auth\AuthController@authenticate']);
    Route::post('create', ['as' => 'registr','uses' => 'Auth\AuthController@postRegistr']);


    Route::group(['middleware' => 'angular-auth'], function () {
        Route::post('getToken', 'HomeController@getToken');
        Route::post('getUser', 'HomeController@getUser');
//        Route::post('products/updateStatus', 'Admin\AdminController@updateProductTimeStatus');

        Route::group(['prefix' => 'admin', 'middleware' => ['role:admin']], function () {
            Route::get('/', 'Admin\AdminController@index');
            Route::post('/products/getProducts', 'Admin\AdminController@getProducts');
            Route::post('/products/add', 'Admin\AdminController@addProduct');
            Route::post('/products/update', 'Admin\AdminController@update');
            Route::post('/products/delete', 'Admin\AdminController@deleteProduct');
            Route::post('/products/{id}', 'Admin\AdminController@getProductById');

            Route::post('/bots/addBot', 'Admin\AdminController@addBot');
            Route::post('/bots/getBots', 'Admin\AdminController@getBots');
            Route::post('/bots/update', 'Admin\AdminController@updateBot');
            Route::post('/bots/delete', 'Admin\AdminController@deleteBot');
            Route::post('/bots/{id}', 'Admin\AdminController@getBotById');
//            Route::post('/products/edit/{id}', 'Admin\AdminController@editProduct');
        });

        Route::group(['prefix' => 'user', 'middleware' => ['role:user']], function () {
            Route::get('/', 'User\UserController@index');
            Route::post('/products/getProducts', 'User\UserController@getProducts');
            Route::post('/products/{id}', 'User\UserController@getProductById');

        });
    });
});

