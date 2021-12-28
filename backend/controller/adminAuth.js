const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

exports.signup = (req,res)=>{
    const admin = new Admin(req.body);
    admin.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error:"Admin Already Exist"
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
    Admin.findOne({ email }, (err,admin)=>{
        if(err||!admin){
            return res.status(401).json({
                error: "Account does not exist"
            });
        }
        const validAuth = admin.authentication(hash_password);
        if(!validAuth){
            return res.status(401).json({
                error:"Invalid Auth: Please check password"
            });
        }
        // create jwt token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_PRIVATE_KEY);
        admin.hash_password=undefined;
        res.status(200).json({
            admin,
            token
        });
    });
};
exports.isAuth = (req,res,next)=>{
    const isAuth = req.userTokenData && req.admin && req.userTokenData.userId==req.admin._id;
    if(!isAuth){
        return res.status(400).json({error:"Admin is not authenticated"});
    }
    next();
};
exports.isAdmin = (req,res,next)=>{
    const isAdmin = req.admin.role == 1;
    if(!isAdmin){
        return res.status(400).json({error:"Admin does not have access to resources"});
    }
    next();
};

exports.deleteAccount = (req,res)=>{
    let admin = req.admin;
    admin.remove((err,deleteAccount)=>{
        if(err){
            return res.status(400).json({error:"Error 400: Something went wrong our engineers are working on it."});
        }
        res.json({msg:"Account Deleted"});
    });
};