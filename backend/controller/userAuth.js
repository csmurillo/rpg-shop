const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req,res)=>{
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"User Already Exist"
            });
        }
        user.hash_password=undefined;
        res.status(200).json(
            user
        );
    });
};
exports.signin = (req,res)=>{
    const { email, hash_password } = req.body;
    User.findOne({ email }, (err,user)=>{
        if(err||!user){
            return res.status(401).json({
                error: "Account does not exist"
            });
        }
        const validAuth = user.authentication(hash_password);
        if(!validAuth){
            return res.status(401).json({
                error:"Invalid Auth: Please check password"
            });
        }
        // create jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY);
        user.hash_password=undefined;
        res.status(200).json({
            user,
            token
        });
    });
};
exports.isAuth = (req,res,next)=>{
    const isAuth = req.userTokenData && req.user && req.userTokenData.userId==req.user._id;
    if(!isAuth){
        return res.status(400).json({msg:"User is not authenticated"});
    }
    next();
};
exports.deleteAccount = (req,res)=>{
    let user = req.user;
    user.remove((err,deleteAccount)=>{
        if(err){
            return res.status(400).json({error:"Error 400: Something went wrong our engineers are working on it."});
        }
        res.json({msg:"Account Deleted"});
    });
};