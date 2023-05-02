import React, { useState, useContext, useEffect, Fragment } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import axios from "axios";
import Modal from "../../shared/components/Modal";
import ErrorModal from "../../shared/components/ErrorModal";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-datepicker/dist/react-datepicker.css";

import "./UpdateMovie.css";
import { formatDate } from "../../utils";

const SearchBookingTicket = React.memo(
  ({
    booked,
    setShowFormUpdate,
    setIsLoading,
    handleSearch,
    setFlag,
  }) => {
    const auth = useContext(AuthContext);
    const instance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [movieDayList, setMovieDayList] = useState([]);
    const [movieDay, setMovieDay] = useState("");
    const [timeList,setTimeList] = useState([])    
    const [time, setTime] = useState("");
    const [movieId, setMovieId] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [cinema, setCinema] = useState([]);
    const [booking,setBooking] = useState([])
    const [cinemaId, setCinemaId] = useState("");

    useEffect(() => {
      const fetchCinema = async () => {
        setCinemaId("")
        setMovieId("")
        setMovieDay("")
        setTime("")
        const cinemaList = await instance.get("/v1/cinema");
        const book = await instance.get("/v1/booking")
        if (cinemaList.data.success) {
          setBooking(book.data.booked)
          setCinema(cinemaList.data.cinema);
        }
      };
      fetchCinema();
    }, []);

    const closeModal = () => {
      setShowModal(false);
    };
    const clearError = () => {
      setError(null);
    };
    const handleMovie = (e)=>{
      setMovieId(e.target.value)
      setTime("")
      setMovieDay("")
      const dateList = booking
      .filter((ele) => ele.movie[0].sid === e.target.value)
      .reduce(
        (acc, cur) => {
            let rs = acc.find((ele)=> ele === cur.movieDay)
            if(rs) return acc
            return [
              ...acc,cur.movieDay
            ]
        },
        []
      );
      setMovieDayList(dateList)
    }
    const changeNationHandler = (e) => {
      setCinemaId(e.target.value);
      setMovieId("")
      setMovieDay("")
      setTime("")
      const movie = booking
        .filter((ele) => ele.cinema[0].sid === e.target.value)
        .reduce(
          (acc, cur) => {
              let rs = acc.find((ele)=> ele.sid === cur.movie[0].sid)
              if(rs) return acc
              return [
                ...acc,
                { name: cur.movie[0].name, sid: cur.movie[0].sid },
              ]
          },
          []
        );
      setMovieList(movie);
    };
    const handleMovieDay =(e)=>{
      setTime("")
      const time = booking
      .filter((ele) => ele.movieDay === e.target.value)
      .reduce(
        (acc, cur) => {
            let rs = acc.find((ele)=> ele=== cur.time)
            if(rs) return acc
            return [
              ...acc,cur.time
            ]
        },
        []
      );
      setMovieDay(e.target.value)
      setTimeList(time)
    }
    const handleSearchBooked = () => {
      const obj = {
        cinema : cinemaId,
        movie : movieId,
        movieDay : movieDay,
        time : time
      }
      handleSearch(obj)
    };
    return (
      <Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <Modal onCancel={closeModal} header="Information" show={showModal}>
          <p>{"action"} successFully!</p>
        </Modal>
        <div className="modal-form-update">
          <div className="overlay"></div>
          <div
            className="form-addfilm"
            style={{
              width: "1000px",
              padding: "20px 50px",
            }}
          >
            <div
              className="form-group"
              style={{
                display: "block",
              }}
            >
              <label className="form-label">Cinema</label>
              <select
                name="cinema"
                id=""
                className="form-input"
                onChange={changeNationHandler}
                value={cinemaId}
              >
                <option value="">Choose Cinema</option>
                {cinema.map((ele) => (
                  <option value={ele.sid} key={ele.sid}>
                    {ele.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="frame">
              <div
                className="form-group"
                style={{
                  display: "block",
                }}
              >
                <label className="form-label">Choose Movie</label>
                <select
                  name="movie"
                  id=""
                  className="form-input"
                  onChange={handleMovie}
                  value={movieId}
                >
                  <option value="">Tất cả</option>
                  {movieList.map((ele) => (
                    <option value={ele.sid} key={ele.sid}>
                      {ele.name}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="form-group"
                style={{
                  display: "block",
                }}
              >
                <label className="form-label">Choose Movie</label>
                <select
                  name="movie"
                  id=""
                  className="form-input"
                  onChange={handleMovieDay}
                  value={movieDay}
                >
                  <option value="">Tất cả</option>
                  {movieDayList.map((ele) => (
                    <option value={ele} key={ele}>
                      {formatDate(ele)}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="form-group"
                style={{
                  display: "block",
                }}
              >
                <label className="form-label">Choose Movie</label>
                <select
                  name="movie"
                  id=""
                  className="form-input"
                  onChange={(e)=> setTime(e.target.value)}
                  value={time}
                >
                  <option value="">Tất cả</option>
                  {timeList.map((ele) => (
                    <option value={ele} key={ele}>
                     {ele}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="btn-check">
              <p onClick={handleSearchBooked}>search</p>
              <p
                className="delete-movie"
                onClick={() => setShowFormUpdate(false)}
              >
                cancel
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
);

export default SearchBookingTicket;
