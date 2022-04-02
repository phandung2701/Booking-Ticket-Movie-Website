import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import Home from './pages/Home';
import Movie from './pages/Movie';
import Booking from './pages/Booking';
import Library from './pages/Library';
import Authentication from './pages/Authentication';
import Notifications from './pages/Notifications';
import NotFound from './pages/NotFound';
import LoadingSpinner from './shared/components/LoadingSpinner';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Admin/Dashboard';
import AddMovie from './pages/Admin/AddMovie';
import Movies from './pages/Admin/Movies';
import './assets/libs/boxicons-2.1.1/css/boxicons.min.css';
import './scss/App.scss';
import Account from './pages/Admin/Account';
import ShowAllMovie from './pages/ShowAllMovie';

// const Home = React.lazy(() => import('./pages/Home'));
// const Movie = React.lazy(() => import('./pages/Movie'));
// const Booking = React.lazy(() => import('./pages/Booking'));
// const Library = React.lazy(() => import('./pages/Library'));
// const Authentication = React.lazy(() => import('./pages/Authentication'));
// const NotFound = React.lazy(() => import('./pages/NotFound'));

const App = () => {
  const { token, login, logout, isAdmin } = useAuth();

  let routes;
  let adminRoutes;

  if (isAdmin === 'admin') {
    adminRoutes = (
      <Route path='/admin' element={<MainLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='add-movie' element={<AddMovie />} />
        <Route path='movie' element={<Movies />} />
        <Route path='account' element={<Account />} />
      </Route>
    );
  } else {
    adminRoutes = (
      <Route path='/admin' element={<MainLayout />}>
        <Route path='dashboard' element={<Navigate to='/' />} />
        <Route path='add-movie' element={<Navigate to='/' />} />
        <Route path='movie' element={<Navigate to='/' />} />
        <Route path='account' element={<Navigate to='/' />} />
      </Route>
    );
  }

  if (token) {
    routes = (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<ShowAllMovie />} />

        <Route path='/movie/:movieId' element={<Movie />} />
        <Route path='/movie/search/:movieName' element={<ShowAllMovie />} />
        <Route path='/movie/search' element={<NotFound />} />

        <Route path='/booking/:movieId' element={<Booking />} />

        <Route path='/authentication' element={<Navigate to='/' />} />

        <Route path='/library' element={<Library />} />
        <Route path='/notifications' element={<Notifications />} />

        <Route path='/admin' element={<NotFound />} />
        {adminRoutes}

        <Route path='/notfound' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/notfound' />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:movieId' element={<Movie />} />
        <Route path='/movies' element={<ShowAllMovie />} />
        <Route path='/movie/search/:movieName' element={<ShowAllMovie />} />
        <Route path='/movie/search' element={<NotFound />} />

        <Route path='/booking/:movieId' element={<Navigate to='/' />} />

        <Route path='/authentication' element={<Authentication />} />

        <Route path='/library' element={<Navigate to='/' />} />
        <Route path='/notifications' element={<Navigate to='/' />} />

        <Route path='/admin' element={<NotFound />} />
        {adminRoutes}

        <Route path='/notfound' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/notfound' />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        isAdmin: isAdmin,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <main>
          <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
