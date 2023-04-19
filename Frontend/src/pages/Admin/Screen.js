import React, { useState, useContext, useEffect, Fragment } from 'react';
import Table from '../../components/Admin/Table';
import { AuthContext } from '../../shared/context/auth-context';

import LoadingSpinner from '../../shared/components/LoadingSpinner';
import axios from 'axios';
import UpdateScreen from '../../components/Admin/UpdateScreen';
import './Movies.css';
function Screen() {
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

  const [aScreen, setAScreen] = useState({});
  const customerTableHead = [
    'STT',
    'Sid',
    'Name',
    'CinemaId',
    'Action',
    '',
  ];
  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/screen',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setMovie(res.data?.screen || []);
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
      url: '/v1/screen',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        setMovie(res.data?.screen);
        setIsLoading(false);
        setFlag(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };
  const handleDeleteCinema = async(e)=>{
      try{
        if(window.confirm("Are you sure you want to delete screen?") == true){
          await instance.post('/v1/screen/delete',{sid:e.sid})
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
      <td>{item.cinemaId}</td>

      <td>
        <span className='update' onClick={() => onUpdateScreen(item)}>
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
  const onUpdateScreen = (e) => {
    setAction('update')
    setAScreen(e);
    setShowFormUpdate(true);
  };
  const onCreateScreen = ()=>{
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
            <p onClick={onCreateScreen}>Create</p>
        </div>
        {movie?.length > 0 && flag ? (
          <Table
            limit='10'
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            renderBody={(item, index) => renderBody(item, index)}
            bodyData={movie}
          />
        ) : null}
        {showFormUpdate ? (
          <UpdateScreen
            screen={aScreen}
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

export default Screen;
