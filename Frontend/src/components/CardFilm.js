import React from 'react';

import { useNavigate } from 'react-router-dom';

import './CardFilm.css';

function CardFilm({
  movieId,
  poster,
  movieName,
  category,
  executeScroll,
  movieDay,
  setStatus,
}) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/movie/${movieId}`);
    setStatus((e) => !e);
    executeScroll();
  };

  function compare_date(date1, date2) {
    if (date1.valueOf() <= date2.valueOf()) {
      return true;
    }
    return false;
  }

  return (
    <div className='card-film'>
      <div className='card-film-image'>
        <img src={poster} alt='' />
        <p onClick={handleNavigate}>Chi tiết</p>
      </div>
      <div className='card-film-content'>
        <h3>{movieName}</h3>
        <p>{category}</p>
      </div>
    </div>
  );
}

export default CardFilm;
