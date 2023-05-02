import React, { useState, useContext, useEffect, Fragment } from 'react';
import Table from '../../components/Admin/Table';
import { AuthContext } from '../../shared/context/auth-context';

import LoadingSpinner from '../../shared/components/LoadingSpinner';
import axios from 'axios';
import './Movies.css';
import { formatDate, numberToString } from '../../utils';
import SearchBookingTicket from '../../components/Admin/SearchBookingTicket';
function TicketBooked() {
  const auth = useContext(AuthContext);
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
  const [booked, setBooked] = useState([]);
  const [flag, setFlag] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFormUpdate, setShowFormUpdate] = useState(false);

  const [aShowTime, setAShowTime] = useState({});
  const customerTableHead = [
    'STT',
    'Movie',
    'Cinema',
    'Customer',
    'Date',
    'Time',
    'Seat',
    'Combo',
    'Total Price',
    'Booking Date',
    'Status'
  ];
  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/booking',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
            setBooked(res.data.booked);
          setFlag(true);
        })
        .catch((err) => setError(err.message));
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>{item.movie[0].name}</td>
      <td>{item.cinema[0].name}</td>
      <td>{item.customer[0].name}</td>
      <td>{formatDate(item.movieDay)}</td>
      <td>{item.time}</td>
      <td>{item.seat.map(ele => ele+',')}</td>
      <td>{item.comboId[0].title}</td>
      <td style={{color:'#349eff'}}>{numberToString(item.price)}₫</td>
      <td>{new Date(item.createdAt).toLocaleString()}</td>
      <td ><p style={{color:'#fff',background:'#26a426',borderRadius:'5px',padding:'3px 8px'}}>{item.status}</p></td>
    </tr>
  );

  const handleCreateShowTime = ()=>{
    setShowFormUpdate(true);
  }
  const handleSearch = async(obj)=>{
      let rs = await instance.post('/v1/booking/ticket/search',obj)
      setBooked(rs.data.booking)
      setShowFormUpdate(false)
  }
  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}

      <div>
        <div className='btn-check' style={{
            marginBottom:'10px'
            }}>
            <p onClick={handleCreateShowTime}>Search</p>
        </div>
            {booked.length > 0 && flag ? (
            <Table
                limit='5'
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                renderBody={(item, index) => renderBody(item, index)}
                bodyData={booked}
            />
            ) : <div>
            <p>No movie tickets have been booked yet</p>
            </div>}
            {showFormUpdate ? (
            <SearchBookingTicket
                showTime={aShowTime}
                setShowFormUpdate={setShowFormUpdate}
                setIsLoading={setIsLoading}
                booked = {booked}
                handleSearch = {handleSearch}
            />
            ) : null}
        </div>
    </Fragment>
  );
}

export default TicketBooked;
