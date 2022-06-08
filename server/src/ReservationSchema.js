const Joi = require("Joi");

const schema = Joi.object().keys({
  partySize: Joi.string().required(),
  date: Joi.date().required(),
  userId: Joi.string().required(),
  restaurantName: Joi.string().required(),
});
module.exports = schema;
