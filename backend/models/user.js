const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 24
    },
    last_name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 24
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hash_password: {
        type: String,
        required: true
    },
    order_history:{
        type: Array,
        default: []
    }
},{ timestamps: true });

// hook:pre/before save to db
userSchema.pre('save', function(next){
    this.encryptPassword(this.hash_password,next);
});

userSchema.methods = {
    authentication: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    },
    encryptPassword: async function(password,next){
        const salt=bcrypt.genSaltSync(10);
        this.hash_password=bcrypt.hashSync(password,salt);
        next();
    }
};
module.exports = mongoose.model('User', userSchema);