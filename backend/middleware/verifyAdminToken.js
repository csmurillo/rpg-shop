const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedToken) => {
        if(err){
            res.status(401).json({msg:"Auth failed: Verify Credentials"});
        }
        req.userTokenData = { userId: decodedToken.id };
        next();
    });
};