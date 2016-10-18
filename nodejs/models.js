var mongoose = require('mongoose');
var product = require('./models/product');
var bid = require('./models/bid');
var winnerUser = require('./models/winnerUser');

exports.run = function (callback) {
    var connect = mongoose.connect('mongodb://127.0.0.1:27017/auction', function (error) {
        if (error) {
            console.log(error);
        }
    });

    process.nextTick(function () {
        callback({
            product: (new product(connect)).model,
            bid: (new bid(connect)).model,
            winnerUser: (new winnerUser(connect)).model,
        })
    });
};
