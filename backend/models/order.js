const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductItemSchema = new mongoose.Schema({
    product: {type: ObjectId, ref:"Product"},
    name: { type: String },
    price:{ type: Number },
    quantity: { type: Number }
});

const OrderSchema = new mongoose.Schema({
    user:{ type: ObjectId, ref: "User" },
    address:{ type: String },
    reciept_id:{ type: String },
    products:[ProductItemSchema],
    amount:{type: Number}
},{ timestamps: true});

const Order = mongoose.model("Order", OrderSchema);
module.exports = { Order };