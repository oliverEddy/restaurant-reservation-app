const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});
const restaurantModel = mongoose.model("restaurants", restaurantSchema);
module.exports = restaurantModel;
