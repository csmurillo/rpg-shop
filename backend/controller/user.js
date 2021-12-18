const User = require('../models/user');
exports.userId=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(401).json({msg:"Sorry User does not exist"});
        }
        req.user = user;
        next();
    });
};
exports.accountInformation=(req,res)=>{
    const {userId}=req.userTokenData;
    User.findOne({_id:userId},(err,user)=>{
        if(err){
            return res.status(401).json({error:"Account could not be found"});
        }
        user.hash_password=undefined;
        res.json(user);
    });
};
exports.updateAccountInformation=(req,res)=>{
    const {userId}=req.userTokenData;
    const {first_name,last_name,email}=req.body;
    User.findOne({ _id: userId },(err,user)=>{
        if(err){
            return res.status(401).json({error:"Account was not found."});
        }
        user.first_name=first_name;
        user.last_name=last_name;
        user.email=email;

        user.save((err,updatedUser)=>{
            if(err){
                return res.status(401).json({error:"User could not be updated at this moment. Please try again later."});
            }
            res.json({success:true,user:updatedUser});
        });
    });
};
exports.updatePassword=(req,res)=>{
    const {userId}=req.userTokenData;
    const {hash_password}=req.body;
    User.findOne({ _id: userId },(err,user)=>{
        if(err){
            return res.status(401).json({error:"Account was not found."});
        }
        user.hash_password=hash_password;
        user.save((err,updatedUser)=>{
            if(err){
                return res.status(401).json({error:"User password could not be updated at this moment. Please try again later."});
            }
            res.json({success:true,user:updatedUser});
        });
    });
};