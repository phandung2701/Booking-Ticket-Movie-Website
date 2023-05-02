import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
import Modal from '../../shared/components/Modal';

import 'react-datepicker/dist/react-datepicker.css';
import './AddFilm.css';

function AddFilm({ setIsLoading, setError }) {
  const auth = useContext(AuthContext);
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
  const [showModal, setShowModal] = useState(false);
  const [listC,setListC] = useState([])
  const [listGenre,setListGenre] = useState([])
  const [startDate, setStartDate] = useState(new Date());

  const [namefilm, setNameFilm] = useState('');
  const [country, setCountry] = useState('');
  const [poster, setPoster] = useState('');
  const [age,setAge] = useState('')
  const [avatar, setAvatar] = useState('');
  const [actor, setActor] = useState('');
  const [director, setDirector] = useState('');
  const [description, setDescription] = useState('');
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
        movie_time:movieTime,
        age:age,
        releaseDate: startDate,
        avatar: avatar,
        background: poster,
        trailer: trailer,
      },
    })
      .then((res) => {
        setIsLoading(false);
        setShowModal(true);
        setActor('');
        setCategory([]);
        setNameFilm('');
        setDirector('');
        setPoster('');
        setAvatar('');
        setAge('')
        setDescription('');
        setTrailer('');
        setMovieTime('')
      })
      .catch((err) => {
        setIsLoading(false);
        setError("Create failed!!");
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const changeNationHandler = (e) => {
    setCountry(e.target.value);
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
    <React.Fragment>
      <Modal onCancel={closeModal} header='Thông báo' show={showModal}>
        <p>Create successFully!</p>
      </Modal>

      <div className='form-addfilm'>
        <div>
          <div className='form-group'>
            <label className='form-label'>Movie name</label>
            <input
              type='text'
              name='nameFilm'
              className='form-input'
              placeholder='movie name'
              value={namefilm}
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
            <label className='form-label'>Release date</label>
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
              placeholder='poster'
              name='poster'
              className='form-input'
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Avatar</label>
            <input
              type='text'
              name='avatar'
              className='form-input'
              placeholder='avatar'
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>
        <div className='frame'>
          <div className='form-group'>
            <label className='form-label'>Director</label>
            <input
              type='text'
              name='director'
              className='form-input'
              placeholder='director'
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label className='form-label'>Actor</label>
            <input
              type='text'
              name='actor'
              className='form-input'
              placeholder='actor'
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
              onChange={(e)=> setAge(e.target.value)}
              value={age}
            >
              <option value="all" >All</option>
              <option value="18" >18+</option>
              <option value="13" >13+</option>
              <option value="7" >7+</option>
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
            {category.map((ele)=>(
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
              placeholder='trailer'
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
          <label className='form-label'>Description</label>
          <textarea
            type='text'
            name='description'
            className='form-input-area'
            placeholder='description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='btn-check' onClick={createMovieHandler}>
          <p>Create</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddFilm;
