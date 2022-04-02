import React, { useEffect, useState, useContext } from 'react';
import Table from './Table';
import axios from 'axios';
import { AuthContext } from '../../shared/context/auth-context';

import './ModalShowTicket.css';

function ModalShowTicket({ setShowTicket, movie }) {
  const auth = useContext(AuthContext);
  const [flag, setFlag] = useState(false);

  const [ticketList, setTicketList] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/ticket/list',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setTicketList(res.data.ticket);
          setFlag(true);
        })
        .catch((err) => setError(err.message));
    };
    fetchData();
  }, []);
  useEffect(() => {
    const item = ticketList.filter((e) => {
      if (e.status === 'booked') {
        return e.filmId._id === movie._id;
      }
    });
    setTickets(item);
  }, [movie, ticketList]);
  console.log(tickets);
  const customerTableHead = [
    'STT',
    'Khách Hàng',
    'Rạp',
    'Địa chỉ',
    'Giá',
    'Chỗ ngồi',
    'Thời gian chiếu',
    'Phòng',
  ];
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>

      <td>{item.userId.firstname + ' ' + item.userId.lastname}</td>
      <td>{item.cinemaId.name}</td>
      <td>{item.cinemaId.address}</td>
      <td>{item.price}</td>
      <td>{item.seat}</td>
      <td>{item.showTime}</td>
      <td>{item.room}</td>
    </tr>
  );
  return (
    <div>
      <div className='overlay'></div>
      <div className='showticket'>
        <div className='close-ticket'>
          <h3>Vé đã đặt</h3>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            className=''
            focusable='false'
            viewBox='0 0 24 24'
            aria-hidden='true'
            onClick={() => setShowTicket(false)}
          >
            <g data-name='Group 28027' fill='none'>
              <path data-name='Rectangle 4499' d='M0 0h24v24H0z'></path>
              <g
                data-name='Group 28346'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.3'
              >
                <path data-name='Line 22' d='M5 5l14 14'></path>
                <path data-name='Line 23' d='M19 5L5 19'></path>
              </g>
            </g>
          </svg>
        </div>
        {flag ? (
          tickets.length > 0 ? (
            <Table
              limit='5'
              headData={customerTableHead}
              renderHead={(item, index) => renderHead(item, index)}
              renderBody={(item, index) => renderBody(item, index)}
              bodyData={tickets}
            />
          ) : (
            <p>Chưa có vé được đặt</p>
          )
        ) : (
          <p>Loading ... </p>
        )}
      </div>
    </div>
  );
}

export default ModalShowTicket;
