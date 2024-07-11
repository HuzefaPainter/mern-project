import { message } from 'antd';
import { GetCurrentUser } from '../api/users';
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../redux/loaderSlice';
import { setUser } from '../redux/userSlice';

function AdminProtectedRoute({ children }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getValidUser = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      if (!response.success) {
        dispatch(setUser(null));
        message.error(response.message);
        navigate('/login');
      } else {
        dispatch(setUser(response.data));
        if (response.data.role !== "admin") {
          message.error("You do not have the permission to access this page");
          navigate('/');
        }
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(setUser(null));
      message.error(error.message);
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, [navigate, getValidUser]);

  return (
    <div>{children}</div>
  )
}

export default AdminProtectedRoute