import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import "./Restaurant.css";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/restaurants/${id}`
      );
      if (response.ok === false) {
        setIsNotFound(true);
        return;
      }
      const data = await response.json();
      setRestaurant(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isNotFound) {
    return (
      <>
        <p className="error">Sorry! We can't find that restaurant</p>
      </>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="restaurantContainer" key={restaurant.id}>
        <div className="restaurantBody">
          <img
            className="restaurantImage"
            alt="promo-img"
            src={restaurant.image}
          />
          <h1 className="restaurantName">{restaurant.name}</h1>
          <p className="restaurantDescription">{restaurant.description}</p>
        </div>
        <CreateReservation
          className="CreateReservation"
          restaurantName={restaurant.name}
        />
      </div>
    </>
  );
};

export default Restaurant;
