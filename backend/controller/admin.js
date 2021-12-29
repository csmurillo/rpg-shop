const Admin = require('../models/admin');
exports.adminId=(req,res,next,id)=>{
    Admin.findById(id).exec((err,admin)=>{
        if(err||!admin){
            return res.status(401).json({msg:"Sorry User does not exist"});
        }
        req.admin = admin;
        next();
    });
};
exports.adminInformation=(req,res)=>{
    const {adminId}=req.userTokenData;
    Admin.findOne({_id:adminId},(err,admin)=>{
        if(err){
            return res.status(401).json({error:"Account could not be found"});
        }
        admin.hash_password=undefined;
        res.json(user);
    });
};