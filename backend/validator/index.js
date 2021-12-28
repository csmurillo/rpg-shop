// exports.createProductValidator=(req,res,next)=>{
//     req.check('name','Name is required').notEmpty();
//     req.check('description','Description is required').notEmpty();
//     req.check('price','Price is required').notEmpty();
//     const errors = req.validationErrors();
//     if(errors){
//         let errorsMsgs = errors.map(err=>{
//             return {field: err.param, error:err.msg};
//         });
//         return res.status(400).json({errors:errorsMsgs});
//     }
//     next();
// };