import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
import Modal from '../../shared/components/Modal';

import 'react-datepicker/dist/react-datepicker.css';
import './AddFilm.css';

function AddFilm({ setIsLoading, setError }) {
  const auth = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

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

  const createMovieHandler = () => {
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
      return;
    }

    setIsLoading(true);
    axios({
      method: 'post',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: '/v1/movie',
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
        setIsLoading(false);
        setShowModal(true);
        setActor('');
        setCategory('');
        setNameFilm('');
        setDirector('');
        setPoster('');
        setAvatar('');
        setDescription('');
        setTrailer('');
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const changeNationHandler = (e) => {
    setCountry(e.target.value);
  };

  return (
    <React.Fragment>
      <Modal onCancel={closeModal} header='Thông báo' show={showModal}>
        <p>Thêm phim thành công</p>
      </Modal>

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
            >
              <option value='Việt Nam'>Việt Nam</option>
              <option value='Nga'>Nga</option>
              <option value='Ukraina'>Ukraina</option>
              <option value='Mỹ'>Mỹ</option>
              <option value='Ukraina'>Trung Quốc</option>
              <option value='Mỹ'>Hàn Quốc</option>
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
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Avatar</label>
            <input
              type='text'
              name='avatar'
              className='form-input'
              placeholder='Thêm ảnh đại diện'
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
        <div className='btn-check' onClick={createMovieHandler}>
          <p>Xác Nhận</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddFilm;
