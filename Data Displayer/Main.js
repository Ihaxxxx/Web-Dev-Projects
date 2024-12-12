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

app.post('/edit',async (req,res)=>{
    const { id } = req.body;
    if (mongoose.Types.ObjectId.isValid(id)) {
        let user = await usermodel.findOne({_id : id})
        res.json({user})
    } 
})  

  
app.listen(3000)  