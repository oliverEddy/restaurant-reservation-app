const Joi = require("Joi");

const schema = Joi.object().keys({
  partySize: Joi.number().min(1).required(),
  date: Joi.string().required(),
  restaurantName: Joi.string().required(),
});
module.exports = schema;
