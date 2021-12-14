const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DATABASE)
    .then(()=>{console.log('connect to db');})
    .catch(()=>{console.log('error connecting to db');});

app.get('/',(req,res)=>{
    console.log("test");
    res.json({test:'test'});
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`port is ${port}`);
});

