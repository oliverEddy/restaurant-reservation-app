import "./ReservationList.css";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ReservationList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [reservations, setReservations] = useState([]);

  const fetchData = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`http://localhost:5001/reservations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    setReservations(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="">
        <h1>Upcoming reservations</h1>

        <ul className="">
          {reservations.map((reservation) => {
            return (
              <li key={reservation.id}>
                <div className="">
                  <div className="">{reservation.name}</div>
                  <div className="">{formatDate(reservation.date)}</div>
                  <Link to={`/reservations/${reservation.id}`}>
                    <p className="details">View details→</p>
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
