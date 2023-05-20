const express = require('express')
const router =express.Router()
const review = require('../controllers/reviewController')
const validate=require('../Validators/review/review_validation')

router.post('/addReview/:cid/:uid',validate.reviewValidation,review.addReview)

module.exports = router