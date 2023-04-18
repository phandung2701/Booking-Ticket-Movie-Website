import React from 'react';
import CartItem from './CartItem';
import './Cart.css';
import { Link } from 'react-router-dom';

function Cart({
  setChosenTicket,
  booked,
  setIsLoading,
  setError,
  setModalIsShown,
}) {
  return (
    <div className='Cart-container'>
      <h3>Các vé đã đặt: </h3>
      <div className='Cart'>
        {booked.length > 0 ? (
          booked.map((ele, index) => (
            <CartItem
              key={index}
              setChosenTicket={setChosenTicket}
              movie={ele.movie[0]}
              ticket = {ele}
              setIsLoading={setIsLoading}
              setError={setError}
              setModalIsShown={setModalIsShown}
            />
          ))
        ) : (
          <div className='tickets-booked'>
            <p className='NoTicket'>chưa có vé nào được đặt</p>
            <Link to={'/movies'}>Đặt ngay</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
