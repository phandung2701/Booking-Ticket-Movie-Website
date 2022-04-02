import React from 'react';
import CartItem from './CartItem';
import './Cart.css';
import { Link } from 'react-router-dom';

function Cart({
  setChosenTicket,
  movieList,
  setIsLoading,
  setError,
  setModalIsShown,
}) {
  return (
    <div className='Cart-container'>
      <h3>Các vé đã đặt: </h3>
      <div className='Cart'>
        {movieList[0] ? (
          movieList.map((movie, index) => (
            <CartItem
              key={index}
              setChosenTicket={setChosenTicket}
              movie={movie}
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
