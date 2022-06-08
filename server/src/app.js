const express = require("express");
const cors = require("cors");
const { celebrate, Joi, errors, Segments } = require("celebrate");

const restaurantModel = require("./models/RestaurantModel");
const formatRestaurants = require("./formatRestaurants");
const reservationModel = require("./models/ReservationModel");
const formatReservations = require("./formatReservations");

const app = express();
app.use(cors());
app.use(express.json());

app.get(
  "/restaurants",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
    }),
  }),
  async (request, response, next) => {
    try {
      const restaurants = await restaurantModel.find({});
      const formattedRestaurants = restaurants.map((restaurant) => {
        return formatRestaurants(restaurant);
      });
      return response.status(200).send(formattedRestaurants);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);
app.get(
  "/reservations",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      partySize: Joi.string().required(),
      date: Joi.date().required(),
      userId: Joi.string().required(),
      restaurantName: Joi.string().required(),
    }),
  }),
  async (request, response, next) => {
    try {
      const reservations = await reservationModel.find({});
      const formattedReservations = reservations.map((reservation) => {
        return formatReservations(reservation);
      });
      return response.status(200).send(formattedReservations);
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

// app.use(errors());
module.exports = app;
