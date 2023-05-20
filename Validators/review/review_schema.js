const joi = require("joi");
const reviewValidationSchema = {
  addReview: joi
    .object({
      subject: joi.string().max(200).min(10).required()
        .messages({
          "string.max": "name length must be at most 20 characters",
        }),
      review: joi.string().max(200).min(10).required(),
      rating: joi.number().max(5).min(0).required(),
    })
    .unknown(true),
};

module.exports = reviewValidationSchema;
