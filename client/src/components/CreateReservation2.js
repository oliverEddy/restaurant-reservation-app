import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";

const CreateReservation = () => {
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState("");
  // const [restaurantName, setRestaurantName] = useState("");

  const [published, setPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const handelSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const body = {
      partySize,
      date,
    };
    const accessToken = await getAccessTokenSilently();
    try {
      const response = await fetch(`https://localhost:5001/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        setIsError(true);
        setErrorStatus(response.status);
      } else {
        setIsLoading(false);
        navigate("/reservations");
      }
    } catch (error) {
      setIsError(true);
      setErrorStatus("unknown");
    }
  };
  if (isError) {
    return <>An error has occurred. {errorStatus}.</>;
  }

  return (
    <>
      <div>
        <form onSubmit={handelSubmit}>
          <label htmlFor="partySize">Number of guests</label>
          <input
            id="partySize"
            type="text"
            value={partySize}
            onChange={(event) => {
              const value = event.target.value;
              setPartySize(value);
            }}
          />
          <label htmlFor="date">Date</label>
          <DatePicker
            selected={date}
            showTimeSelect
            onChange={(date) => setDate(date)}
            dateFormat="Pp"
            required
          />

          <button disabled={isLoading}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateReservation;
