const Product = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');

exports.productId=(req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if(err||!product){
            return res.status(401).json({msg:"Sorry Product does not exist."});
        }
        req.product = product;
        next();
    });
};
exports.product=(req,res)=>{
    req.product.image = undefined;
    return res.json(req.product);
};
exports.products=(req,res)=>{
    Product.find()
        .select('-image')
        .exec((err,products)=>{
            if(err){
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};
exports.createProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({error:"Image could not be uploaded"});
        }

        const {name, description, price} = fields;
        if(!name||!description||!price){
            return res.status(400).json({error:"All fields are required"});
        }

        let product = new Product(fields);
        
        if(files.image){
            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
        }
        product.save((err,productCreated)=>{
            if(err){
                return res.status(400).json({error:"Product could not be saved"+err});
            }
            res.json({product:productCreated});
        });
    });

};
exports.updateProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({error:"Image could not be uploaded"});
        }

        const {name, description, price} = fields;
        if(!name||!description||!price){
            return res.status(400).json({error:"All fields are required"});
        }

        let product = req.product;
        // update fields
        product.name=name;
        product.description=description;
        product.price=price;
        
        if(files.image){
            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
        }
        product.save((err,productCreated)=>{
            if(err){
                return res.status(400).json({error:"Product could not be saved"+err});
            }
            res.json({product:productCreated});
        });
    });
};
exports.deleteProduct=(req,res)=>{
    let product = req.product;

    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({error:'Could not remove deleted product'});
        }
        res.json({
            message:'Producted deleted successfully'
        });
    });
};


