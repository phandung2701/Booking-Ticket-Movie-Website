import React from 'react';

import './BoxPayment.css';

function BoxPayment({
  paymentIsShown,
  setPaymentIsShown,
  movie,
  paymentInfo,
  bookingHandler,
}) {
  const closeModal = () => {
    setPaymentIsShown(false);
  };
  return (
    <div
      className={
        paymentIsShown ? 'Payment-component show' : 'Payment-component hide'
      }
    >
      <div className='overlay'></div>
      <div className='payment-detail'>
        <p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            className='close'
            focusable='false'
            viewBox='0 0 24 24'
            aria-hidden='true'
            onClick={closeModal}
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
        </p>
        <div className='payment-infomation'>
          <div className='info-film'>
            <div className='film-title'>
              <img src={movie.avatar} alt='' />
              <div>
                <h3>{movie.nameFilm}</h3>
                <p>{movie.category}</p>
              </div>
            </div>
            <div className='detail-film-body'>
              <p>
                Ngày:{' '}
                <span>
                  {new Date(movie.movieDay).toLocaleString().split(',')[0]}
                </span>
              </p>
              <p>
                Thời gian: <span>{paymentInfo.time}</span>
              </p>
              <p>
                Rạp chọn: <span>{paymentInfo.cinemaName}</span>
              </p>
              <p>{paymentInfo.cinemaAddress}</p>
            </div>
            <p onClick={bookingHandler}>Thanh Toán</p>
          </div>
        </div>
        <div className='payment-qr'>
          <p>Quét mã QR bằng MoMo để thanh toán</p>
          <img
            src='https://www.saigonchildren.com/wp-content/uploads/2020/04/MM_QR_CODE_MOMOTUUM20191113-saigonchildren.png'
            alt=''
          />
          <p>Sử dụng app MoMo hoặc ứng dụng Camera hỗ trợ QR code để quét mã</p>
        </div>
      </div>
    </div>
  );
}

export default BoxPayment;
