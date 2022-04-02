import React, { useState, useEffect } from 'react';

import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import Carousel from '../components/Carousel';
import AllMovie from '../components/AllMovie';

import LoadingSpinner from '../shared/components/LoadingSpinner';
import ErrorModal from '../shared/components/ErrorModal';

import axios from 'axios';

import './Home.css';

const Home = () => {
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
      url: '/v1/movie',
    })
      .then((res) => {
        if (res.data.films.length === 0) {
          setMovieList([]);
          setIsLoading(false);
          return;
        }
        setMovieList(res.data.films);
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
      <div className='home-wrapper'>
        <Navbar tab={1} />
        <Carousel movieList={movieList} />

        {movieList.length > 0 ? (
          <AllMovie movieList={movieList} limit={10} />
        ) : null}

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
