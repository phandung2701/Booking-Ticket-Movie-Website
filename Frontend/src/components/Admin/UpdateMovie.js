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
    const instance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [listC,setListC] = useState([])
    const [listGenre,setListGenre] = useState([])
    const [startDate, setStartDate] = useState(new Date());

    const [name, setNameFilm] = useState('');
    const [country, setCountry] = useState('Việt Nam');
    const [poster, setPoster] = useState('');
    const [avatar, setAvatar] = useState('');
    const [actor, setActor] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [age,setAge] = useState('all')
    const [category, setCategory] = useState([]);
    const [trailer, setTrailer] = useState('');
    const [movieTime,setMovieTime] = useState('')
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
      if (movie) {
        setNameFilm(movie.name);
        setCountry(movie.country);
        setActor(movie.actor);
        setDescription(movie.description);
        setDirector(movie.director);
        setCategory(movie.genre);
        setAvatar(movie.avatar);
        setPoster(movie.background);
        setMovieTime(movie.movieTime)
        setAge(movie?.age ??'all')
        setStartDate(new Date(movie?.releaseDate));
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
    const onUpdateMovie = async() => {
      if (
        name === '' ||
        country === '' ||
        poster === '' ||
        avatar === '' ||
        actor === '' ||
        director === '' ||
        description === '' ||
        movieTime ===''
      ) {
        setError('Oops... Có vẻ bạn thiếu thông tin nào đó');
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
          nameFilm: name,
          description: description,
          director: director,
          country: country,
          genre: category,
          age:age,
          actor: actor,
          releaseDate: startDate,
          avatar: avatar,
          background: poster,
          trailer: trailer,
          movieTime
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
    const handleGenre = (e)=> {
      if(category.includes(e.target.value)) return
      setCategory([...category,e.target.value])
    }
    const handleDeleteGenre = (sid)=>{
      let newCategory = category.filter((genre)=> genre !== sid)
      setCategory(newCategory)
    }
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
                  value={name}
                  onChange={(e) => setNameFilm(e.target.value)}
                />
              </div>
              <div className='form-group'>
            <label className='form-label'>Country</label>
            <select
              name='country'
              id=''
              className='form-input'
              onChange={changeNationHandler}
              value={country}
            >
              <option value="" >Choose country</option>
              {
                listC.map((ele)=>(
                  <option value={ele.sid} key={ele.sid}>{ele.name}</option>
                ))
              }
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
            <label className='form-label'>Age</label>
            <select
              name='country'
              id=''
              className='form-input'
              onChange={(e) => {
                setAge(e.target.value);
              }}
              value={age}
            >
              <option value="all" >All</option>
              <option value="18" >18+</option>
              <option value="13" >13+</option>
            </select>
          </div>
            </div>
            <div className='frame'>
        <div className='form-group' style={{width:'30%'}}>
            <label className='form-label'>Genre</label>
            <select
              name='country'
              id=''
              className='form-input'
              onChange={handleGenre}
              value={category}
            >
              <option value="" >Choose Genre</option>
              {
                listGenre.map((ele)=>(
                  <option value={ele.sid} key = {ele.sid} >{ele.name}</option>
                ))
              }
            </select>
          </div>
          <div style={{width:'70%'}} className='box-tag-genre'>
            {category?.map((ele)=>(
               <p className='tag-genre' key={ele}>
               <span style={{marginRight : "4px"}}>{listGenre.filter((genre) => genre.sid === ele)[0]?.name}</span>
               <i className="bx bx-x" style={{cursor:"pointer"}} onClick={()=>handleDeleteGenre(ele)}></i>
              </p>
            ))}
          </div>
        </div>
            <div className='frame'>
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
              <div className='form-group' style={{width:'30%'}}>
              <label className='form-label'>Movie time</label>
              <input
                type='text'
                name='trailer'
                className='form-input'
                placeholder='trailer'
                value={movieTime}
                onChange={(e) => setMovieTime(e.target.value)}
              />
            </div>
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
