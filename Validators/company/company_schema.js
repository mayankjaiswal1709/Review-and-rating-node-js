const joi = require("joi");
const companyValidationSchema = {
  addCompany: joi
    .object({
      companyName: joi.string().max(20).required().messages({
        "string.max": "name length must be at most 20 characters",
      }),
      companyAdress: joi.string().max(50).required(),
      city: joi.string().required(),
      country: joi.string().required(),
      companyEmail: joi
        .string()
        .pattern(
          new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")
        )
        .required(),
      companyPhoneno: joi
        .number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .message("Invalid Mobile Number")
        .required(),
      companyWebsite: joi.string().required(),
    })
    .unknown(true),
};

module.exports = companyValidationSchema;
