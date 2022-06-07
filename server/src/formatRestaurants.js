const formatRestaurants = (restaurant) => {
  return {
    id: restaurant._id,
    name: restaurant.name,
    description: restaurant.description,
    image: restaurant.image,
  };
};
module.exports = formatRestaurants;
