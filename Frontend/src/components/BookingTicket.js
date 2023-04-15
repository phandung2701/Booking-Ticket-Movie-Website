import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "./Screen";
import BoxPayment from "../components/BoxPayment";
import "./BookingTicket.css";

import { AuthContext } from "../shared/context/auth-context";
import axios from "axios";
import Snacks from "./Snacks";
import { numberToString } from "../utils";

function BookingTicket({
  movie,
  cinema,
  province,
  showTime,
  screen,
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
  const [showMenuProvince, setShowMenuProvince] = useState(false);
  const [day,setDay] = useState([])
  const [chooseProvince,setChooseProvince] = useState('')
  const [chooseDay,setChooseDay] = useState('')
  const [chooseCinema,setChooseCinema] = useState('')
  const [chooseShowTime,setChooseShowTime] = useState('')
  const [listCinema,setListCinema] = useState([])
  const [listShowTime,setListShowTime] = useState([])


  const convertDate = (timeList)=>{
    let dayList = timeList.reduce((acc,cur)=>{
      let time = acc.find(ele => ele.day == new Date(cur.movieDay).getDate())
      if(time){
        time.time.push(cur.time)
      }
      else{
        acc.push({day : new Date(cur.movieDay).getDate(),
          month : new Date(cur.movieDay).getMonth()+1,
          year:new Date(cur.movieDay).getFullYear()
          ,time : [cur.time]})
      }
      return acc
    },[])
    return dayList
  }
  // const [statusDay, setStatusDay] = useState(movie.movieDay);
  const [chooseTime, setChooseTime] = useState({
    idCinema: movie?.sid,
    cinemaName: "",
    cinemaAddress: "",
    time: "",
  });

  const [selectedSnacks, setSelectedSnacks] = useState([]);
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
      method: "get",
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: `/v1/seat?fid=${movie._id}&cid=${chooseTime.idCinema}&st=${
        chooseTime.time.substr(0, 2) + "00"
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

  const handleShowTime = (ele,e) => {
    e.stopPropagation()
    setChooseShowTime(ele.sid)
  };

  const [paymentInfo, setPaymentInfo] = useState({});

  const [paymentIsShown, setPaymentIsShown] = useState(false);
  const bookingHandler = () => {
    setIsLoading(true);
    axios({
      method: "post",
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
        room: "P1",
        price: 50000 * bookingNum,
      },
    })
      .then((res) => {
        setIsLoading(false);
        navigate("/library");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };
  const showPayment = () => {
    if (
      chooseTime.idCinema === "" ||
      chooseTime.time === "" ||
      status.length === 0
    ) {
      setError("Oops... Có vẻ bạn thiếu thông tin nào đó");
      return;
    }
    setPaymentIsShown(true);
    setPaymentInfo({
      time: chooseTime.time.substr(0, 5),
      cinemaName: chooseTime.cinemaName,
      cinemaAddress: chooseTime.cinemaAddress,
    });
  };
  const handleChooseProvince = (item)=>{
    let arr = []
    setChooseCinema('')
    setChooseShowTime('')
    if(chooseProvince === item.sid){
      arr = []
      setChooseProvince('')
      setListCinema(arr)
      return
    }
    arr = cinema.filter(ele => ele.provinceId === item.sid)
    setChooseProvince(item.sid)
    setListCinema(arr)
  }
  const handleChooseCinema = (item)=>{
    let listScreen = screen.filter(ele => ele.cinemaId === item.sid).reduce((acc,cur)=> ([...acc,cur.sid]),[])
    let showTimeList = showTime.filter(ele => listScreen.includes(ele.screenId))
    setListShowTime(showTimeList)
    setChooseCinema(item.sid)
  }
  const handleChooseDay = (item)=>{
      setChooseDay(item)
  }
  console.log(chooseDay)
  return (
    <React.Fragment>
      <BoxPayment
        paymentIsShown={paymentIsShown}
        setPaymentIsShown={setPaymentIsShown}
        movie={movie}
        paymentInfo={paymentInfo}
        bookingHandler={bookingHandler}
      />
      <div className="Booking-container">
        <div className="movie-booking">
          <p>{movie?.name}</p>
          <p>
            Phát hành :{" "}
            {new Date(movie?.releaseDate).toLocaleString().split(",")[0]}
          </p>
        </div>
        <h2>Đặt vé xem phim</h2>
        <div className="booking-ticket">
        <h3>Chọn ngày</h3>
        <div className="choose-day">
         {convertDate(showTime).map(((ele,idx) => (
            <div key={idx} className={(chooseDay?.day == ele.day && chooseDay?.month == ele.month && chooseDay.year == ele.year)? "item-day active" :"item-day" } onClick={()=>handleChooseDay(ele)}>
              {ele.day}/{ele.month}/{ele.year}
            </div>
          )))}
         </div>
         <h3>Chọn tỉnh</h3>
        <div className="choose-day">
         {province.map(((ele,idx) => (
            <div key={ele.sid} className={`${ele.sid === chooseProvince? "active item-day" : "item-day"}`} onClick={()=>handleChooseProvince(ele)}>
              {ele.name}
            </div>
          )))}
         </div>
          {chooseProvince && <h3>Chọn rạp</h3>}
          {chooseProvince && (
            <div className="choose-time-seat">
              <div className="address-cinema">
                {listCinema.map((item, index) => {
                  return (
                    <div className={item.sid === chooseCinema ? "address-cinema-item active" : "address-cinema-item" } key={item.sid}
                    onClick={()=>handleChooseCinema(item)}
                    >
                      <div className="header">
                        <h3>{item.name}</h3>
                        <p>{item.address}</p>
                      </div>
                      <div className="showtime-content">
                        {chooseCinema && listShowTime?.map((ele, i) => (
                          <p
                            key={i}
                            className={
                              (chooseShowTime === ele.sid) 
                                ? "time-active"
                                : ""
                            }
                            id={item.sid}
                            onClick={(e)=> handleShowTime(ele,e)}
                          >
                            {ele.time}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              {chooseShowTime && <Screen
                isTouched={isTouched}
                booked={booked}
                status={status}
                setStatus={setStatus}
                setBookingNum={setBookingNum}
              ></Screen>}
            </div>
          )}
          <Snacks
            isActive={true}
            selectedSnacks={selectedSnacks}
            setSelectedSnacks={setSelectedSnacks}
          />
          <div className="payment">
            <div className="payment-info">
              <p>
                Số lượng vé: <span>{bookingNum}</span>
              </p>
              <p>
                Thành tiền:{" "}
                <span>
                  {numberToString(
                    bookingNum * 50000 +
                      selectedSnacks.reduce((accumulatedPrice, snack) => {
                        return accumulatedPrice + snack.price * snack.count;
                      }, 0)
                  )}{" "}
                  VND
                </span>
              </p>
            </div>
            <div className="payment-btn">
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
