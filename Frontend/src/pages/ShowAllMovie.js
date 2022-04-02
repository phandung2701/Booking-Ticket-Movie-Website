import React, { useState, useEffect } from 'react';

import { useParams, useLocation } from 'react-router-dom';

import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import AllMovie from '../components/AllMovie';

import LoadingSpinner from '../shared/components/LoadingSpinner';
import ErrorModal from '../shared/components/ErrorModal';

import axios from 'axios';

import './Movie.css';
import './ShowAllMovie.css';

const ShowAllMovie = () => {
  const [error, setError] = useState(null);
  const clearError = () => {
    setError(null);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('Tất cả');

  const [movieList, setMovieList] = useState([]);
  const location = useLocation();
  const [category, setCategory] = useState('Tất cả');
  const param = useParams();

  useEffect(() => {
    if (param.movieName !== undefined) {
      fetchData();
    } else {
      fetchData2();
    }
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
        category: category,
        country: country,
      },
    })
      .then((res) => {
        console.log(res.data, country, category);
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
                onClick={(e) => setCategory(e.target.value)}
              >
                <option value='Tất cả'>Tất cả</option>

                <option value='Tâm Lý - Tình Cảm'> Tâm Lý - Tình Cảm</option>
                <option value='Cổ Trang - Thần Thoại'>
                  Cổ Trang - Thần Thoại
                </option>
                <option value='Thể Thao - Âm Nhạc'>Thể Thao - Âm Nhạc</option>
                <option value='Gia Đình - Học Đường'>
                  Gia Đình - Học Đường
                </option>
                <option value='Hình Sự - Chiến Tranh'>
                  Hình Sự - Chiến Tranh
                </option>
                <option value='Phiêu Lưu - Hành Động'>
                  Phiêu Lưu - Hành Động
                </option>
                <option value='Khoa Học - Viễn Tưởng'>
                  Khoa Học - Viễn Tưởng
                </option>
                <option value='Hài Hước'>Hài Hước</option>
                <option value='Hoạt Hình'>Hoạt Hình</option>
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
                <option value='Tất cả'>Tất cả</option>
                <option value='Việt Nam'>Việt Nam</option>
                <option value='Hàn Quốc'>Hàn Quốc</option>
                <option value='Nhật Bản'>Nhật Bản</option>

                <option value='Trung Quốc'>Trung Quốc</option>
                <option value='Mỹ'>Mỹ</option>
                <option value='Nga'>Nga</option>
              </select>
            </div>

            <p onClick={handleMovieSearch}>Tìm kiếm</p>
          </div>
        </div>
        {movieList.length > 0 ? (
          <AllMovie movieList={movieList} limit={10} />
        ) : (
          <div className='empty-movie'>
            <p>không tìm thấy phim</p>
          </div>
        )}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default ShowAllMovie;
