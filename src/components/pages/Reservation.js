import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

import ReservationForm from "../ReservationForm";
import "../css/Reservation.css";

const initialState = {
  name: "",
  date: "",
  time: "",
  availableTimes: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
  numGuests: 2,
  occasion: "None",
};

const ACTION = {
  NAME: "updateName",
  DATE: "updateDate",
  TIME: "updateTime",
  UPDATE_INITIAL_AVAILABLE_TIMES: "updateInitialAvailableTimes",
  AVAILABLE_TIMES: "updateAvailableTimes",
  RESET_TIMES: "resetAvailableTimes",
  NR_GUESTS: "updateGuests",
  OCCASION: "updateOccasion",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateName":
      return { ...state, name: action.payload };
    case "updateDate":
      return { ...state, date: action.payload };
    case "updateTime":
      return { ...state, time: action.payload };

    case "updateInitialAvailableTimes":
      return { ...state, availableTimes: action.payload };

    case "updateAvailableTimes":
      return {
        ...state,
        availableTimes: state.availableTimes.filter(
          (time) => time !== action.payload
        ),
      };
    case "resetAvailableTimes":
      return { ...state, availableTimes: initialState.availableTimes };

    case "updateGuests":
      return { ...state, numGuests: action.payload };
    case "updateOccasion":
      return { ...state, occasion: action.payload };
    default:
      return state;
  }
};

export default function Reservation() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  // ----------------------------------------------------- API Code START
  const seededRandom = function (seed) {
    var m = 2 ** 35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
      return (s = (s * a) % m) / m;
    };
  };
  const fetchAPI = function (date) {
    let result = [];
    let random = seededRandom(new Date(date).getTime());

    for (let i = 17; i <= 23; i++) {
      if (random() < 0.5) {
        result.push(i + ":00");
      }
      if (random() < 0.5) {
        result.push(i + ":30");
      }
    }
    return result;
  };
  const submitAPI = function (formData) {
    setReservationConfirmed(true);
    return;
  };
  // ----------------------------------------------------- API Code END
  useEffect(() => {
    const fetchAvailableTimes = (date) => {
      const response = fetchAPI(date);
      dispatch({
        type: ACTION.UPDATE_INITIAL_AVAILABLE_TIMES,
        payload: response,
      });
      return;
    };
    fetchAvailableTimes(state.date);
  }, [state.date]);

  function handleFormSubmit() {
    submitAPI(state);
    console.log(state);
  }
  const handleConfirmationRedirect = (e) => {
    setReservationConfirmed(false);
    console.log(reservationConfirmed);
    return;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        dispatch({ type: ACTION.NAME, payload: value });
        return;
      case "date":
        dispatch({ type: ACTION.DATE, payload: e.target.value });
        return;
      case "time":
        dispatch({ type: ACTION.TIME, payload: e.target.value });
        // dispatch({ type: ACTION.AVAILABLE_TIMES, payload: e.target.value });
        return;
      case "numGuests":
        dispatch({ type: ACTION.NR_GUESTS, payload: parseInt(e.target.value) });
        return;
      case "numGuestsDecrease":
        e.preventDefault();
        if (state.numGuests > 1) {
          dispatch({
            type: ACTION.NR_GUESTS,
            payload: parseInt(state.numGuests) - 1,
          });
        }
        return;
      case "numGuestsIncrease":
        e.preventDefault();
        if (state.numGuests < 10) {
          dispatch({
            type: ACTION.NR_GUESTS,
            payload: parseInt(state.numGuests) + 1,
          });
        }
        return;
      case "occasion":
        dispatch({ type: ACTION.OCCASION, payload: e.target.value });
        return;
      default:
        return state;
    }
  };

  return (
    <>
      <div className="reservation">
        <h1 className="res-title">Reservation</h1>
        <div className="res-main">
          <ReservationForm
            initialValues={state}
            state={state}
            ACTION={ACTION}
            dispatch={dispatch}
            onSubmit={handleFormSubmit}
            handleFormChange={handleFormChange}
          />
          <p className="res-info">
            Thank you for considering Little Lemon for your upcoming
            reservation.
            <br />
            Our restaurant is open Monday through Saturday from{" "}
            <span className="res-highlight">5:00 pm to 10:00 pm</span>. We are
            closed on Sundays.
            <br />
            We are excited to provide you with an exceptional dining experience
            and look forward to welcoming you soon. If you have any questions or
            special requests, please don't hesitate to contact us.
            <br />
          </p>
        </div>
        <div>
          {reservationConfirmed ? (
            <div className="res-confirmation-bg">
              <div className="res-confirmation">
                <p className="res-confirmation-text">
                  Thank you Mr./Mrs. {state.name}
                  <br />
                  We have received your reservation.
                  <br />
                  Thank you for booking at the Little Lemon restaurant.
                </p>
                <div className="res-confirmation-details">
                  Your reservation details:
                  <br />
                  Date: {state.date}
                  <br />
                  Time: {state.time}
                  <br />
                  Guests: {state.numGuests}
                  <br />
                  Occasion: {state.occasion}
                  <br />
                  <Link
                    to="/"
                    className="res-confirmation-button"
                    aria-label="On Click"
                    onClick={handleConfirmationRedirect}
                  >
                    Go to Homepage
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
