import React from 'react';
import CardFilm from './CardFilm';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MovieIsPlay.css';


function MovieIsPlay({ movieList, setStatus, executeScroll }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <div className='MoviePlay'>
      <h2>Phim đang chiếu</h2>
      <Slider {...settings}>
        {movieList.map((item, index) =>
         
            <CardFilm
              key={item._id}
              movieId={item.sid || ''}
              poster={item.avatar}
              movieName={item.nameFilm}
              category={item.genre_info}
              setStatus={setStatus}
              executeScroll={executeScroll}
              movieDay={item.movieDay}
              movie = {item}
            />
        )}
      </Slider>
    </div>
  );
}

export default MovieIsPlay;
