const mongoose = require("mongoose")
const reviewSchema = new mongoose.Schema({
    subject: {
        type: String,
        require: true
    },
    review: {
        type: String,
        require: true
    },
    rating: {
        type: String,
        require: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref: "company"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "user"
    },
    isActive: {
        type: Boolean,
        require: true
    },

})
reviewSchema.set('timestamps', true)
module.exports = mongoose.model('review', reviewSchema)