const { Order } = require('../models/order');

exports.createOrder = (req,res)=>{
    req.body.user = req.user._id;
    const order = new Order(req.body);
    order.save((err,order)=>{
        if(err){
            return res.status(400).json('Sorry at the moment we cant process your order');
        }
        res.json(order);
    });
};

exports.orderList = (req,res)=>{
    Order.find()
            .populate('user','_id first_name last_name')
            .sort('-created')
            .exec((err,orders)=>{
                if(err){
                    return res.status(400).json({
                        error:"Could not retrieve order information at this moment"
                    });
                }
                console.log('ORODERS'+orders);
                res.json(orders);
            });
};

