import React from 'react';

import './BoxActor.css';

function BoxActor() {
  return (
    <div className='box-actor'>
      <h2>Diễn viên</h2>
      <div className='actor-all'>
        <div className='actor-item'>
          <img
            src='https://www.elleman.vn/wp-content/uploads/2020/04/25/177000/dien-vien-trung-quoc-cuc-tinh-y.jpg'
            alt=''
          />
          <p>Cúc Tịch Y</p>
        </div>
        <div className='actor-item'>
          <img
            src='https://newsmd2fr.keeng.net/tiin/archive/images/534/202007/20200708/tinngan_101519_947287012_1.jpg'
            alt=''
          />
          <p>Triệu Lệ Dĩnh</p>
        </div>
        <div className='actor-item'>
          <img
            src='https://tenhaynhat.com/wp-content/uploads/2019/05/dich-le-nhiet-ba-1.jpg'
            alt=''
          />
          <p>Địch Lệ Nhiệt Ba</p>
        </div>
      </div>
    </div>
  );
}

export default BoxActor;
