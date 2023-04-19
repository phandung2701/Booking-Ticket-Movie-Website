import React, { useState, useContext, useEffect, Fragment } from 'react';
import Table from '../../components/Admin/Table';
import { AuthContext } from '../../shared/context/auth-context';

import LoadingSpinner from '../../shared/components/LoadingSpinner';
import axios from 'axios';
import './Movies.css';
import UpdateShowTime from '../../components/Admin/UpdateShowTime';
function ShowTime() {
  const auth = useContext(AuthContext);
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
  const [showTime, setShowTime] = useState([]);
  const [flag, setFlag] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [action,setAction] = useState('')
  const [showFormUpdate, setShowFormUpdate] = useState(false);

  const [aShowTime, setAShowTime] = useState({});
  const customerTableHead = [
    'STT',
    'Sid',
    'MovieId',
    'Movie Day',
    'Time',
    'ScreenId',
    'Action',
    '',
  ];
  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/showTime',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setShowTime(res.data.showTime);
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
      url: '/v1/showTime',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        setShowTime(res.data.showTime);
        setIsLoading(false);
        setFlag(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>{item.sid}</td>
      <td>{item.movieId}</td>
      <td>{item.movieDay}</td>
      <td>{item.time}</td>
      <td>{item.screenId}</td>

      <td>
        <span className='update' onClick={() => handleUpdateShowTime(item)}>
          Update
        </span>
      </td>
      <td>
        <span className='delete-ticket' onClick={() => handleDeleteShowTime(item)}>
          Delete
        </span>
      </td>
    </tr>
  );
  // function
  const handleUpdateShowTime = (e) => {
    setAShowTime(e);
    setAction('update')
    setShowFormUpdate(true);
  };
  const handleDeleteShowTime = async(e)=>{
    try{
      if(window.confirm("Are you sure you want to delete showtime?") == true){
        await instance.post('/v1/showTime/delete',{sid:e.sid})
        triggerLoading()
      }
    }
    catch(err){
      setError(err.message);
    }
  }
  const handleCreateShowTime = ()=>{
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
            <p onClick={handleCreateShowTime}>Create</p>
        </div>
        {showTime.length > 0 && flag ? (
          <Table
            limit='5'
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            renderBody={(item, index) => renderBody(item, index)}
            bodyData={showTime}
          />
        ) : null}
        {showFormUpdate ? (
          <UpdateShowTime
            showTime={aShowTime}
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

export default ShowTime;
