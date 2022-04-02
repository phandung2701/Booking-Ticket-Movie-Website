import React, { useRef } from 'react';

import './Register.css';

function Register(props) {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const onFirstNameChange = () => {
    props.onFirstNameChange(firstNameRef.current.value);
  };

  const onLastNameChange = () => {
    props.onLastNameChange(lastNameRef.current.value);
  };

  const onEmailChange = () => {
    props.onEmailChange(emailRef.current.value);
  };

  const onPasswordChange = () => {
    props.onPasswordChange(passwordRef.current.value);
  };

  const onConfirmPasswordChange = () => {
    props.onConfirmPasswordChange(confirmPasswordRef.current.value);
  };

  const onSubmitRegister = () => {
    props.authSubmitHandler();
  };

  return (
    <div className="register">
      <div className="form">
        <h3>Đăng kí</h3>
        <div className="username">
          <div className="form-field">
            <input
              type="text"
              className="form-input"
              name="first-name"
              placeholder="Họ"
              onChange={onFirstNameChange}
              ref={firstNameRef}
            />
          </div>
          <div className="form-field">
            <input
              type="text"
              className="form-input"
              name="last-name"
              placeholder="Tên"
              onChange={onLastNameChange}
              ref={lastNameRef}
            />
          </div>
        </div>
        <div className="form-field">
          <input
            type="text"
            className="form-input"
            name="email"
            placeholder="Email"
            ref={emailRef}
            onChange={onEmailChange}
          />
        </div>
        <div className="form-field" name="password">
          <input
            type="password"
            className="form-input"
            placeholder="Mật khẩu"
            onChange={onPasswordChange}
            ref={passwordRef}
          />
        </div>
        <div className="form-field" name="enter-password">
          <input
            type="password"
            className="form-input"
            placeholder="Nhập lại mật khẩu"
            onChange={onConfirmPasswordChange}
            ref={confirmPasswordRef}
          />
        </div>
        <p className="btn-register" onClick={onSubmitRegister}>
          Đăng kí
        </p>
        <p className="res-question">
          Bạn đã có tài khoản?{' '}
          <span className="content-text-span" onClick={props.authModeToggler}>
            Đăng nhập ngay
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
