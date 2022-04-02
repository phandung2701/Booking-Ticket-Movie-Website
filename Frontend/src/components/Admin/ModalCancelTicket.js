import React from 'react';

import './ModalCancelTicket.css';

function ModalCancelTicket({
  setShowCancelTicket,
  showCancelTicket,
  cancelAllTicket,
  movie,
}) {
  const cancelAllTicketHandler = () => {
    cancelAllTicket(movie._id);
    setShowCancelTicket(false);
  };

  return showCancelTicket ? (
    <div>
      <div className="overlay"></div>
      <div className="Modal-content">
        <p>Thông báo</p>
        <p>Bạn muốn hủy tất cả vé của bộ phim này?</p>
        <div className="btn-modal">
          <p onClick={cancelAllTicketHandler}>Đồng ý</p>
          <p onClick={() => setShowCancelTicket(false)}>Hủy bỏ</p>
        </div>
      </div>
    </div>
  ) : null;
}

export default ModalCancelTicket;
