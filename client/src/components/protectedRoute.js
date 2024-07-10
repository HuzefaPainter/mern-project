import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { setUser } from '../redux/userSlice';
import { Layout, Menu, message } from 'antd';
import { HideLoading, ShowLoading } from '../redux/loaderSlice';
import { GetCurrentUser } from '../api/users';
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

  const getValidUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      if (!response.success) {
        dispatch(setUser(null));
        message.error(response.message);
        navigate('/login');
      }
      console.log("Response: ", response);
      dispatch(setUser(response.data));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(setUser(null));
      message.error(error.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

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
