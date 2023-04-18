import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import Cart from '../components/Cart';

import Modal from '../shared/components/Modal';
import Button from '../shared/components/Button';

import { AuthContext } from '../shared/context/auth-context';

import LoadingSpinner from '../shared/components/LoadingSpinner';
import ErrorModal from '../shared/components/ErrorModal';

import axios from 'axios';

import './Library.css';

const Library = () => {
  const auth = useContext(AuthContext);
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
  const [error, setError] = useState(null);
  const clearError = () => {
    setError(null);
  };
  const [isLoading, setIsLoading] = useState(false);

  const [modalIsShown, setModalIsShown] = useState(false);

  const closeModal = () => {
    setModalIsShown(false);
  };

  const [booked, setBooked] = useState([]);

  const fetchData = async() => {
    const tempArr = [];
    setIsLoading(true);
    try{
      let ticketBooked = await instance.post('/v1/booking/ticket')
      if (ticketBooked.data.booked.length === 0) {
        setIsLoading(false);
        return;
      }
      setBooked(ticketBooked.data.booked)
      setIsLoading(false);
    }
    catch(err){
      console.log(err)
      setIsLoading(false);
    }
  };

  const [chosenTicket, setChosenTicket] = useState('');

  const cancelTicket = () => {
    setIsLoading(true);
    axios({
      method: 'put',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: `/v1/ticket/${chosenTicket}/status`,
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      data: {
        status: 'cancelled',
      },
    })
      .then((res) => {
        setModalIsShown(false);
        setIsLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Modal
        onCancel={closeModal}
        header='Oops...'
        show={modalIsShown}
        footer={
          <>
            <span className='close-modal-btn' onClick={closeModal}>
              Hủy
            </span>
            <Button>
              <Link to={'/library'} onClick={cancelTicket}>
                <p className='confirm-login-btn'>Hủy vé</p>
              </Link>
            </Button>
          </>
        }
      >
        <p>Bạn muốn hủy vé? Lưu ý hành động này không thể hoàn tác</p>
      </Modal>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className='library-wrapper'>
        <Navbar tab={3} />
        <Cart
            booked = {booked}
        />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Library;
