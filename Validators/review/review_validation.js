const review = require('../review/review_schema')

module.exports = {
    reviewValidation: async (req, res, next) => {
        const value = await review.addReview.validate(req.body, { abortEarly: false })
        if (value.error) {
            res.json({
                success: false,
                message: value.error.details[0].message
            })

        } else {
            next();
        }
    }
}