const express = require("express");
const cors = require("cors");
const app = express();
const restaurantModel = require("./models/RestaurantModel");
const formatRestaurants = require("./formatRestaurants");

app.use(cors());
app.use(express.json());

app.get("/restaurants", async (request, response) => {
  const restaurants = await restaurantModel.find({});
  const formattedRestaurants = restaurants.map((restaurant) => {
    return formatRestaurants(restaurant);
  });
  return response.status(200).send(formattedRestaurants);
});

module.exports = app;
