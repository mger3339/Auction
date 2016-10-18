var request = require('request');
var _ = require('lodash');

var client = {
    app: null,
    io: null,
    model: null,

    listen: function (app, model) {
        console.log('start web client');
        var that = this;
        that.app = app;
        that.io = app.io;
        that.model = model;

        that.io.sockets.on('connection', function(socket){
            socket.on('productViewer', function(data){
                    that.productViewer(data, socket);
                }).on('makeBid', function(data){
                    that.makeBid(data);
                });

            // socket.on('userData', function(data){
            //     that.addUser(data, socket);0
            // }).on('productViewer', function(data){
            //     that.productViewer(data, socket);
            // }).on('auctionAutomatic', function(data){
            //     that.auctionAutomatic(data);
            // }).on('makeBid', function(data){
            //     that.makeBid(data);
            // }).on('disconnect', function(){
            //     that.deleteUser(socket.id);
            // });
        });
    },

    getStartedAuction: function () {
        var that  = this;
        var d = that.getTimeStamp();
        console.log(d + " - date");

        that.model.product.find({started_time: d, status: ''}).exec(function (error, products) {
            if (!error) {
                for (var key in products) {
                    var product = that.app.products[products[key].productId];

                    for (var i in product.viewers) {
                        product.viewers[i].emit('auctionStart', {
                            id: product.id,
                            status: 'started'
                        });
                    }

                    product.time = 10;
                    product.interval = setInterval(function () {
                        var self = this;

                        if (this.time > 1) {
                            for (var i in this.viewers) {
                                this.viewers[i].emit('auctionTimer', {
                                    id: this.id,
                                    time: this.time
                                });
                            }
                            this.time--;
                        } else if(this.time == 1 && this.startedPrice < this.realPrice) {
                            var dataBots = that.getBot(this);
                                var price = parseInt(dataBots.product.startedPrice);
                                var bid = new that.model.bid({
                                    product_id: dataBots.product.id,
                                    type: 'bot',
                                    name: dataBots.botName,
                                    price: price += 10,
                                    date: that.getTimeStamp('full')
                                });
                            bid.save(function (err, bid) {
                                    if (!err) {
                                        for (var i in self.viewers) {
                                            self.viewers[i].emit('auctionBid', {
                                                id: bid.product_id,
                                                price: bid.price,
                                                date: bid.date,
                                                name: bid.name
                                            });
                                        }
                                    }
                                });
                            that.app.products[this.id].bidUser = bid;
                            this.startedPrice = bid.price;
                            this.time = 10;
                        } else {
                            clearInterval(this.interval);
                            var winnerUser = {
                                id : this.id,
                                name : that.app.products[this.id].bidUser.name,
                                price : that.app.products[this.id].bidUser.price,
                                type : that.app.products[this.id].bidUser.type,
                            };
                            that.updateProductStatus(this.id, winnerUser, 'closed');
                            for (var i in this.viewers) {
                                this.viewers[i].emit('auctionClosed', {
                                    id: this.id,
                                    status: 'closed',
                                    bidUser: winnerUser
                                });
                            }
                        }
                        that.app.products[this.id] = this;
                    }.bind(product), 950);

                    that.app.products[products[key].id] = product;
                    that.updateProductStatus(products[key].productId, '', 'started');
                }
            }
        })
    },

    // auctionAutomatic: function (data) {
    //     var that  = this;
    //     console.time('auction automatic')
    //     console.log(data);
    //
    //     var user = that.$._.chain(that.app.users)
    //         .find(function (user) {
    //             return user.token == data.token;
    //         })
    //         .value();
    //
    //     if (data.type) {
    //         that.app.products[data.product_id].queue.users.push({
    //             name: user.name,
    //             user_id: user.id
    //         });
    //     } else {
    //         that.app.products[data.product_id].queue.users = that.$._.chain(that.app.products[data.product_id].queue.users)
    //             .reject(function (item) {
    //                 return item.user_id == user.id;
    //             })
    //             .value();
    //
    //         that.app.products[data.product_id].used.users = that.$._.chain(that.app.products[data.product_id].used.users)
    //             .reject(function (item) {
    //                 return item.user_id == user.id;
    //             })
    //             .value();
    //     }
    //     console.timeEnd('auction automatic')
    // },

    updateProductStatus: function (id, winner, status) {
        var that = this;

        request.post({
                url: 'http://laravel.dev/products/updateStatus',
                form:{id:id, winner:winner, status: status}
            },
            function (error, response, body) {
                if (!error) {
                    that.model.product.findOneAndUpdate({'productId': id}, {$set: {status: status}}, function (err, doc) {

                    });
                }
            });
    },

    productViewer: function (data, socket) {
        var that = this;
        var dataBids = [];
        if(that.app.products[data.id]) {
            that.app.products[data.id].viewers[data.userToken] = socket;
            var product = that.app.products[data.id];
            that.model.bid.find({product_id : data.id}).exec(function (error, bids) {
                for (var i in bids) {
                    dataBids[i] = {
                        product_id: bids[i].product_id,
                        name: bids[i].name,
                        price: bids[i].price,
                        date: bids[i].date
                    };
                }
                dataBids = dataBids.reverse();
                product.viewers[data.userToken].emit('dataBids', dataBids);
            })
        }
    },

    getTimeStamp: function (type) {
        type = type || 'normal';
        var now = new Date();
        var date = null;

        if (type == 'normal') {
            date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
        } else if(type == 'full') {
            date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
        }

        return parseInt(date.getTime() / 1000);
    },

    makeBid: function (data) {
        var that = this;

        var user = _.chain(that.app.users)
            .find(function (user) {
                return user.jwt_token == data.userToken;
            })
            .value();

        var product = that.app.products[data.id];
        var price = parseInt(product.startedPrice) + 10;

        var bid = new that.model.bid({
            product_id: data.id,
            type: 'user',
            name: user.name,
            price: price,
            user_token: user.jwt_token,
            date: that.getTimeStamp('full')
        });

        bid.save(function (err, bid) {
            if (!err) {
                for (var i in product.viewers) {
                    product.viewers[i].emit('auctionBid', {
                        id: bid.product_id,
                        price: bid.price,
                        date: bid.date,
                        name: bid.name,
                        user_token: bid.user_token
                    });
                }
            }
        });
        that.app.products[data.id].bidUser = bid;

        product.startedPrice = parseInt(product.startedPrice) + 10;
        product.time = 10;
        that.app.products[data.id] = product;
    },

    getBot: function (product) {
    var botName;
    if(product.bots.length != 0) {
        botName = product.bots.shift();
        product.usedBots.push(botName);
    }
    else {
        _.shuffle(product.usedBots);
        product.bots = product.usedBots;
        product.usedBots = [];
        botName = product.bots.shift();
        product.usedBots.push(botName);
    }
    return {
        botName: botName,
        product: product
    }
}
};

module.exports = client;