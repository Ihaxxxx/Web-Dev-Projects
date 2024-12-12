const express = require('express')
const path = require('path')
const app = express()
const usermodel = require('./models/usermodel.js')
const mongoose = require("mongoose");


app.use(express.static("public")); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json());


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', '/HTML/mainpage.html'));
    
})

app.post('/create', async (req, res) => {
    try {
        const { name, email, imageurl } = req.body;
        if (name != "" && email != "" && imageurl != "") {
            const createdUser = await usermodel.create({ name, email, imageurl });
        }
        usermodel.deleteMany({name : ""})
        res.redirect("/read")
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating user.' });
    }
});

app.get('/read', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'HTML', 'read.html'));
});

app.get('/read-data', async (req, res) => {
    try {
        const users = await usermodel.find();
        res.json({users})
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching users.');
    }
});

app.get('/delete/:id',async (req,res)=>{
    let users = await usermodel.findOneAndDelete({_id : req.params.id})
    res.redirect("/read")
})

app.post('/search-data',async (req,res)=>{
    const { id } = req.body;
    if (mongoose.Types.ObjectId.isValid(id)) {
        let user = await usermodel.findOne({_id : id})
        res.json({user})
    } 
})  

app.post('/edit-user/:id',async (req,res)=>{
    const { id } = req.params;
    const { name, email, imageurl } = req.body;
    console.log(id,name,email)
    let user = await usermodel.findOneAndUpdate({_id : id},{imageurl,name,email},{new:true})
    res.redirect("/read")
})  
  
app.listen(3000)  