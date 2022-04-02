import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer'>
        <div className='footer-policy'>
          <div className='intro'>
            <h3 className='title'>Giới thiệu</h3>
            <ul>
              <li>Về chúng tôi</li>
              <li>Trung tâm trợ giúp</li>
              <li>Tuyển dụng</li>
            </ul>
          </div>
          <div className='policy'>
            <h3 className='title'>Chính sách</h3>
            <ul>
              <li>Điều khoản sử dụng</li>
              <li>Quyền riêng tư</li>
              <li>Quy chế hoạt động</li>
            </ul>
          </div>
          <div className='support'>
            <h3 className='title'>Hỗ trợ</h3>
            <ul>
              <li>Địa chỉ: Hà Nội</li>
              <li>Hotline: 093456789</li>
              <li>Email: nitflex@gmail.com</li>
            </ul>
          </div>
          <div className='connect'>
            <h3 className='title'>Kết nối</h3>
            <div>
              <img
                src='https://w7.pngwing.com/pngs/561/460/png-transparent-fb-facebook-facebook-logo-social-media-icon.png'
                alt=''
              />
              <img
                src='https://freepikpsd.com/file/2019/10/foto-in-png-4-1.png'
                alt=''
              />
              <img
                src='https://banner2.cleanpng.com/20190731/ejc/kisspng-youtube-kids-logo-transparency-design-icgeb-cookies-and-privacy-5d41215eaee2c4.0324722015645494707163.jpg'
                alt=''
              />
            </div>
          </div>
        </div>
        <div className='footer-license'>
          <div className='img-wrapper'>
            <img
              src='https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmV0ZmxpeCUyMGxvZ298ZW58MHx8MHx8&w=1000&q=80'
              alt=''
            />
            <img
              src='https://luatthienduc.vn/cloud/image-20200115095241-1.png'
              alt=''
            />
            <img
              src='data:image/png;base64,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'
              alt=''
            />
          </div>
          <p>COPYRIGHT &copy; NITFLEX 2022. ALL RIGHTS RESERVED </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
