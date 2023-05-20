const company=require('./company_schema')

module.exports = {
    addCompanyUserValidation: async (req, res, next) => {
        const value = await company.addCompany.validate(req.body,{ abortEarly: false })
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