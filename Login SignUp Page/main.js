const express = require('express')
const path = require('path')
const app = express()
const usermodel = require('./models/UserModel.js')
const mongoose = require("mongoose");
const { Db } = require('mongodb');

app.use(express.static("public")); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', '/HTML/mainpage.html'));
})

app.post('/SignUp',async (req,res)=>{
    const { name, email, password } = req.body;
    let data = await usermodel.findOne({email})
    if (data) {
        res.json({success : false})   
    }else{
        if (name != "" && email != "" && password != "") {
        const createdUser = await usermodel.create({ name, email, password });   
        res.json({success : true})   
    }}
})


app.post('/Login',async (req,res)=>{
    const {email, password } = req.body;
    let data = await usermodel.findOne({email})
    if(data){
        res.json({data})
    }else{
        res.json({success : false})
    }
})

 

app.listen(3000)   