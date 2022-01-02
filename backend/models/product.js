const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 24,
    },
    image: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: String,
        enum:["Swords","Shields","Arrows","Arcane Books","Vest"],
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    price: {
        type: Number,
        required: true
    },
    sold:{
        type: Number,
        default: 0
    }
},{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);