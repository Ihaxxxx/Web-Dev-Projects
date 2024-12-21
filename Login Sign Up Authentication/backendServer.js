const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const userModel = require('./models/usermodel')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : true}))
app.use(express.static("public")); 
app.use(express.static(path.join(__dirname,"public")))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', '/HTML/mainpage.html'));
})

app.post('/Register', async (req,res)=>{
    let {name,email,password,age} = req.body
    let data = await userModel.findOne({email})
    if (data) {
        res.json({success : false})   
    }else{
        if (name != "" && email != "" && password != "") {
            bycrypt.genSalt(10,(err,salt)=>{
                bycrypt.hash(password,salt,async(err,hash)=>{
                    let createdUser = await userModel.create({
                        name,
                        email,
                        password:hash,
                        age
                    })
                    let token = jwt.sign({email},"Nigga");
                    res.cookie("token",token)
                    res.json({success : true})   
                })
            })
    }}
})

app.post("/login",async(req,res)=>{
    let user = await userModel.findOne({email:req.body.email})
    if (!user) return res.json({success : false})  
    bycrypt.compare(req.body.password,user.password,function(err,result){
        if(result){
            let token = jwt.sign({email : user.email},"Nigga");
            res.cookie("token",token)
            res.json({success : true})   
        }
        else res.json({success : false})   
    })  
})

app.listen(3000)