import React, { useState, useEffect, Fragment } from 'react';
import CardFilm from './CardFilm';

import './AllMovie.css';
function AllMovie(props) {
  const [dataShow, setDataShow] = useState([]);
  
  useEffect(() => {
    const initDataShow =
      props.limit && props.movieList
        ? props.movieList.slice(0, Number(props.limit))
        : props.movieList;

    setDataShow(initDataShow.length > 0 ? initDataShow : []);
  }, [props.movieList]);

  let pages = 1;

  let range = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.movieList.length / Number(props.limit));
    pages =
      props.movieList.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);
  const selectPage = (page) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShow(props.movieList.slice(start, end));

    setCurrPage(page);
  };
  return (
 
    <div className='allmovie'>
         <div style={{display : 'flex',alignItems:'center'}} className='title-movie'>
    <p className={props.activeTab == 1 && "active"} onClick={()=>props.handleMovie('',1)}>Tất cả phim</p>
    <p className={props.activeTab == 2 && "active"} onClick={()=>props.handleMovie('lte',2)}>Phim đang chiếu</p>
    <p className={props.activeTab == 3 && "active"} onClick={()=>props.handleMovie('gt',3)}>Phim Sắp chiếu</p>
  </div>
      { props.movieList.length >0? (
     
     <Fragment>
     <div className='movieList'>
       {dataShow.length > 0 ? (
         dataShow.map((movie, index) => (
           <CardFilm
             key={movie._id}
             movieId={movie?.sid || ''}
             poster={movie.avatar}
             movieName={movie?.name || ''}
             category={movie?.genre_info||''}
             executeScroll={props.executeScroll}
             movieDay={movie?.releaseDate|| new Date()}
             movie={movie}
           />
         ))
       ) : (
         <p>Hiện tại không có phim nào được công chiếu</p>
       )}
     </div>
      {pages > 1 && dataShow.length > 0 ? (
        <div className='table__pagination'>
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currPage === index ? 'active' : ''
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}

     </Fragment> 
   ):<div className='empty-movie'>
   <p>không tìm thấy phim</p>
 </div>}   

    </div>
  );
}

export default AllMovie;
