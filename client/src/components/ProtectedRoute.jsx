import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { setUser } from '../redux/userSlice';
import { Layout, Menu, message } from 'antd';
import { HideLoading, ShowLoading } from '../redux/loaderSlice';
import { GetCurrentUser } from '../api_services/user_services';
import { Header } from 'antd/es/layout/layout';


const ProtectedRoute = ({ children }) => {
  const getUser = (state) => state.users && state.users.user;
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
      key: "home"
    },
    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      key: "profile",
      children: [
        {
          label: (<span
            onClick={() => {
              if (user.role === "admin") {
                navigate('/admin');
              } else if (user.role === "partner") {
                navigate("/partner");
              } else {
                navigate("/profile");
              }
            }}>
            My Profile
          </span>),
          icon: <ProfileOutlined />
        },
        {
          label: (<span
            onClick={() => {
              localStorage.removeItem("jwtToken");
              dispatch(setUser(null));
              navigate("/login");
            }}
          >
            Logout
          </span>),
          icon: <LogoutOutlined />,
          key: "logout"
        }
      ]
    },
  ]

  const getValidUser = useCallback(async () => {
    const handleInvalidUser = (errorMessage) => {
      dispatch(setUser(null));
      localStorage.removeItem("jwtToken");
      message.error(errorMessage);
      navigate('/login');
    };
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      if (!response.success) {
        handleInvalidUser(response.message)
      } else {
        dispatch(setUser(response.data));
      }
      dispatch(HideLoading());
    } catch (error) {
      handleInvalidUser(error.message)
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
    user && (
      <>
        <Layout>
          <Header
            className='d-flex justify-content-between'
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center"
            }}
          >
            <h3 className='demo-logo text-white m-0' style={{ color: "white" }}>
              Book My Show!
            </h3>
            <Menu theme='dark' mode='horizontal' items={navItems} />
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>{children}</div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;
