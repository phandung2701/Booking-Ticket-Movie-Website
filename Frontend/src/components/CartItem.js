import React from 'react';

import './Cart.css';
import { numberToString } from '../utils';

const CartItem = ({
  setChosenTicket,
  movie,
  setIsLoading,
  ticket,
  setError,
  setModalIsShown,
}) => {
  const cancelHandler = (movieId) => {
    setChosenTicket(movieId);
    setModalIsShown(true);
  };
  const convertDate = (data)=>{
    const date = data ? new Date(data) : new Date();

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return (
    <>
      <div className='box-ticket'>
        <img src={movie?.avatar} alt='' />
        <div className='ticket-item'>
          <div>
            <p>Mã vé : <span style={{color:'#24a4d8'}}>{ticket.sid}</span></p>
          </div>
          <div>
            <p>
              Tên Phim: <span>{movie?.name}</span>
            </p>
            <p>
              Ngày chiếu:{' '}
              <span>
              { convertDate(ticket?.movieDay)}
              </span>
            </p>
          </div>
          <div>
            <p>
              Chỗ ngồi: {ticket?.seat.map(((st,idx) =><span key={idx}>{st},</span>))}
            </p>
            <p>
              Giá: <span>{numberToString(ticket?.price)}₫</span>
            </p>
          </div>
          <div>
            <p>
              Suất chiếu: <span>{ticket?.time}</span>
            </p>
            <p>
              Rạp: <span>{ticket?.cinema[0]?.name}</span>
            </p>
          
          </div>
         { ticket.comboId.length > 0 && <div>
            <p>
              Bắp,nước: {ticket.comboId.map((food,idx)=> <span>{food.title}, </span>)}
            </p>
          </div>}
        </div>
      </div>
    </>
  );
};

export default CartItem;
