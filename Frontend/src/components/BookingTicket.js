import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Screen from './Screen';
import BoxPayment from '../components/BoxPayment';
import './BookingTicket.css';

import { AuthContext } from '../shared/context/auth-context';
import axios from 'axios';

function BookingTicket({
  movie,
  setIsLoading,
  setError,
  booked,
  setBooked,
  status,
  setStatus,
  bookingNum,
  setBookingNum,
}) {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  // const [province, setProvince] = useState('Hà Nội');
  // const [showMenuProvince, setShowMenuProvince] = useState(false);
  // const [statusDay, setStatusDay] = useState(movie.movieDay);
  const [cinema, setCinema] = useState([]);
  const [chooseTime, setChooseTime] = useState({
    idCinema: movie._id,
    cinemaName: '',
    cinemaAddress: '',
    time: '',
  });

  useEffect(() => {
    const fetchCinema = () => {
      axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/cinema',
      })
        .then((res) => {
          setCinema(res.data.cinema);
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    };
    fetchCinema();
  }, []);

  // const onGetValueProvine = (e) => {
  //   setProvince(e.target.innerHTML);
  //   setShowMenuProvince(false);
  // };

  // console.log(movie._id, booked, status, bookingNum);
  const fetchSeat = (chooseTime) => {
    setBooked([]);
    setStatus([]);
    setBookingNum(0);
    axios({
      method: 'get',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: `/v1/seat?fid=${movie._id}&cid=${chooseTime.idCinema}&st=${
        chooseTime.time.substr(0, 2) + '00'
      }`,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        setBooked([...res.data.seat]);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  const [isTouched, setIsTouched] = useState(false);

  const onGetShowTime = (e) => {
    setIsTouched(true);
    const obj = {
      idCinema: e.target.id,
      cinemaName: cinema.find((el) => el._id === e.target.id).name,
      cinemaAddress: cinema.find((el) => el._id === e.target.id).address,
      time: e.target.innerHTML,
    };
    setChooseTime(obj);
    fetchSeat(obj);
  };

  const [paymentInfo, setPaymentInfo] = useState({});

  const [paymentIsShown, setPaymentIsShown] = useState(false);
  const bookingHandler = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: `/v1/ticket`,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      data: {
        filmId: movie._id,
        cinemaId: chooseTime.idCinema,
        showTime: chooseTime.time.substr(0, 5),
        seat: status,
        room: 'P1',
        price: 50000 * bookingNum,
      },
    })
      .then((res) => {
        setIsLoading(false);
        navigate('/library');
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };
  const showPayment = () => {
    if (
      chooseTime.idCinema === '' ||
      chooseTime.time === '' ||
      status.length === 0
    ) {
      setError('Oops... Có vẻ bạn thiếu thông tin nào đó');
      return;
    }
    setPaymentIsShown(true);
    setPaymentInfo({
      time: chooseTime.time.substr(0, 5),
      cinemaName: chooseTime.cinemaName,
      cinemaAddress: chooseTime.cinemaAddress,
    });
  };
  return (
    <React.Fragment>
      <BoxPayment
        paymentIsShown={paymentIsShown}
        setPaymentIsShown={setPaymentIsShown}
        movie={movie}
        paymentInfo={paymentInfo}
        bookingHandler={bookingHandler}
      />
      <div className='Booking-container'>
        <div className='movie-booking'>
          <p>{movie.nameFilm}</p>
          <p>
            Khởi chiếu :{' '}
            {new Date(movie.movieDay).toLocaleString().split(',')[0]}
          </p>
        </div>
        <h2>Đặt vé xem phim</h2>
        <div className='booking-ticket'>
          {/* <div className='choose-province'>
            <h3>Chọn tỉnh</h3>
            <input
              type='text'
              name='province'
              className='province-input'
              readOnly='true'
              value={province}
              onClick={() => setShowMenuProvince(true)}
            />
            {showMenuProvince ? (
              <div className='province-list'>
                <p
                  className='province-item'
                  onClick={(e) => onGetValueProvine(e)}
                >
                  Hà Nội
                </p>
                <p
                  className='province-item'
                  onClick={(e) => onGetValueProvine(e)}
                >
                  Thanh Hóa
                </p>
                <p
                  className='province-item'
                  onClick={(e) => onGetValueProvine(e)}
                >
                  Thái Bình
                </p>
                <p
                  className='province-item'
                  onClick={(e) => onGetValueProvine(e)}
                >
                  Nghệ An
                </p>
                <p
                  className='province-item'
                  onClick={(e) => onGetValueProvine(e)}
                >
                  Nghệ An
                </p>

                <p
                  className='province-item'
                  onClick={(e) => onGetValueProvine(e)}
                >
                  Nghệ An
                </p>
              </div>
            ) : null}
          </div> */}

          {/* <div className='choose-cinema'>
            <div>
              <p>Tất cả</p>
            </div>
            <div>
              <img
                src='https://play-lh.googleusercontent.com/I26_hScON1NJJgBn3_4hbw4yw00n54PKHEUZxf5HJ2iDyc40O-JHdUPLCqFA7qKOfG8'
                alt=''
              />
            </div>
            <div>
              <img
                src='https://img.favpng.com/13/14/2/logo-lotte-cinema-font-png-favpng-X0z4jTFHKFNUHR8ER8mETcXKU.jpg'
                alt=''
              />
            </div>
            <div>
              <img
                src='https://cdn.tgdd.vn/GameApp/2/224709/Screentshots/lotteria-delivery-ung-dung-dat-ga-ran-lotteria-tai-nha-224709-logo-18-06-2020.png'
                alt=''
              />
            </div>
          </div> */}
          <h3>Chọn rạp</h3>
          <div className='choose-time-seat'>
            <div className='address-cinema'>
              {cinema.map((item, index) => {
                return (
                  <div className='address-cinema-item' key={item.id}>
                    <div className='header'>
                      <h3>{item.name}</h3>
                      <p>{item.address}</p>
                    </div>
                    <div className='showtime-content'>
                      {item.showTime.map((time, i) => (
                        <p
                          key={i}
                          className={
                            (chooseTime.idCinema === item._id) &
                            (time === chooseTime.time)
                              ? 'time-active'
                              : ''
                          }
                          id={item._id}
                          onClick={onGetShowTime}
                        >
                          {time}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <Screen
              isTouched={isTouched}
              booked={booked}
              status={status}
              setStatus={setStatus}
              setBookingNum={setBookingNum}
            ></Screen>
          </div>
          <div className='payment'>
            <div className='payment-info'>
              <p>
                Số lượng vé: <span>{bookingNum}</span>
              </p>
              <p>
                Thành tiền: <span>{bookingNum * 50000} VND</span>
              </p>
            </div>
            <div className='payment-btn'>
              <p onClick={() => navigate(-1)}>Hủy</p>
              <p onClick={showPayment}>Đặt vé</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BookingTicket;
