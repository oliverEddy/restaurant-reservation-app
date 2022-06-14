import "./ReservationList.css";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const fetchData = async () => {
    const response = await fetch("http://localhost:5001/reservations");
    const data = await response.json();
    setReservations(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="restaurantContainer">
        <h1>Upcoming reservations</h1>
        <ul className="restaurants">
          {reservations.map((reservation) => {
            return (
              <li key={reservation.id}>
                <div className="">
                  <div className="">{reservation.name}</div>
                  <div className="">{formatDate(reservation.date)}</div>
                  <Link to={`/reservations/${reservation.id}`}>
                    <p className="details">Reserve now→</p>
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

export default ReservationList;
