const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const clubRoute = require('./routes/club.js');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.json({
        message: "Welcome"
    })
})

app.use('/club',clubRoute);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {
        console.log('MongoDB connected...')
    })
    .catch((err)=> console.log(err))



app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
});