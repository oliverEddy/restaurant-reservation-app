const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationsSchema = new Schema({
  partySize: { type: Number, required: true },
  date: { type: String, required: true },
  restaurantName: { type: String, required: true },
});
const ReservationModel = mongoose.model("Reservation", reservationsSchema);
module.exports = ReservationModel;

/* ({
  partySize: { type: Number, min: 0, required: true },
  date: { type: String, default: Date.now, required: true },
  restaurantName: { type: String, required: true },
}); */
