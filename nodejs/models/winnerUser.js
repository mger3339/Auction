module.exports = function (mongoose) {
    this.collectionName = function () {
        return 'winnerUser';
    };

    this.rules = function () {
        return new mongoose.Schema({
            data: { type: String}
        });
    };

    this.model = mongoose.model('ModelWinnerUser', this.rules(), this.collectionName());
};