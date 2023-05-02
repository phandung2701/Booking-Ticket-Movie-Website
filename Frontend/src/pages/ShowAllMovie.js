import React, { useState,useContext, useEffect } from 'react';

import { useParams, useLocation } from 'react-router-dom';

import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import AllMovie from '../components/AllMovie';

import LoadingSpinner from '../shared/components/LoadingSpinner';
import ErrorModal from '../shared/components/ErrorModal';
import { AuthContext } from "../shared/context/auth-context";
import axios from 'axios';

import './Movie.css';
import './ShowAllMovie.css';

const ShowAllMovie = () => {
  const [error, setError] = useState(null);
  const clearError = () => {
    setError(null);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [listC,setListC] = useState([])
  const [listGenre,setListGenre] = useState([])
  const [movieList, setMovieList] = useState([]);
  const location = useLocation();
  const [category, setCategory] = useState('');
  const [activeTab,setActiveTab] = useState(1)
  const param = useParams();
  const auth = useContext(AuthContext);
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
  useEffect(()=>{
    const getList = async()=>{
      let listCountry = await instance.get('/v1/country')
      let listGenre = await instance.get('/v1/movieGenre')
      setListC(listCountry.data.country)
      setListGenre(listGenre.data.movieGenre)
    }
    getList()
  },[])
  useEffect(() => {
    fetchData2()
  }, [location]);
  const fetchData = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: '/v1/movie/search/name',
      data: {
        name: param.movieName,
      },
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
  const fetchData2 = () => {
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
  const handleMovieSearch = () => {
    setIsLoading(true);
    axios({
      method: 'post',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: '/v1/movie/search',
      data: {
        genre: category,
        country: country,
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
  };
  const handleMovie = (type,tab)=>{
    setIsLoading(true);
    setActiveTab(tab)
    axios({
      method: 'post',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: '/v1/movie/search',
      data: {
        genre: category,
        country: country,
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
      <div className='movie-wrapper'>
        <Navbar tab={2} />
        <div className='search-movie'>
          <h3>Tìm Kiếm Phim</h3>
          <div>
            <div className='search-category'>
              <span>Thể loại : </span>
              <select
                name='country'
                id=''
                className='form-input-search'
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=''>Tất cả</option>
                {listGenre.map((ele)=>(
                <option value={ele.sid} key={ele.sid}>{ele.name}</option>
                ))}
              </select>
            </div>
            <div className='search-category'>
              <span>Quốc gia : </span>
              <select
                name='country'
                id=''
                className='form-input-search'
                onClick={(e) => setCountry(e.target.value)}
              >
                <option value=''>Tất cả</option>
                {listC.map((ele)=>(
                <option value={ele.sid} key={ele.sid}>{ele.name}</option>
                ))}
              </select>
            </div>

            <p onClick={handleMovieSearch}>Tìm kiếm</p>
          </div>
        </div>
          <AllMovie movieList={movieList} limit={10} handleMovie={handleMovie} activeTab={activeTab}/>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ShowAllMovie;
