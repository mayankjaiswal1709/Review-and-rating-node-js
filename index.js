const express = require("express");
require('dotenv').config()
require('./models/config')
const reviewRouter = require('./routes/mainRoutes')
const app = express();
app.use(express.json()); //middleware



// const cron=require('node-cron');

// cron.schedule("*/3 * * * * *",()=>{
//     console.log("running a task every 4 second");
//     service.transpoter.sendMail(service.mailOptions,(error,info)=>{
//         if(error){
//             console.log(error)
//         }else{
//             console.log("Email Sent successfully",info.response);
//             res.status(200).json({
//                 messege:`email sent Successfully ${info.response}`
//             })
//         }
//     })
// });



// app.get('/sendmail', async(req,res)=>{
// service.transpoter.sendMail(service.mailOptions,(error,info)=>{
//     if(error){
//         console.log(error)
//     }else{
//         console.log("Email Sent successfully",info.response);
//         res.status(200).json({
//             messege:`email sent Successfully ${info.response}`
//         })
//     }
// })
// })





app.use('/', reviewRouter);//middleware

// console.log('helo mj env is running', process.env.port);
const server = app.listen(process.env.port, (req, res) => {
    console.log(`server is running on port :${process.env.port}`);
})

module.exports = server 