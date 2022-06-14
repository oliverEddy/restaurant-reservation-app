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
      const response = await fetch(`http://localhost:5001/restaurants/${id}`);
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
      <li key={restaurant.id}>
        <div className="restaurantBody">
          <img
            className="restaurantImage"
            alt="promo-img"
            src={restaurant.image}
          />
          <div className="restaurantName">{restaurant.name}</div>
          <div className="restaurantDescription">{restaurant.description}</div>
        </div>
      </li>
      <CreateReservation restaurantName={restaurant.name} />
    </>
  );
};

export default Restaurant;
