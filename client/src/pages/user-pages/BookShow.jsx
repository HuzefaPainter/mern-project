import { message } from 'antd';
import { getShow } from 'api_services/show_services';
import React, { useCallback, useEffect, useState } from 'react'
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
const { useSelector, useDispatch } = require("react-redux");
const { useParams, useNavigate } = require("react-router-dom");

function BookShow() {
  const getUser = (state) => state.users && state.users.user;
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await getShow({ showId: params.id });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (e) {
      message.error(e.message);
      dispatch(HideLoading());
    }
  }, [dispatch, params.id]);

  const getSeats = () => {

  };
  return (
    <div></div>
  );
};

export default BookShow;