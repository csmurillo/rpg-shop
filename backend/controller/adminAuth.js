const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

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
exports.signup = (req,res)=>{
    const admin = new Admin(req.body);
    admin.save((err,admin)=>{
        if(err){
            return res.status(400).json({
                error:"Admin Already Exist"
            });
        }
        admin.hash_password=undefined;
        res.status(200).json(
            admin
        );
    });
};
exports.isOwner = (req,res,next)=>{
    console.log(req.admin.role);
    const isOwner = req.admin.role==2;
    if(!isOwner){
        return res.status(400).json({error:"Sorry you dont have permission to access this resource"});
    }
    next();
};
exports.isAdminAuth = (req,res,next)=>{
    const isAuth = req.userTokenData && req.admin && req.userTokenData.userId==req.admin._id;
    if(!isAuth){
        return res.status(400).json({error:"Admin is not authenticated"});
    }
    next();
};
exports.privledgedAdmin = (req,res,next)=>{
    if(req.admin.role==0){
        return res.status(400).json({error:"Sorry you are no longer a privledge admin"});
    }
    next();
};
