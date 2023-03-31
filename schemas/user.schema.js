const Joi = require('joi');

const id = Joi.string()
  .uuid();

const name = Joi.string()
  .min(1)
  .max(50);

const gender = Joi.string()
  .min(1);

const phone = Joi.string()
  .pattern(/^(\+\d{1,3})?(\d{10})/);

const email = Joi.string()
  .email();

const createUserSchema = Joi.object({
  name: name.required(),
  gender: gender.required(),
  phone: phone.required(),
  email: email.required()
});

const updateUserSchema = Joi.object({
  name,
  gender,
  phone,
  email
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema
}
