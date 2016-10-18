var express = require('express');
var schedule = require('node-schedule');

var models = require('./models');

var laravel = require('./controllers/laravelClient');
var web = require('./controllers/webClient');

var _ = require('lodash');

var app = express();

app.users = [];
// app.unauthorized = [];
app.products = {};

models.run(function (models) {
models.product.find( {$or:[ {status: 'started'}, {status: ''} ]} ).exec(function (error, products) {
    if (!error) {
        for (var product in products) {
            app.products[products[product].productId] = {
                id: products[product].productId,
                name: products[product].name,
                startedPrice: products[product].started_price,
                realPrice: products[product].real_price,
                startedTime: products[product].started_time,
                status: products[product].status,
                viewers: {},
                bidUser: {},
                bots:  _.shuffle(products[product].bots),
                usedBots: [],
                used: {
                    users: []
                }
            }
        }

        laravel.listen(app, models, function () {
        // console.timeEnd('get users');
        web.listen(app, models);

        });
    }
});
});

// setTimeout(function () {
//   app.io.sockets.on('connection', function (socket) {
//     socket.on('eventClient', function (data) {
//       console.log(data);
//       socket.emit('eventClient', { data: 'Hello Client' });
//     });
//     socket.on('disconnect', function () {
//       console.log('user disconnected');
//     });
//   });
// }, 1000);

schedule.scheduleJob('* * * * *', function() {
  console.log("schedule is running");
  web.getStartedAuction();
});

module.exports = app;