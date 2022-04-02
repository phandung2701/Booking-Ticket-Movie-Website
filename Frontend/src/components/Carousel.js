import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Modal from '../shared/components/Modal';
import Button from '../shared/components/Button';
import { AuthContext } from '../shared/context/auth-context';

import './Carousel.css';

function Carousel({ movieList }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalIsShown, setModalIsShown] = useState(false);

  const closeModal = () => {
    setModalIsShown(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
  };
  const onMovieDetail = (e) => {
    navigate(`/movie/${e._id}`);
  };
  function compare_date(date1, date2) {
    if (date1.valueOf() <= date2.valueOf()) {
      return true;
    }
    return false;
  }
  return (
    <React.Fragment>
      <Modal
        onCancel={closeModal}
        header='Oops...'
        show={modalIsShown}
        footer={
          <>
            <span className='close-modal-btn' onClick={closeModal}>
              Hủy
            </span>
            <Button>
              <Link to={'/authentication'} onClick={closeModal}>
                <p className='confirm-login-btn'>Đăng nhập</p>
              </Link>
            </Button>
          </>
        }
      >
        <p>Bạn cần đăng nhập để thực hiện tác vụ này</p>
      </Modal>
      <div className='carousel-container'>
        <Slider {...settings}>
          {movieList.slice(-7, -1).map((item, index) => {
            return index >= 6 &&
              compare_date(new Date(), new Date(item.movieDay)) ? null : (
              <div key={item._id} className='carousel'>
                <img src={item.background} alt='' />
                <div className='content'>
                  <h2 onClick={() => onMovieDetail(item)}>{item.nameFilm}</h2>
                  <p className='des' onClick={() => onMovieDetail(item)}>
                    {item.description}
                  </p>
                  <p className='actor' onClick={() => onMovieDetail(item)}>
                    Diễn viên: {item.actor}
                  </p>
                  <p className='btn-booking'>
                    {auth.isLoggedIn ? (
                      <Link to={`/booking/${item._id}`}>Đặt vé ngay!</Link>
                    ) : (
                      <p onClick={setModalIsShown.bind(true)}>Đặt vé ngay!</p>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </React.Fragment>
  );
}

export default Carousel;
