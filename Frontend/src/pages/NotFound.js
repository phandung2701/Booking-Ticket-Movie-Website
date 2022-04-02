import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';

import './NotFound.css';

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="notfound-wrapper">
        <div className="dark-overlay">
          <Navbar tab={0} />
          <div className="notfound">
            <h1>404</h1>
            <h2>Oops... Có vẻ như trang bạn tìm kiếm không tồn tại...</h2>
            <Link to="/">
              <span>Trang chủ</span>
            </Link>
          </div>
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
