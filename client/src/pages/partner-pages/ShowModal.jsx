import { Button, message, Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { getAllMovies } from '../../api_services/movie_services';
import { addShow, deleteShow, getAllShowsByTheatre, updateShow } from 'api_services/show_services';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function ShowModal({
  isShowModalOpen,
  setIsShowModalOpen,
  selectedTheatre
}) {

  const [view, setView] = useState('table');
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [shows, setShows] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    try {
      dispatch(ShowLoading());

      const movieResponse = await getAllMovies();
      if (movieResponse.success) {
        setMovies(movieResponse.data);
      } else {
        message.error(movieResponse.message);
      }

      const showResponse = await getAllShowsByTheatre(selectedTheatre._id);
      if (showResponse.success) {
        setShows(showResponse.data);
      } else {
        message.error(showResponse.message);
      }

      dispatch(HideLoading());
    } catch (e) {
      message.error(e.message);
      dispatch(HideLoading());
    }
  }, [dispatch, selectedTheatre]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (view === "form") {
        response = await addShow({ ...values, theatre: selectedTheatre._id });
      } else {
        response = await updateShow({ ...values, _id: selectedShow._id, theatre: selectedTheatre._id });
      }
      if (response.success) {
        message.success(response.message);
        setView("table");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (e) {
      message.error(e.message);
      dispatch(HideLoading());
    }
  }

  const handleCancel = () => {
    setIsShowModalOpen(false);
  }

  const handleDelete = async (showId) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      response = await deleteShow({ showId: selectedShow._id });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (e) {
      message.error(e.message);
      dispatch(HideLoading());
    }
  }

  const columns = [
    {
      title: "Show name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Show Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Show Time",
      dataIndex: "time",
      key: "time"
    },
    {
      title: "Movie",
      dataIndex: "movie",
      key: "movie"
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
      key: "ticketPrice"
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
      key: "totalSeats"
    },
    {
      title: "Available Seats",
      dataIndex: "bookedSeats",
      key: "bookedSeats",
      render: (text, data) => {
        return data.totalSeats - data.bookedSeats.length;
      }
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, data) => {
        return (
          <div className='d-flex align-items-center gap-10'>
            <Button
              onClick={() => {
                setView("edit");
                setSelectedMovie(data.movie);
                setSelectedShow({
                  ...data, date: moment(data.date).format("YYYY-MM-DD")
                });
              }}
            ><EditOutlined /></Button>
            <Button onClick={() => handleDelete(data._id)}><DeleteOutlined /></Button>
            {data.isActive && (<Button onClick={() => setIsShowModalOpen(true)}>+ Shows</Button>)}
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Modal
      centered
      title={selectedTheatre.name}
      open={isShowModalOpen}
      onCancel={handleCancel}
      width={1200}
      footer={null}
    >
      <div className='d-flex justify-content-between'>
        <h3>
          {
            view === 'table' ?
              "List of Shows" :
              view === 'form' ?
                "Add Show" :
                "Edit Show"
          }
        </h3>
        {
          view === 'table' && (
            <Button type='primary' onClick={() => setView('form')}>
              Add Show
            </Button>
          )
        }
      </div>
    </Modal>
  )
}

export default ShowModal