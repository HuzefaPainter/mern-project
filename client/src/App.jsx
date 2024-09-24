import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'
import React from 'react';
import Home from './pages/home/Home';
import ProtectedRoute from 'components/ProtectedRoute';
import store from './redux/store';
import { Provider } from 'react-redux';
import Admin from 'pages/admin-pages/Admin';
import AdminProtectedRoute from 'components/AdminProtectedRoute';
import PartnerProtectedRoute from 'components/PartnerProtectedRoute';
import Partner from 'pages/partner-pages/Partner';
import Profile from 'pages/user-pages/Profile';
import SingleMovie from 'pages/home/SingleMovie';
import BookShow from 'pages/user-pages/BookShow';
import TheatreScreens from 'pages/partner-pages/TheatreScreens';
import ScreenForm from 'pages/partner-pages/ScreenForm';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin' element={<ProtectedRoute><AdminProtectedRoute><Admin /></AdminProtectedRoute></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/partner' element={<ProtectedRoute><PartnerProtectedRoute><Partner /></PartnerProtectedRoute></ProtectedRoute>} />
            <Route path='/partner/theatre-screens/:id' element={<ProtectedRoute><PartnerProtectedRoute><TheatreScreens /></PartnerProtectedRoute></ProtectedRoute>} />
            <Route path='/partner/theatre-screens/form' element={<ProtectedRoute><PartnerProtectedRoute><ScreenForm /></PartnerProtectedRoute></ProtectedRoute>} />
            <Route
              path="/movies/:id"
              element={
                <ProtectedRoute>
                  <SingleMovie />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-show/:id"
              element={
                <ProtectedRoute>
                  <BookShow />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
