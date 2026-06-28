const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  author: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = (data) =>
  postSchema.validate(data, { abortEarly: false });