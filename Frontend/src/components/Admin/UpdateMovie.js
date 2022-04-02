import React, { useState, useContext, useEffect, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
import Modal from '../../shared/components/Modal';
import ErrorModal from '../../shared/components/ErrorModal';

import 'react-datepicker/dist/react-datepicker.css';

import './UpdateMovie.css';

const UpdateMovie = React.memo(
  ({ movie, setShowFormUpdate, triggerLoading, setIsLoading, setFlag }) => {
    const auth = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    const [startDate, setStartDate] = useState(new Date());

    const [namefilm, setNameFilm] = useState('');
    const [country, setCountry] = useState('Việt Nam');
    const [poster, setPoster] = useState('');
    const [avatar, setAvatar] = useState('');
    const [actor, setActor] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [trailer, setTrailer] = useState('');

    useEffect(() => {
      if (movie) {
        setNameFilm(movie.nameFilm);
        setCountry(movie.country);
        setActor(movie.actor);
        setDescription(movie.description);
        setDirector(movie.director);
        setCategory(movie.category);
        setAvatar(movie.avatar);
        setPoster(movie.background);
        setStartDate(new Date(movie.movieDay));
        movie.trailer && setTrailer(movie.trailer);
      }
    }, [movie]);

    const closeModal = () => {
      setShowModal(false);
    };
    const clearError = () => {
      setError(null);
    };
    const changeNationHandler = (e) => {
      setCountry(e.target.value);
    };
    const onUpdateMovie = () => {
      if (
        namefilm === '' ||
        country === '' ||
        poster === '' ||
        avatar === '' ||
        actor === '' ||
        director === '' ||
        description === '' ||
        category === ''
      ) {
        setError('Oops... Có vẻ bạn thiếu thông tin nào đó');
        console.log('ok');
        return;
      }

      axios({
        method: 'put',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: `/v1/movie/${movie._id}`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        data: {
          nameFilm: namefilm,
          description: description,
          director: director,
          country: country,
          category: category,
          actor: actor,
          movieDay: startDate,
          avatar: avatar,
          background: poster,
          trailer: trailer,
        },
      })
        .then((res) => {
          setShowModal(true);
          setIsLoading(true);
          triggerLoading();
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
      setShowFormUpdate(false);
    };
    return (
      <Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <Modal onCancel={closeModal} header='Thông báo' show={showModal}>
          <p>sửa phim thành công</p>
        </Modal>
        <div className='modal-form-update'>
          <div className='overlay'></div>
          <div className='form-addfilm'>
            <div>
              <div className='form-group'>
                <label className='form-label'>Tên phim</label>
                <input
                  type='text'
                  name='nameFilm'
                  className='form-input'
                  placeholder='Nhập tên phim'
                  value={namefilm}
                  onChange={(e) => setNameFilm(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Quốc gia</label>
                <select
                  name='country'
                  id=''
                  className='form-input'
                  onChange={changeNationHandler}
                  defaultValue={movie.country}
                >
                  <option value='Việt Nam'>Việt Nam</option>
                  <option value='Nga'>Nga</option>
                  <option value='Ukraina'>Ukraina</option>
                  <option value='Mỹ'>Mỹ</option>
                  <option value='Hàn Quốc'>Hàn Quốc</option>
                  <option value='Trung Quốc'>Trung Quốc</option>
                </select>
              </div>
              <div className='form-group'>
                <label className='form-label'>Ngày phát hành</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className='form-input'
                />
              </div>
            </div>
            <div className='frame'>
              <div className='form-group'>
                <label className='form-label'>Poster</label>
                <input
                  type='text'
                  placeholder='Thêm ảnh bìa'
                  name='poster'
                  className='form-input'
                  onChange={(e) => setPoster(e.target.value)}
                  value={poster}
                />
              </div>

              <div className='form-group'>
                <label className='form-label'>Avatar</label>
                <input
                  type='text'
                  name='avatar'
                  className='form-input'
                  placeholder='Thêm ảnh đại diện'
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </div>
            </div>
            <div className='frame'>
              <div className='form-group'>
                <label className='form-label'>Đạo diễn</label>
                <input
                  type='text'
                  name='director'
                  className='form-input'
                  placeholder='Nhập đạo diễn'
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Diễn viên</label>
                <input
                  type='text'
                  name='actor'
                  className='form-input'
                  placeholder='Nhập diễn viên'
                  value={actor}
                  onChange={(e) => setActor(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label className='form-label'>Thể loại</label>
                <input
                  type='text'
                  name='category'
                  className='form-input'
                  placeholder='Nhập thể loại'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div className='form-group'>
              <label className='form-label'>Trailer</label>
              <input
                type='text'
                name='trailer'
                className='form-input'
                placeholder='Thêm trailer'
                value={trailer}
                onChange={(e) => setTrailer(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Mô tả</label>
              <textarea
                type='text'
                name='description'
                className='form-input-area'
                placeholder='Nhập mô tả'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='btn-check'>
              <p onClick={onUpdateMovie}>Cập nhật</p>
              <p
                className='delete-movie'
                onClick={() => setShowFormUpdate(false)}
              >
                Hủy
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
);

export default UpdateMovie;
