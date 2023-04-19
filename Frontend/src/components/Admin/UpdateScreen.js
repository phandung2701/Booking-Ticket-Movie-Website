import React, { useState, useContext, useEffect, Fragment } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
import Modal from '../../shared/components/Modal';
import ErrorModal from '../../shared/components/ErrorModal';

import 'react-datepicker/dist/react-datepicker.css';

import './UpdateMovie.css';

const UpdateScreen = React.memo(
  ({ screen, setShowFormUpdate,action, triggerLoading, setIsLoading, setFlag }) => {
    const auth = useContext(AuthContext);
    const instance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    const [name, setName] = useState('');
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
      if (screen && action ==='update') {
        setName(screen.name);
        setCinemaId(screen?.cinemaId);
      }
    }, [screen]);

    const closeModal = () => {
      setShowModal(false);
    };
    const clearError = () => {
      setError(null);
    };
    const changeNationHandler = (e) => {
      setCinemaId(e.target.value);
    };
    const onUpdateCinema = async() => {
      if (
        name === '' ||
        cinemaId === ''
        ) {
          setError('Oops... Có vẻ bạn thiếu thông tin nào đó');
          return;
        }
        try{
          if(action === 'update'){
            await instance.post('/v1/screen/update',{sid : screen.sid,name,cinemaId})
            setShowModal(true);
            setIsLoading(true);
            triggerLoading();
          }
          else if(action === 'create'){
            await instance.post('/v1/screen/create',{name,cinemaId})
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
                <label className='form-label'>Name</label>
                <input
                  type='text'
                  name='nameFilm'
                  className='form-input'
                  placeholder='cinema name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className='form-group'>
                <label className='form-label'>Cinema</label>
                <select
                  name='address'
                  id=''
                  className='form-input'
                  onChange={changeNationHandler}
                  value={cinemaId}
                >
                  {cinema.map((ele)=>(
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

export default UpdateScreen;
