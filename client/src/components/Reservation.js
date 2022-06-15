import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import "./Reservation.css";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`http://localhost:5001/reservations/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok === false) {
        setIsNotFound(true);
        return;
      }

      const data = await response.json();
      setReservation(data);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (isNotFound) {
    return (
      <>
        <p className="error">Sorry! We can't find that reservation</p>
      </>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Reservation</h1>

      <div className="reservation">
        <h2 className="restaurantName">{reservation.restaurantName} </h2>
        <div className="date">{formatDate(reservation.date)}</div>
        <div className="">
          <span className="partySize">Party size: </span>
          {reservation.partySize}
        </div>
      </div>

      <Link className="backButton" to="/">
        ←Back to reservation
      </Link>
    </>
  );
};

export default Reservation;
