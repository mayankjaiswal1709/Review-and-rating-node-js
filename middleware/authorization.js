const JWT = require('jsonwebtoken')
const User = require('../models/userSchema')

const isUser = async (req, res, next) => {
    console.log(req.body.userRole)
    if (req.body.userRole === "user") {
        console.log('inside if:', req.body.userRole)
        next();
    }
     
    return res.status(401).json({
        status: false,
        message: "You are not Authorized person"
    })
}

const isAdmin = async (req, res, next) => {
    if (req.body.userRole === "admin") {
        next();
    }
    return res.status(401).json({
        status: false,
        message: "You are not Authorized person"
    })
}

module.exports={ isUser, isAdmin }