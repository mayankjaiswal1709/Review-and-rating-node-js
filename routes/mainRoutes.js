const express=require('express')
const router=express.Router();

const userRouter=require('../routes/userRouter')
const companyRouter=require('../routes/companyRouter')
const reviewRouter=require('../routes/reviewRouter')
const CRUDReview=require('../routes/reviewCRUDRouter')

router.use('/user',userRouter);
router.use('/company',companyRouter);
router.use('/review',reviewRouter);
router.use('/crudreview',CRUDReview)

module.exports=router;