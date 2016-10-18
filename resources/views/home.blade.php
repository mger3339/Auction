@extends('layouts.app')

@section('content')
<div class="container" ng-controller="HomeController">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    You are logged in!

                    <button ng-click="check()" class="btn btn-danger">Check</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
