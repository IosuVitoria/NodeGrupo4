const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema (
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        type: {type: String, required: true, default: "General", enum: ["General", "Dairy", "Meat", "Vegetables", "Drink", "Fish", "Fruits", "Cereals"]},
        nutrients: [{type: String, required: true}],
        SKU: {type: String, required: true},
    }, {
        timestamps: true
    }
)

const Product = mongoose.model("product", productSchema);

module.exports = Product;