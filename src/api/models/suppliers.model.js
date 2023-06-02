const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema (
    {
        name: {type: String, required: true},
        products: [{type: String, required: true}],
        benefit: {type: Number, required: true}
    }, {
        timestamps: true
    }
)

const Supplier = mongoose.model("supplier", supplierSchema);

module.exports = Supplier;