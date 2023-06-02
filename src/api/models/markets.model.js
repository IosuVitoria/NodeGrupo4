const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const marketSchema = new Schema (
    {
        name: {type: String, required: true},
        location: {type: String, required: true},
        products: [{type: Schema.Types.ObjectId, ref: 'product'}],
        suppliers: [{type: Schema.Types.ObjectId, ref: 'supplier'}]
    }, {
        timestamps: true
    }
)

const Market = mongoose.model("market", marketSchema);

module.exports = Market;