import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ErrorModal from '../shared/components/ErrorModal';
import LoadingSpinner from '../shared/components/LoadingSpinner';
import { AuthContext } from '../shared/context/auth-context';
import axios from 'axios';

import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import Login from '../components/Login';
import Register from '../components/Register';

import './Authentication.css';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Authentication = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onFirstNameChange = (firstName) => {
    setFirstName(firstName);
  };
  const onLastNameChange = (lastName) => {
    setLastName(lastName);
  };
  const onEmailChange = (email) => {
    setEmail(email);
  };
  const onPasswordChange = (password) => {
    setPassword(password);
  };
  const onConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(!searchParams.get('register'));

  const authModeToggler = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setIsLoginMode(!isLoginMode);
  };

  const authSubmitHandler = async () => {
    if (!isLoginMode) {
      if (
        firstName === '' ||
        lastName === '' ||
        email === '' ||
        password === '' ||
        confirmPassword === ''
      ) {
        setError('Oops... C?? v??? b???n thi???u th??ng tin n??o ????');
        return;
      } else if (!validateEmail(email)) {
        setError('Email kh??ng h???p l???');
        return;
      } else if (password.length < 3 || password.length > 10) {
        setError('????? d??i password ch??a h???p l???');
        return;
      } else if (password !== confirmPassword) {
        setError('Confirm Password ch??a ch??nh x??c');
        return;
      }
    } else {
      if (email === '' || password === '') {
        setError('Oops... C?? v??? b???n thi???u th??ng tin n??o ????');
        return;
      } else if (!validateEmail(email)) {
        setError('Email kh??ng h???p l???');
        return;
      } else if (password.length < 3 || password.length > 10) {
        setError('????? d??i password ch??a h???p l???');
        return;
      }
    }

    if (isLoginMode) {
      setIsLoading(true);
      axios({
        method: 'post',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/auth/login',
        data: {
          email: email.toString(),
          password: password.toString(),
        },
      })
        .then((res) => {
          auth.login(res.data.role, res.data.token);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.response.data.error);
        });
    } else {
      setIsLoading(true);
      axios({
        method: 'post',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/auth/register',
        data: {
          firstname: firstName.toString(),
          lastname: lastName.toString(),
          email: email.toString(),
          password: password.toString(),
          role: 'user',
        },
      })
        .then((res) => {
          auth.login(res.data.role, res.data.token);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.response.data.error);
        });
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className='authentication-wrapper'>
        <Navbar tab={0} />
        {isLoginMode ? (
          <Login
            authModeToggler={authModeToggler}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            authSubmitHandler={authSubmitHandler}
          />
        ) : (
          <Register
            authModeToggler={authModeToggler}
            onFirstNameChange={onFirstNameChange}
            onLastNameChange={onLastNameChange}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            onConfirmPasswordChange={onConfirmPasswordChange}
            authSubmitHandler={authSubmitHandler}
          />
        )}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Authentication;
