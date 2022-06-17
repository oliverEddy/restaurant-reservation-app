import "./ReservationList.css";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ReservationList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/reservations`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      setReservations(data);
    };

    fetchData();
  }, [getAccessTokenSilently]);

  if (reservations.length === 0) {
    return (
      <>
        <h1 className="Header">Upcoming reservations</h1>
        <p>You don't have any reservations.</p>
        <Link to={"/"}>
          <p className="details">View the restaurants</p>
        </Link>
      </>
    );
  }
  return (
    <>
      <div className="reservationContainer">
        <h1 className="Header">Upcoming reservations</h1>

        <ul className="reservations">
          {reservations.map((reservation) => {
            return (
              <li key={reservation.id}>
                <div className="reservationBody">
                  <div className="name">{reservation.restaurantName}</div>
                  <div className="dateForReservationList">
                    {formatDate(reservation.date)}
                  </div>
                  <div className="link">
                    <Link
                      className="linkForViewDetails"
                      to={`/reservations/${reservation.id}`}
                    >
                      <p className="details">View details→</p>
                    </Link>
                  </div>
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
