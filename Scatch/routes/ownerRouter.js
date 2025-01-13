const express = require('express')
const router = express.Router()
const ownerModel = require("../models/owner-model")


router.get("/",function(req,res){
    res.send("meow")
})




if (process.env.NODE_ENV == "development") {
    router.post("/create",async function(req,res){
        let owners = await ownerModel.find()
        if (owners.length>0) {
            return res.status(500).send("You dont have permission to create owner")
        }
        let {fullname,email,password} = req.body
        let createdowner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdowner)
    })
}

router.get("/admin",function(req,res){
    let success = req.flash("sucess")
    res.render("createproducts",{success})
})




module.exports = router