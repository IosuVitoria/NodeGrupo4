const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema (
    {
        name: {type: String, required: true},
        products: [{type: Schema.Types.ObjectId, ref: 'product'}],
        benefit: {type: Number, required: true},
        image: {type: String, required: false}
    }, {
        timestamps: true
    }
)

const Supplier = mongoose.model("supplier", supplierSchema);

module.exports = Supplier;