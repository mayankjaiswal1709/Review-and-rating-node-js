const nodemailer = require("nodemailer");
require("dotenv").config()

var transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
})



module.exports = { transpoter }


