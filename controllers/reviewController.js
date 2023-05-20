const companySchema = require('../models/companySchema')
const reviewSchema = require('../models/reviewSchema')

const addReview = async (req, res) => {
    const { cid, uid } = req.params
    try {
        const reviewData = new reviewSchema(req.body);
        if (reviewSchema) {
            reviewData.companyId = cid,
                reviewData.userId = uid,
                await reviewData.save()
            res.status(200).json({
                status: true,
                message: "review add successfully",
                Data: reviewData
            });
        }
        else {
            res.status(404).json({
                status: false,
                message: "Company not found"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}
module.exports = {
    addReview,
}