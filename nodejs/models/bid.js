module.exports = function (mongoose) {
    this.collectionName = function () {
        return 'bids';
    };

    this.rules = function () {
        return new mongoose.Schema({
            product_id: {type: Number},
            type: { type: String},
            name: {type: String},
            price: {type: Number},
            user_token: {type: String},
            date: {type: Number}
        });
    };

    this.model = mongoose.model('ModelBids', this.rules(), this.collectionName());
};