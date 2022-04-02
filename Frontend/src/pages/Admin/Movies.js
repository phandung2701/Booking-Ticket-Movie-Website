import React, { useState, useContext, useEffect, Fragment } from 'react';
import Table from '../../components/Admin/Table';
import { AuthContext } from '../../shared/context/auth-context';

import LoadingSpinner from '../../shared/components/LoadingSpinner';
import axios from 'axios';
import UpdateMovie from '../../components/Admin/UpdateMovie';
import './Movies.css';
import ModalShowTicket from '../../components/Admin/ModalShowTicket';
import ModalCancelTicket from '../../components/Admin/ModalCancelTicket';
function Movies() {
  const auth = useContext(AuthContext);
  const [movie, setMovie] = useState([]);
  const [flag, setFlag] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showCancelTicket, setShowCancelTicket] = useState(false);

  const [amovie, setAMovie] = useState({});
  const customerTableHead = [
    'STT',
    'Tên Phim',
    'Đạo diễn',
    'Diễn viên',
    'Thể loại',
    'Quốc gia',
    'Ngày chiếu',
    '',
    'Chức Năng',
    '',
  ];
  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/movie',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setMovie(res.data.films);
          setFlag(true);
        })
        .catch((err) => setError(err.message));
    };
    fetchData();
    setIsLoading(false);
  }, []);
  const triggerLoading = () => {
    setFlag(false);
    axios({
      method: 'get',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: '/v1/movie',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        setMovie(res.data.films);
        setIsLoading(false);
        setFlag(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>

      <td>{item.nameFilm}</td>
      <td>{item.director}</td>
      <td>{item.actor}</td>
      <td>{item.category}</td>
      <td>{item.country}</td>
      <td>{item.movieDay}</td>

      <td>
        <span className='update' onClick={() => onUpdateMovie(item)}>
          Sửa
        </span>
      </td>
      <td>
        <span className='delete-ticket' onClick={() => onCancelTicket(item)}>
          Hủy Vé
        </span>
      </td>
      <td>
        <span className='show-ticket' onClick={() => onShowTicket(item)}>
          Xem Vé
        </span>
      </td>
    </tr>
  );
  // function
  const onUpdateMovie = (e) => {
    setAMovie(e);
    setShowFormUpdate(true);
  };
  const onShowTicket = (e) => {
    setAMovie(e);
    setShowTicket(true);
  };

  const cancelAllTicket = (movieId) => {
    setIsLoading(true);
    axios({
      method: 'put',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: `/v1/ticket/film/${movieId}/status`,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      data: {
        status: 'cancelled',
      },
    })
      .then((res) => {
        setIsLoading(false);
        setShowCancelTicket(false);
        triggerLoading();
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };
  const onCancelTicket = (e) => {
    setAMovie(e);
    setShowCancelTicket(true);
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}

      <div>
        {movie.length > 0 && flag ? (
          <Table
            limit='5'
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            renderBody={(item, index) => renderBody(item, index)}
            bodyData={movie}
          />
        ) : null}
        {showFormUpdate ? (
          <UpdateMovie
            movie={amovie}
            setShowFormUpdate={setShowFormUpdate}
            triggerLoading={triggerLoading}
            setIsLoading={setIsLoading}
          />
        ) : null}
        {showTicket ? (
          <ModalShowTicket movie={amovie} setShowTicket={setShowTicket} />
        ) : null}

        <ModalCancelTicket
          showCancelTicket={showCancelTicket}
          setShowCancelTicket={setShowCancelTicket}
          cancelAllTicket={cancelAllTicket}
          movie={amovie}
        />
      </div>
    </Fragment>
  );
}

export default Movies;
