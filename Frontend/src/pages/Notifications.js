import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../shared/context/auth-context';
import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import Notification from '../components/Notification';

import LoadingSpinner from '../shared/components/LoadingSpinner';
import ErrorModal from '../shared/components/ErrorModal';

import axios from 'axios';

import './Notifications.css';

const Notifications = () => {
  const auth = useContext(AuthContext);

  const [error, setError] = useState(null);
  const clearError = () => {
    setError(null);
  };
  const [isLoading, setIsLoading] = useState(false);

  const [movieList, setMovieList] = useState([]);

  const fetchData = () => {
    setIsLoading(true);
    axios({
      method: 'get',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: '/v1/auth/me',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        setMovieList(res.data.user.message);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className='notifications-wrapper'>
        <Navbar tab={3} />
        <div className='content-wrapper'>
          {movieList.map((message, index) => {
            if (typeof message === 'object') {
              return (
                <Notification
                  key={index}
                  message={{ content: message.content, time: message.time }}
                />
              );
            }
          })}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Notifications;
