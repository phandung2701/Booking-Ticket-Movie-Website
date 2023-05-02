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
  const [activeTab,setActiveTab] = useState(1)
  const [movieList, setMovieList] = useState([]);
  const [movieCarousel,setMovieCarousel] = useState([])

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
        setMovieCarousel(res.data.films)
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
  const handleMovie = (type,tab)=>{
    setIsLoading(true);
    setActiveTab(tab)
    axios({
      method: 'post',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: '/v1/movie/search',
      data: {
        type
      },
    })
      .then((res) => {
        if (res?.data?.films?.length === 0) {
          setMovieList([]);
          setIsLoading(false);
          return;
        }
        setMovieList(res.data.films);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response?.data?.error);
      });
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className='home-wrapper'>
        <Navbar tab={1} />
        <Carousel movieList={movieCarousel} />

        <AllMovie movieList={movieList} limit={10} handleMovie={handleMovie} activeTab={activeTab}/>
     

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
