const express = require('express')
const router =express.Router()

const user = require('../controllers/userController')
const validate=require('../Validators/user/user_validation')
const { upload }=require('../middleware/imageStorage')
const auth=require('../middleware/authmiddleware')
const authorization=require('../middleware/authorization')

router.post('/signup',upload.single("profilePic"),validate.registerUserValidation,user.userSingnup)
router.post('/loginuser',validate.loginUserValidation,user.login)
router.post('/forgetpasswordemail',user.forgetPassword)
router.post('/resetpassword/:userId/:token',validate.resetUserValidation,user.resetPassword)

module.exports = router
