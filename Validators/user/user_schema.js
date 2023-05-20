const joi = require("joi");
const userValidationSchema = {
    registerUser: joi
        .object({
            userName: joi.string().max(20).required().messages({
                "string.max": "name length must be at most 20 characters",
            }),
            userEmail: joi
                .string()
                .email({ tlds: { allow: false } })
                .trim()
                .required(),
            userPassword: joi
                .string()
                .pattern(
                    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
                .required(),
            userMobile: joi
                .number()
                .integer()
                .min(1000000000)
                .max(9999999999)
                .message("Invalid Mobile Number")
                .required(),
            userCity: joi.string().required(),
            userState: joi.string().required(),
        })
        .unknown(true),
    loginUser: joi
        .object({
            userEmail: joi.string().email().required(),
            userPassword: joi
                .string()
                .pattern(
                    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")
                )
                .required(),
        })
        .unknown(true),

    resetUser: joi.object({
        newPassword: joi
            .string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
            .required(),
        confirmPassword: joi
            .string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
            .required(),
    }),
};

module.exports = userValidationSchema;
