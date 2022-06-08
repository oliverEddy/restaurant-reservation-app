const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationsSchema = new Schema({
  partySize: { type: Number, required: true },
  date: { type: Date, required: true },
  userId: { type: String, required: true },
  restaurantName: { type: String, required: true },
});
const ReservationModel = mongoose.model("Reservation", reservationsSchema);
module.exports = ReservationModel;
