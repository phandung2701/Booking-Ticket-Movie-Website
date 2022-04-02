import React from 'react';

import './Notification.css';

const Notification = ({ message }) => {
  return (
    <div className="notification">
      <p>{message.content}</p>
      <span>{message.time}</span>
    </div>
  );
};

export default Notification;
