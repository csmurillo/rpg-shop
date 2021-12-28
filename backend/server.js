const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

// routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const app = express();

// middleware
app.use(express.json());
app.use(cors({origin: '*'}));

// connect to mongodb
mongoose.connect(process.env.DATABASE)
    .then(()=>{console.log('connect to db');})
    .catch((error)=>{console.log('error'+error+' connecting to db');});

app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',productRoutes);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`port is ${port}`);
});


