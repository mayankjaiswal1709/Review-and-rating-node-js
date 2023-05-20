const express = require('express')
const router =express.Router()
const reviewDemo=require('../controllers/reviewCRUDController')

router.post('/addreview',reviewDemo.addReviewDemo)
router.get('/showallreview',reviewDemo.showAllReview)
router.patch('/updatereview/:id',reviewDemo.updateReviewById)
router.delete('/deletereview/:id',reviewDemo.deleteReviewById)

module.exports = router