const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
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
    // 0 is not admin, 1 is admin, 2 is owner
    role:{
        type: Number,
        default: 1
    }
},{ timestamps: true });

// hook:pre/before save to db
adminSchema.pre('save', function(next){
    this.encryptPassword(this.hash_password,next);
});
adminSchema.methods = {
    authentication: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    },
    encryptPassword: async function(password,next){
        const salt=bcrypt.genSaltSync(10);
        this.hash_password=bcrypt.hashSync(password,salt);
        next();
    }
};
module.exports = mongoose.model('Admin', adminSchema);