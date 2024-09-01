const Joi = require('joi');
const productSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.string().required(),
    desc: Joi.string().required()
});
const reviewSchema = Joi.object({
    rating: Joi.number().required(),
    comment: Joi.string().required()
});
module.exports = { productSchema, reviewSchema };