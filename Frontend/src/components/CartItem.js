import React from 'react';

import './Cart.css';

const CartItem = ({
  setChosenTicket,
  movie,
  setIsLoading,
  setError,
  setModalIsShown,
}) => {
  const cancelHandler = (movieId) => {
    setChosenTicket(movieId);
    setModalIsShown(true);
  };

  let item;
  if (
    new Date() >=
    new Date(
      movie.movieDay.toString().substr(0, 11) + movie.showTime + ':00.000Z'
    )
  ) {
    item = <span className='wait'>Phim đã chiếu</span>;
  } else if (movie.status === 'booked') {
    item = (
      <button className='cancel-btn' onClick={() => cancelHandler(movie._id)}>
        Hủy vé
      </button>
    );
  } else if (movie.status === 'cancelled') {
    item = <span className='wait'></span>;
  }

  return (
    <>
      <div className='box-ticket'>
        <img src={movie.avatar} alt='' />
        <div className='ticket-item'>
          <div>
            <p>
              Tên Phim: <span>{movie.nameFilm}</span>
            </p>
            <p>
              Ngày chiếu:{' '}
              <span>
                {new Date(movie.movieDay).toLocaleString().split(',')[0]}
              </span>
            </p>
          </div>
          <div>
            <p>
              Chỗ ngồi: <span>{movie.seat}</span>
            </p>
            <p>
              Giá: <span>50.000</span>
            </p>
          </div>
          <div>
            <p>
              Suất chiếu: <span>{movie.showTime}</span>
            </p>
            <p>
              Rạp: <span>CGV AEON Hà Đông</span>
            </p>
          </div>
          <div>
            <p>
              Trạng thái:{' '}
              {movie.status === 'booked' ? (
                <span className='success'>Đã đặt</span>
              ) : (
                <span className='wait'>Đã hủy</span>
              )}
            </p>
          </div>
          <div>{item}</div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
