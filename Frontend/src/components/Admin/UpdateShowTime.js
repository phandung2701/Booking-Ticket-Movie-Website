import React, { useState, useContext, useEffect, Fragment } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
import Modal from '../../shared/components/Modal';
import ErrorModal from '../../shared/components/ErrorModal';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import 'react-datepicker/dist/react-datepicker.css';

import './UpdateMovie.css';

const UpdateShowTime = React.memo(
  ({ showTime, setShowFormUpdate,action, triggerLoading, setIsLoading, setFlag }) => {
    const auth = useContext(AuthContext);
    const instance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [movieId, setMovieId] = useState('');
    const [screenId, setScreenId] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [screenList, setScreenList] = useState([]);
    const [cinemaId,setCinemaId] = useState('');
  
    useEffect(()=>{
        const fetchCinema = async()=>{
          const screen = await instance.get('/v1/screen')
          const movie = await instance.get('/v1/movie')
          if(movie.data.success){
            let startMovie = movie.data.films.filter(ele =>new Date(ele.releaseDate) < new Date()) 
            setMovieList(startMovie)
            setScreenList(screen.data.screen)

          }
        }
        fetchCinema()
    },[])
    useEffect(() => {
      if (showTime && action ==='update') {
        setMovieId(showTime.movieId);
        setScreenId(showTime?.screenId);
        setTime(showTime.time)
        setStartDate(new Date(showTime.movieDay));
      }
    }, [showTime]);

    const closeModal = () => {
      setShowModal(false);
    };
    const clearError = () => {
      setError(null);
    };
    const changeNationHandler = (e) => {
      setCinemaId(e.target.value);
    };
    const handleTime = (e)=> {
      setTime(e)
    }
    const onUpdateCinema = async() => {
      if (
        movieId === '' ||
        screenId === ''||time === ''
        ) {
          setError('Oops... Có vẻ bạn thiếu thông tin nào đó');
          return;
        }
        try{
          if(action === 'update'){
            await instance.post('/v1/showTime/update',{sid : showTime.sid,movieId,movieDay:startDate,time,screenId})
            setShowModal(true);
            setIsLoading(true);
            triggerLoading();
          }
          else if(action === 'create'){
            await instance.post('/v1/showTime/create',{movieId,movieDay:startDate,time,screenId})
            setShowModal(true);
            setIsLoading(true);
            triggerLoading();
          }
        }
        catch(err){
          setError(err.response.data.error);
        }
        setShowFormUpdate(false);
    };
    return (
      <Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <Modal onCancel={closeModal} header='Information' show={showModal}>
          <p>{'action'} successFully!</p>
        </Modal>
        <div className='modal-form-update' >
          <div className='overlay'></div>
          <div className='form-addfilm' style={{
            width : '800px',
            padding:'20px 50px'
        }}>
              <div className='form-group' style={{
                display : 'block'
              }}>
                <label className='form-label'>Movie</label>
                <select
                  name='address'
                  id=''
                  className='form-input'
                  onChange={(e) => setMovieId(e.target.value)}
                  value={movieId}
                >
                  {movieList.map((ele)=>(
                    <option value={ele.sid}>{ele.name}</option>
                  ))}
                </select>
              </div>
              <div className='frame'>
              <div className='form-group'>
                <label className='form-label'>Movie Day</label>
                <DatePicker
                  selected={startDate}
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  className='form-input'
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Time</label>
                <TimePicker onChange={handleTime} value ={time} className='form-input' />
              </div>
              </div>
              <div className='form-group'>
                <label className='form-label'>Screen</label>
                <select
                  name='address'
                  id=''
                  className='form-input'
                  onChange={(e) => setScreenId(e.target.value)}
                  value={screenId}
                >
                  {screenList.map((ele)=>(
                    <option value={ele.sid}>{ele.name}</option>
                  ))}
                </select>
              </div>
            <div className='btn-check'>
              <p onClick={onUpdateCinema}>{action}</p>
              <p
                className='delete-movie'
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

export default UpdateShowTime;
