import React, { useState, useContext, useEffect, Fragment } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
import Modal from '../../shared/components/Modal';
import ErrorModal from '../../shared/components/ErrorModal';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
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
    const [time, setTime] = useState(new Date());
    const [movieId, setMovieId] = useState('');
    const [screenId, setScreenId] = useState('');
    const [cinema, setCinema] = useState([]);
    const [cinemaId,setCinemaId] = useState('');
  
    useEffect(()=>{
        const fetchCinema = async()=>{
          const cinemaList = await instance.get('/v1/cinema')
          if(cinemaList.data.success){
              setCinema(cinemaList.data.cinema)
          }
        }
        fetchCinema()
    },[])
    useEffect(() => {
      if (showTime && action ==='update') {
        setMovieId(showTime.movieId);
        setScreenId(showTime?.screenId);
        setStartDate(new Date(showTime.movieDay));
        setStartDate();
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
    const onUpdateCinema = () => {
      if (
        movieId === '' ||
        screenId === ''
        ) {
          setError('Oops... Có vẻ bạn thiếu thông tin nào đó');
          return;
        }
        try{
          if(action === 'update'){
            instance.post('/v1/showTime/update',{sid : showTime.sid,movieId,movieDay:startDate,time,screenId})
            setShowModal(true);
            setIsLoading(true);
            triggerLoading();
          }
          else if(action === 'create'){
            instance.post('/v1/showTime/create',{movieId,movieDay:startDate,time,screenId})
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
                <label className='form-label'>Movie ID</label>
                <input
                  type='text'
                  name='nameFilm'
                  className='form-input'
                  placeholder='cinema name'
                  value={movieId}
                  onChange={(e) => setMovieId(e.target.value)}
                />
              </div>
              <div className='frame'>
              <div className='form-group'>
                <label className='form-label'>Movie Day</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className='form-input'
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Time</label>
                <TimePicker
                  selected={new Date(time)}
                  onChange={(time) => {
                    const date = new Date(time);
                    const formattedTime = date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
                    setTime(formattedTime)

                  }}
                  className='form-input'
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="hh:mm aa"
                  timeCaption="Time"

                />
              </div>
              </div>
              <div className='form-group'>
                <label className='form-label'>Screen ID</label>
                <input
                  type='text'
                  name='screen id'
                  className='form-input'
                  placeholder='Screen ID'
                  value={screenId}
                  onChange={(e) => setScreenId(e.target.value)}
                />
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
