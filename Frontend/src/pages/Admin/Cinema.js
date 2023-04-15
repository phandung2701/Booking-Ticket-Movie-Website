import React, { useState, useContext, useEffect, Fragment } from 'react';
import Table from '../../components/Admin/Table';
import { AuthContext } from '../../shared/context/auth-context';

import LoadingSpinner from '../../shared/components/LoadingSpinner';
import axios from 'axios';
import UpdateCinema from '../../components/Admin/UpdateCinema';
import './Movies.css';
function Cinema() {
  const auth = useContext(AuthContext);
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
  const [movie, setMovie] = useState([]);
  const [flag, setFlag] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [action,setAction] = useState('')
  const [showFormUpdate, setShowFormUpdate] = useState(false);

  const [aCinema, setACinema] = useState({});
  const customerTableHead = [
    'STT',
    'Sid',
    'Name',
    'Address',
    'ProvinceId',
    '',
    'Action',
  ];
  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/cinema',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setMovie(res.data?.cinema || []);
          setFlag(true);
        })
        .catch((err) => setError(err.message));
    };
    fetchData();
    setIsLoading(false);
  }, []);
  const triggerLoading = () => {
    setFlag(false);
    axios({
      method: 'get',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: '/v1/cinema',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        setMovie(res.data.cinema);
        setIsLoading(false);
        setFlag(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };
  const handleDeleteCinema = async(item)=>{
      try{
        if(window.confirm("Are you sure you want to delete cinema?") == true){
          await instance.post('/v1/cinema/delete',{sid : item.sid})
          triggerLoading()
        }
      }
      catch(err){
        setError(err.message);
      }

  }
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>{item.sid}</td>
      <td>{item.name}</td>
      <td>{item.address}</td>
      <td>{item.provinceId}</td>
      <td>
        <span className='update' onClick={() => onUpdateCinema(item)}>
          update
        </span>
      </td>
      <td>
        <span className='delete-ticket' onClick={() => handleDeleteCinema(item)}>
         delete
        </span>
      </td>
    </tr>
  );
  // function
  const onUpdateCinema = (e) => {
    setAction('update')
    setACinema(e);
    setShowFormUpdate(true);
  };
  const onCreateCinema = ()=>{
    setAction('create')
    setShowFormUpdate(true);
  }


  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <div>
        <div className='btn-check' style={{
          marginBottom:'10px'
        }}>
            <p onClick={onCreateCinema}>Create</p>
        </div>
        {movie?.length > 0 && flag ? (
          <Table
            limit='5'
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            renderBody={(item, index) => renderBody(item, index)}
            bodyData={movie}
          />
        ) : null}
        {showFormUpdate ? (
          <UpdateCinema
            cinema={aCinema}
            setShowFormUpdate={setShowFormUpdate}
            triggerLoading={triggerLoading}
            setIsLoading={setIsLoading}
            action = {action}
          />
        ) : null}
      </div>
    </Fragment>
  );
}

export default Cinema;
