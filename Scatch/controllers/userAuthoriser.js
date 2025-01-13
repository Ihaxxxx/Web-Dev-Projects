const userModel = require("../models/user-model")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateToken } = require("../utillities/generatetoken")


module.exports.registerUser = async function (req, res) {
    try {
        let { email, fullname, password } = req.body;
        let user = await userModel.findOne({ email: email })
        if (user) {
            req.flash("error", "Account already exist")
            return res.redirect("/")
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message)
                else {
                    const user = await userModel.create({
                        email,
                        fullname,
                        password: hash,
                    })
                    let token = generateToken(user)
                    res.cookie("token", token)
                    res.redirect("/shop")
                }
            })
        })

    } catch (error) {
        console.log("nigga")
        console.log(error.message)
    }
}


module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body
    let user = await userModel.findOne({ email: email })
    if (!user) return res.send("Email or password incorect")
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user)
            res.cookie("token", token)
            res.redirect("/shop")
        } else {
            res.send("Email or password incorect")
        }
    })
}


module.exports.logout = async function (req, res) {
    res.cookie("token","")
    res.redirect("/")
}

