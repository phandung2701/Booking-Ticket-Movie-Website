import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import './FilmDetail.css';

function FilmDetail({ movieId, setIsLoading, setError, setStatus, status }) {
  const [movie, setMovie] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);
  const trailerRef = useRef(null);
  const fetchMovie = () => {
    setIsLoading(true);
    axios({
      method: 'get',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: `/v1/movie/${movieId}`,
    })
      .then((res) => {
        setMovie(res.data.movie);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };
  useEffect(() => {
    fetchMovie();
  }, [status]);
  const handleCloseTrailer = () => {
    if (trailerRef.current) {
      var iframeSrc = trailerRef.current.src;
      trailerRef.current.src = iframeSrc;
    }
    setShowTrailer(false);
  };

  return (
    <div className='film-container'>
      <div className='poster-film'>
        <img src={movie.background} alt='' />
        <div className='icon-play'>
          <i class='bx bx-play-circle' onClick={() => setShowTrailer(true)}></i>
        </div>
      </div>
      <div className={showTrailer ? 'trailer show' : 'trailer'}>
        <div className='close-trailer'>
          <i class='bx bx-x-circle' onClick={handleCloseTrailer}></i>
        </div>
        <iframe
          title={movie._id}
          src={movie.trailer}
          frameBorder='0'
          allowFullScreen
          autoPlay='1'
          ref={trailerRef}
        ></iframe>
      </div>
      <div className='detail-film'>
        <img src={movie.avatar} alt='' />
        <div className='detail'>
          <h2>{movie.nameFilm}</h2>
          <Link to={`/booking/${movieId}`}>
            <p>Đặt vé</p>
          </Link>
          <div className='content-film'>
            <div className='content-film-1'>
              <p>
                Đạo diễn: <span>{movie.director}</span>
              </p>

              <p>
                Phát hành:{' '}
                <span>
                  {new Date(movie.movieDay).toLocaleString().split(',')[0]}
                </span>
              </p>
              <p>
                Thể loại: <span>{movie.category}</span>
              </p>
              <p>
                Quốc gia: <span>{movie.country}</span>
              </p>
            </div>
            <div className='content-film-2'>
              <h3>Nội dung</h3>
              <p>{movie.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmDetail;
