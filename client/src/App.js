import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'
import React from 'react';
import Home from './pages/home/Home';
import ProtectedRoute from 'components/ProtectedRoute';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
