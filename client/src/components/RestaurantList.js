import "./RestaurantList.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}//restaurants`
    );
    const data = await response.json();
    setRestaurants(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="restaurantContainer">
        <h1>Restaurants</h1>
        <ul className="restaurants">
          {restaurants.map((restaurant) => {
            return (
              <li key={restaurant.id}>
                <div className="restaurantBody">
                  <img
                    className="restaurantImage"
                    alt="promo-img"
                    src={restaurant.image}
                  />
                  <div className="restaurantName">{restaurant.name}</div>
                  <div className="restaurantDescription">
                    {restaurant.description}
                  </div>
                  <Link className="link" to={`/restaurants/${restaurant.id}`}>
                    <p className="reserveNow">Reserve now→</p>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default RestaurantList;
