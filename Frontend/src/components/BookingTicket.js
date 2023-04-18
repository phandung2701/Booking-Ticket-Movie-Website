import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Screen from "./Screen";
import BoxPayment from "../components/BoxPayment";
import "./BookingTicket.css";

import { AuthContext } from "../shared/context/auth-context";
import axios from "axios";
import Snacks from "./Snacks";
import { numberToString } from "../utils";
import Modal from "../shared/components/Modal";
import Button from "../shared/components/Button";

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
  price,
  setPrice,
  bookingNum,
  setBookingNum,
}) {
  const auth = useContext(AuthContext);
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
  const navigate = useNavigate();
  // const [province, setProvince] = useState('Hà Nội');
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


  const [selectedSnacks, setSelectedSnacks] = useState([]);
 
  const [isTouched, setIsTouched] = useState(false);

  const handleShowTime = async(ele,e) => {
    e.stopPropagation()
    if(ele?.sid){
      let seatBooked = await instance.post('/v1/seat/booked',{showTimeId:ele.sid})
      setBooked(seatBooked.data.booked)
    }
    setChooseShowTime(ele?.sid)
  };

  const [paymentInfo, setPaymentInfo] = useState({});

  const [paymentIsShown, setPaymentIsShown] = useState(false);
  const bookingHandler = async() => {
    try{
      setIsLoading(true);
      await instance.post('/v1/booking/create',{
          movieDay: showTime.filter(ele => ele.sid === chooseShowTime)[0]?.movieDay,
          movie : movie,
          cinema : cinema.filter(ele => ele.sid === chooseCinema),
          showTimeId: chooseShowTime,
          seat: status,
          price : price +
          selectedSnacks.reduce((accumulatedPrice, snack) => {
            return accumulatedPrice + snack.price * snack.count;
          }, 0),
          customerId : auth.sid,
          time : showTime.filter(ele => ele.sid === chooseShowTime)[0]?.time,
          foodId : selectedSnacks,
          comboId : selectedSnacks,
      })
      setIsLoading(false);
      if(window.confirm("Đặt vé thành công")){
        navigate("/library");
      }
    }
    catch(err){
      setIsLoading(false);
      setError(err.response.data.error);
    }
   
  };
  const showPayment = () => {
    if (
      status.length === 0
    ) {
      setError("Oops... Có vẻ bạn thiếu thông tin nào đó");
      return;
    }
    setPaymentIsShown(true);
    setPaymentInfo({
      time: showTime.filter(ele => ele.sid === chooseShowTime)[0]?.time,
      cinemaName: cinema.filter(ele => ele.sid === chooseCinema)[0]?.name,
      cinemaAddress:cinema.filter(ele => ele.sid === chooseCinema)[0]?.address,
      seat: status
    });
  };
  const handleChooseProvince = (item)=>{
    let arr = []
    setChooseCinema('')
    setChooseShowTime('')
    setStatus([])
    setPrice(0)
    setBookingNum(0)
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
                        { (listShowTime.length > 0 && item.sid === chooseCinema ) ?(
                           listShowTime.map((ele, i) => (
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
                          ))
                        ):(
                          item.sid === chooseCinema && <div className="no-showtime">
                           Chưa có xuất chiếu
                         </div>
                       )}
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
                price = {price}
                setPrice ={setPrice}
                setBookingNum={setBookingNum}
              ></Screen>}
            </div>
          )}
          {status.length > 0 &&  (
            <Snacks
              isActive={true}
              selectedSnacks={selectedSnacks}
              setSelectedSnacks={setSelectedSnacks}
            />
          )}
          {status.length> 0 && <div className="payment">
            <div className="payment-info">
              <p>
                Số lượng vé: <span>{bookingNum}</span>
              </p>
              <p>
                Thành tiền:{" "}
                <span>
                  {numberToString(
                    price +
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
          </div>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default BookingTicket;
