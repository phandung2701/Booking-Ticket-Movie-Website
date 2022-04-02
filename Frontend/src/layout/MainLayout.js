import React from 'react';
import './main-layout.scss';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Admin/Sidebar';
import TopNav from '.././components/Admin/TopNav';

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <div className='main'>
        <div className='main__content'>
          <TopNav />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
