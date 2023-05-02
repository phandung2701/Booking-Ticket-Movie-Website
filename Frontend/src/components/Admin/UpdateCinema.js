import React, { useState, useContext, useEffect, Fragment } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
import Modal from '../../shared/components/Modal';
import ErrorModal from '../../shared/components/ErrorModal';

import 'react-datepicker/dist/react-datepicker.css';

import './UpdateMovie.css';

const UpdateCinema = React.memo(
  ({ cinema, setShowFormUpdate,action, triggerLoading, setIsLoading, setFlag }) => {
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
    const [address, setAddress] = useState('');
    const [province, setProvince] = useState([]);
    const [provinceId,setProvinceId] = useState('');
  
    useEffect(()=>{
        const fetchProvince = async()=>{
          const provinceList = await instance.get('/v1/province')
          if(provinceList.data.success){
              setProvince(provinceList.data.province)
          }
        }
        fetchProvince()
    },[])
    useEffect(() => {
      if (cinema && action ==='update') {
        setName(cinema.name);
        setAddress(cinema.address);
        setProvinceId(cinema?.provinceId);
      }
    }, [cinema]);

    const closeModal = () => {
      setShowModal(false);
    };
    const clearError = () => {
      setError(null);
    };
    const changeNationHandler = (e) => {
      setProvinceId(e.target.value);
    };
    const onUpdateCinema = async() => {
      if (
        name === '' ||
        address === '' ||
        provinceId === ''
        ) {
          setError('Oops... Có vẻ bạn thiếu thông tin nào đó');
          return;
        }
        try{
          if(action === 'update'){
            await instance.post('/v1/cinema/update',{sid : cinema.sid,name,address,provinceId})
            setShowModal(true);
            setIsLoading(true);
            triggerLoading();
          }
          else if(action === 'create'){
            await instance.post('/v1/cinema/create',{name,address,provinceId})
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
                <label className='form-label'>Address</label>
                <input
                  type='text'
                  name='address'
                  className='form-input'
                  placeholder='address...'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Province</label>
                <select
                  name='address'
                  id=''
                  className='form-input'
                  onChange={changeNationHandler}
                  value={provinceId}
                >
                  {province.map((ele)=>(
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

export default UpdateCinema;
