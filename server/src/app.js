const express = require("express");
const cors = require("cors");
const { celebrate, Joi, errors, Segments } = require("celebrate");
const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: "https://reservationizr.com",
  issuerBaseURL: `https://dev-8sarvpl3.us.auth0.com/`,
});

const restaurantModel = require("./models/RestaurantModel");
const formatRestaurants = require("./formatRestaurants");
const ReservationModel = require("./models/ReservationModel");
const formatReservations = require("./formatReservations");
const validId = require("./utils/validId");

const app = express();
app.use(cors());
app.use(express.json());

app.get(
  "/restaurants",

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
app.get("/reservations", checkJwt, async (request, response, next) => {
  try {
    const { auth } = request;

    const reservations = await ReservationModel.find({
      userId: auth.payload.sub,
    });
    const formattedReservations = reservations.map((reservation) => {
      return formatReservations(reservation);
    });
    return response.status(200).send(formattedReservations);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});
app.get("/restaurants/:id", async (request, response, next) => {
  const { id } = request.params;

  if (!validId(id)) {
    return response.status(400).send({
      error: "invalid id provided",
    });
  }
  const restaurant = await restaurantModel.findById(id);

  if (restaurant === null) {
    return response.status(404).send({
      error: "restaurant not found",
    });
  }
  return response.status(200).send(formatRestaurants(restaurant));
});
app.post(
  "/reservations",
  checkJwt,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      partySize: Joi.number().required(),
      date: Joi.date().required(),
      restaurantName: Joi.string().required(),
    }),
  }),
  async (request, response, next) => {
    try {
      const { body, auth } = request;
      const reservationBody = {
        userId: auth.payload.sub,
        ...body,
      };
      const reservation = new ReservationModel(reservationBody);
      await reservation.save();
      return response.status(201).send(formatReservations(reservation));
    } catch (error) {
      if (error.name === "ValidationError") {
        error.status = 400;
      }
    }
  }
);
app.get("/reservations/:id", checkJwt, async (request, response, next) => {
  const { id } = request.params;

  if (!validId(id)) {
    return response.status(400).send({
      error: "invalid id provided",
    });
  }
  const reservation = await ReservationModel.findById(id);

  if (reservation === null) {
    return response.status(404).send({
      error: "not found",
    });
  }
  return response.status(200).send(formatReservations(reservation));
});

app.use(errors());
module.exports = app;
