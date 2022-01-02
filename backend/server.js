const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

// routes
const userRoutes = require('./routes/admin');
const adminRoutes = require('./routes/user');
const userAuthRoutes = require('./routes/userAuth');
const adminAuthRoutes = require('./routes/adminAuth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const app = express();

// middleware
app.use(express.json());
app.use(cors({origin: '*'}));

// connect to mongodb
mongoose.connect(process.env.DATABASE)
    .then(()=>{console.log('connect to db');})
    .catch((error)=>{console.log('error'+error+' connecting to db');});

app.use('/api',userRoutes);
app.use('/api',adminRoutes);
app.use('/api',userAuthRoutes);
app.use('/api',adminAuthRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`port is ${port}`);
});