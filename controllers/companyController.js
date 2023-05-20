const companySchema = require('../models/companySchema');
const reviewSchema = require('../models/reviewSchema')

// add company 

const addCompany = async (req, res) => {
    const { companyName } = req.body
    const companyData = new companySchema(req.body)
    //console.log(companyName);
    try {
        const isCompanyExists = await companySchema.findOne({ companyName: companyName });
        //Sconsole.log(isCompanyExists)
        if (isCompanyExists) {
            return res.status(409).json({
                status: false,
                error: "company already exist",
            });
        } else {
            await companyData.save();
            return res.status(201).json({
                success: true,
                message: "Company added Successfully",
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// Show company record
const getAllcompanies = async (req, res) => {
    try {
        const companies = await companySchema.find();
        return res.status(200).json({
            status: true,
            companies: companies,
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            error: err.message
        })
    }
}

// show company by city

const searchCompanyByCity = async (req, res) => {
    const { city } = req.params
    const companyDataByCity = await companySchema.find({ city: city });
    try {
        if (companyDataByCity != "") {
            return res.status(200).json({
                status: true,
                companyDataByCity: companyDataByCity
            })
        } else {
            return res.status(404).json({
                status: false,
                message: "No data found "
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: false,
            error: err.message
        })
    }
}
// show company by id 
const getCompanyById = async (req, res) => {
    let cid = req.params.cid
    const comapnyDataById = await companySchema.findById(cid).lean();
    console.log(cid)
    try {
        if (comapnyDataById != "") {
            return res.status(200).json({
                status: true,
                companyDataById: comapnyDataById
            })
        } else {
            return res.status(404).json({
                status: false,
                message: err.meassage
            })

        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: meassge
        })
    }
}

// company review comment

const companyReviewComment = async (req, res) => {
    let cid = req.params.cid;
    try {
        const companyDetails = await companySchema.findById(cid).lean();
        const comment = await reviewSchema.find({ companyId: cid })
            .populate({
                path: "userId",
                select: "userName profilePic"
            })
        const commentAndCompanyName = {
            companyDetails: companyDetails,
            comments: comment,
        }
        return res.status(200).json({
            companyDetails: commentAndCompanyName,
            status: true,
            message: "Company details find successfully"
        });
    } catch (err) {
        return res.status(200).json({
            status: false,
            error: err.message
        })
    }
}

module.exports = {
    addCompany, getAllcompanies, searchCompanyByCity, getCompanyById, companyReviewComment
}
