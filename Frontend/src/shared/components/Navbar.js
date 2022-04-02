import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Modal from './Modal';
import Button from './Button';

import axios from 'axios';

import { AuthContext } from '../context/auth-context';

import './Navbar.css';

function Navbar({ tab }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn);

  const logout = () => {
    setIsLoggedIn(!isLoggedIn);
    auth.logout();
  };
  const [showMenu, setShowMenu] = useState(false);
  const [name, setName] = useState('');
  const [nameMovie, setNameMovie] = useState('');

  const [modalIsShown, setModalIsShown] = useState(false);

  const closeModal = () => {
    setModalIsShown(false);
  };

  const [message, setMessage] = useState([]);

  useEffect(() => {
    const fetchMessage = () => {
      axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/auth/me',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setMessage(res.data.user.message);
          setName(res.data.user.firstname + ' ' + res.data.user.lastname);
        })
        .catch((err) => {});
    };
    fetchMessage();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/auth/me',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setMessage(res.data.user.message);
        })
        .catch((err) => {});
    }, 1000 * 60 * 1);

    return () => clearInterval(intervalId);
  }, []);
  function to_slug(str) {
    str = str.toLowerCase();

    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    str = str.replace(/([^0-9a-z-\s])/g, '');

    str = str.replace(/(\s+)/g, '-');

    str = str.replace(/^-+/g, '');

    str = str.replace(/-+$/g, '');

    return str;
  }
  const handleSearchMovie = () => {
    navigate(`/movie/search/${to_slug(nameMovie)}`);

    setNameMovie('');
  };
  const onMovieSearch = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      navigate(`/movie/search/${to_slug(e.target.value)}`);

      e.target.value = '';
    }
  };
  return (
    <Fragment>
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
      <div className='navbar-container'>
        <div className='navbar'>
          <div className='nav-left'>
            <div className='navbar-logo'>
              <Link to={'/'}>
                <img
                  src='https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmV0ZmxpeCUyMGxvZ298ZW58MHx8MHx8&w=1000&q=80'
                  alt=''
                />
                <span>NITFLEX</span>
              </Link>
            </div>
            <div className='nav-search'>
              <i className='bx bx-search' onClick={handleSearchMovie}></i>

              <input
                type='text'
                name='search-movie'
                placeholder='Nhập tên phim cần tìm...'
                onKeyUp={onMovieSearch}
                onChange={(e) => setNameMovie(e.target.value)}
                value={nameMovie}
              />
            </div>
          </div>

          <div className='navbar-auth'>
            {isLoggedIn ? (
              <div
                className='navbar-user'
                onClick={() => setShowMenu((e) => !e)}
              >
                <img
                  src='http://cdn.onlinewebfonts.com/svg/img_568656.png'
                  alt=''
                />
                <p>{name}</p>
                {showMenu ? (
                  <div className='nav-menu-box'>
                    <Link to={`/notifications`}>
                      <p>
                        {' '}
                        <i className='bx bx-bell'></i> Thông báo
                      </p>
                      {message && message.length > 0 && (
                        <div className='push-noti'>
                          {message.filter((e) => typeof e === 'object').length}
                        </div>
                      )}
                    </Link>
                    <Link to={`/library`}>
                      <p>
                        {' '}
                        <i className='bx bx-cart'></i> Giỏ hàng
                      </p>
                    </Link>
                    {auth.isAdmin && auth.isAdmin !== 'user' && (
                      <Link to={`/admin/dashboard`}>
                        <p>
                          {' '}
                          <i className='bx bx-server'></i>Quản trị
                        </p>
                      </Link>
                    )}
                    <p onClick={logout}>
                      {' '}
                      <i className='bx bx-door-open'></i> Đăng xuất
                    </p>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <Link to={'/authentication/?register=true'}>Đăng kí</Link>
                <Link to={'/authentication'} className='active'>
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='navbar-tab'>
        <ul>
          <li className={tab === 1 ? 'active' : null}>
            <i className='bx bx-home'></i>
            <Link to='/'>Trang chủ</Link>
          </li>
          <li className={tab === 2 ? 'active' : null}>
            <i className='bx bx-film'></i>
            <Link to='/movies'>Phim</Link>
          </li>
          <li className={tab === 3 ? 'active' : null}>
            <i className='bx bx-cart'></i>
            {isLoggedIn ? (
              <Link to={`/library`}>Giỏ Hàng</Link>
            ) : (
              <a onClick={setModalIsShown.bind(true)}>Giỏ hàng</a>
            )}
          </li>
        </ul>
      </div>
    </Fragment>
  );
}

export default Navbar;
