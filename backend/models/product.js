const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 24,
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    image: {
        data: Buffer,
        contentType: String
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