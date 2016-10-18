module.exports = function (mongoose) {
    this.collectionName = function () {
        return 'products';
    };

    this.rules = function () {
        return new mongoose.Schema({
            productId: {type: Number},
            name: {type: String},
            started_price: {type: String},
            real_price: {type: Number},
            started_time: {type: Number},
            bots: {type: Array},
            status: {type: String}
        });
    };

    this.model = mongoose.model('ModelProducts', this.rules(), this.collectionName());
};