import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import BookingTicket from '../components/BookingTicket';

import LoadingSpinner from '../shared/components/LoadingSpinner';
import ErrorModal from '../shared/components/ErrorModal';

import axios from 'axios';

import './Booking.css';

const Booking = () => {
  const [booked, setBooked] = useState([]);
  const [cinema, setCinema] = useState([]);
  const [province, setProvince] = useState([]);
  const [showTime, setShowTime] = useState([]);
  const [screen, setScreen] = useState([]);
  const [status, setStatus] = useState([]);

  const [bookingNum, setBookingNum] = useState(0);
  const [price, setPrice] = useState(0);
  const { movieId } = useParams();

  const [error, setError] = useState(null);
  const clearError = () => {
    setError(null);
  };
  const [isLoading, setIsLoading] = useState(false);

  const [movie, setMovie] = useState({});

  const fetchMovie = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: `/v1/movie/${movieId}`,
    })
      .then((res) => {
        setMovie(res.data.movie);
        setCinema(res.data.cinema);
        setScreen(res.data.screen);
        setProvince(res.data.province);
        setShowTime(res.data.showTime)
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="booking-wrapper">
        <Navbar tab={2} />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <BookingTicket
            booked={booked}
            setBooked={setBooked}
            status={status}
            setStatus={setStatus}
            bookingNum={bookingNum}
            setBookingNum={setBookingNum}
            movie={movie[0]}
            setIsLoading={setIsLoading}
            setError={setError}
            cinema = {cinema}
            province = {province}
            screen = {screen}
            showTime = {showTime}
            price = {price}
            setPrice = {setPrice}
          />
        )}

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Booking;
