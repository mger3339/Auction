var Redis = require('ioredis');
var request = require('request');
var _ = require('lodash');
// var fs = require('fs');

var client = {
    path: null,
    app: null,
    model: null,
    redis: null,

    listen: function (app, model, cb) {
        var that = this;
        that.app = app;
        that.path = 'http://laravel.dev';
        that.redis = new Redis({
            port: 6379,
            host: '127.0.0.1',
            family: 4,
            db: 0
        });

        that.redis.subscribe('laravel', function (err, count) {
                console.log(count);
        });

        that.getUser(function(data) {
            data = JSON.parse(data);
            if(data.status == 'success') {
                that.app.users = data.users;
            }
            cb();
        });

        that.redis.on('message', function (channel, data) {
            console.log('Receive message %s from channel %s', data, channel);
            data = JSON.parse(data);

            if(channel == 'laravel') {
                switch (data.action) {
                    case 'addUser':
                        that.addUser(data.data);
                        break;
                    case 'deleteUser':
                        that.deleteUser(data.data);
                        break;
                }
            }
        });
    },

    getUser: function(callback) {
        var that = this;

        request.get({
            url: that.path + '/getUsers'
        },
        function(error, response, body) {
            if (error == null && callback) {
                callback(body);
            }
        });
    },

    addUser: function(data) {
        var that = this;
        var user = _.chain(that.app.users)
            .find(function(v){
                return (v.id == data.id);
            })
            .value();

        if(user != undefined) {
            that.app.users = _.chain(that.app.users)
                .map(function(v){
                    if(v.id == data.id){
                        v.token = data.token;
                    }

                    return v;
                })
                .value();
        } else {
            that.app.users.push({
                id          : data.id,
                jwt_token   : data.token,
                name        : data.name
            });
        }
    },

    deleteUser: function(data){
        var that  = this;
        that.app.users = _.chain(that.app.users)
            .filter(function (v) {
                if(v.id == data.id && v.token == data.token){
                    v.connections = _.chain(v.connections)
                        .filter(function(c){
                            if(c.id != data.device){
                                return c;
                            }
                        })
                        .value();

                    return v;
                } else if (v.id != data.id) {
                    return v;
                }
            })
            .value();

    }
};

module.exports = client;