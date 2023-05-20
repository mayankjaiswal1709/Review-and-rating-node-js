const express = require('express')
const router = express.Router()
const Company  = require('../controllers/companyController')
const { upload }=require('../middleware/imageStorage')
//const auth=require('../middleware/authmiddleware')
//const { isUser,isAdmin }=require('../middleware/authorization')


router.post("/addcompany", upload.single("companyLogo"), Company.addCompany);
router.get("/companieslist",Company.getAllcompanies);
router.get("/searchcompanybycity/:city",Company.searchCompanyByCity);
router.get("/getcompanybyid/:cid",Company.getCompanyById);
router.get("/reviewdetails/:cid",Company.companyReviewComment);


module.exports = router;