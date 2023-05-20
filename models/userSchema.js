    const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userName: {
         type: String,
         //require : true,  
    },
    userEmail: {
        type: String,
        // require : true,
    },
    userPassword: {
        type: String,
        //require : true,
        default: false
    },

    userMobile: {
        tyep: Number,
        //require:true
    },
    userCity: {
        type: String,
        //require : true,
    },
    userState: {
        type: String,
        //require : true,
    },
    profilePic: {
        type: String,
    },

    isActive: {
        type: Boolean,
        //require: true,
        dafault: true
    },
    userRole: {
        type: String,
        default: "user",
    },
})
userSchema.set('timestamps', true)
module.exports = mongoose.model('user', userSchema)