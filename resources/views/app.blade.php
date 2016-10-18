<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
    <base href="/"/>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" integrity="sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700">
    <link rel="stylesheet" href="{{asset('bower_components/bootstrap/dist/css/bootstrap.css')}}">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/github.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('bower_components/angular-material/angular-material.min.css')}}">
    <link rel="stylesheet" href="{{asset('bower_components/angular-material-datetimepicker/css/material-datetimepicker.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/css/style.css')}}">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

    <style>
        body {
            font-family: 'Lato';
        }

        .fa-btn {
            margin-right: 6px;
        }
    </style>
</head>
<body id="app-layout" ng-cloak>
    <div ui-layout>
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container" ng-controller="AuthController">
                <div ng-controller="checkUserController" class="collapse navbar-collapse"  id="app-navbar-collapse">
                    <div ng-if="auth">
                        <ul class="nav navbar-nav">
                            <li><a href="[[user]]/dashboard">Home</a></li>
                        </ul>
                        <ul ng-if="user" class="nav navbar-nav">
                            <li><a href="/admin/add">Add Product</a></li>
                        </ul>
                        <ul class="nav navbar-nav">
                            <li><a href="[[user]]/products">Products</a></li>
                        </ul>
                        <ul ng-if="user" class="nav navbar-nav">
                            <li><a href="/admin/addBot">Add Bot</a></li>
                        </ul>
                        <ul ng-if="user" class="nav navbar-nav">
                            <li><a href="/admin/bots">Bots</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown" ng-controller="DashboardController">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    [[username]] <span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    <li  ng-controller="LogoutController"><a ng-click="logOut()" href="#"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <ul ng-if="!auth" class="nav navbar-nav navbar-right">
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <ng-view></ng-view>

    <!-- JavaScripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js" integrity="sha384-I6F5OKECLVtK/BL+8iSLDEHowSAfUo76ZL9+kGAgTRdiByINKJaqTPH/QVNS1VDb" crossorigin="anonymous"></script>
    <script src="http://code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
    <script src="{{asset('bower_components/angular/angular.js')}}"></script>
    <script src="{{asset('bower_components/angular-route/angular-route.js')}}"></script>
    <script src="{{asset('bower_components/angular-animate/angular-animate.min.js')}}"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-aria.min.js"></script>
    <script src="{{asset('bower_components/angular-material/angular-material.js')}}"></script>
    <script src="{{asset('bower_components/angular-material-datetimepicker/node_modules/moment/min/moment-with-locales.min.js')}}"></script>
    {{--<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment-with-locales.min.js"></script>--}}
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/highlight.min.js"></script>
    <script src="{{asset('bower_components/angular-material-datetimepicker/beautifier.js')}}"></script>
    <script src="{{asset('bower_components/angular-material-datetimepicker/js/angular-material-datetimepicker.min.js')}}"></script>
    <script src="{{asset('bower_components/ng-file-upload/dist/ng-file-upload.min.js')}}"></script>
    <script src="{{asset('bower_components/ng-file-upload/dist/ng-file-upload-shim.min.js')}}"></script>
    <script src="{{asset('bower_components/angular-ui-router/release/angular-ui-router.js')}}"></script>
    <script src="{{asset('bower_components/angular-ui-layout/src/ui-layout.js')}}"></script>

    <!-- GLOBAL -->
    <script src="{{asset('common/module.js')}}"></script>
    <script src="{{asset('common/globals/config.js')}}"></script>
    <script src="{{asset('common/globals/route.js')}}"></script>
    <script src="{{asset('common/globals/jwt.factory.js')}}"></script>
    <script src="{{asset('common/globals/auth/login.controller.js')}}"></script>
    <script src="{{asset('common/globals/auth/auth.controller.js')}}"></script>
    <script src="{{asset('common/globals/checkUser.controller.js')}}"></script>
    <script src="{{asset('common/globals/datepicker.js')}}"></script>
    <script src="{{asset('common/globals/timer.js')}}"></script>

    <!-- SOCKET -->
    <script src="{{asset('bower_components/socket.io-client-master/socket.io.js')}}"></script>
    {{--<script src="{{asset('bower_components/angular-socket-io/socket.js')}}"></script>--}}
    {{--<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>--}}

    <!-- ADMIN -->
    <script src="{{asset('common/admin/dashboard/home/module.js')}}"></script>
    <script src="{{asset('common/admin/dashboard/home/home.controller.js')}}"></script>
    <script src="{{asset('common/admin/module.js')}}"></script>
    <script src="{{asset('common/admin/route.js')}}"></script>
    <script src="{{asset('common/admin/dashboard/addProduct/addProduct.controller.js')}}"></script>
    <script src="{{asset('common/admin/dashboard/addBot/addBot.controller.js')}}"></script>
    <script src="{{asset('common/admin/dashboard/products/products.controller.js')}}"></script>
    <script src="{{asset('common/admin/dashboard/bots/bots.controller.js')}}"></script>

    <!-- USER -->
    <script src="{{asset('common/user/module.js')}}"></script>
    <script src="{{asset('common/user/route.js')}}"></script>
    <script src="{{asset('common/user/dashboard/home/home.controller.js')}}"></script>
    <script src="{{asset('common/user/dashboard/products/products.controller.js')}}"></script>
    <script src="{{asset('common/user/dashboard/products/bid.controller.js')}}"></script>

</body>
</html>
