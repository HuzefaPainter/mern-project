import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Select, Space, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { getAllMovies } from '../../api_services/movie_services';
import { addShow, deleteShow, getAllShowsByTheatre, updateShow } from 'api_services/show_services';
import moment from 'moment';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

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
        getData();
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
      response = await deleteShow(showId);
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

  const showColumns = [
    {
      title: "Show name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Show Date",
      dataIndex: "date",
      key: "date",
      render: (text) => {
        return moment(text).format("DD/MM/YY");
      }
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
            <Space>
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
            </Space>
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
            <Space direction="vertical">
              <Button type='primary' onClick={() => setView('form')}>
                Add Show
              </Button>
              <br />
            </Space>
          )
        }
      </div>
      {view === "table" && <Table dataSource={shows} columns={showColumns} />}

      {(view === "form" || view === "edit") && (
        <Form
          className=''
          layout='vertical'
          style={{ width: "100%" }}
          initialValues={view === "edit" ? selectedShow : null}
          onFinish={onFinish}
        >
          <Row
            gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}
          >
            <Col span={24}>
              <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                <Col span={8}>
                  <Form.Item
                    label="Show Name"
                    htmlFor='name'
                    name='name'
                    className='d-block'
                    rules={[{ required: true, message: "Show name is required!" }]}
                  >
                    <Input id="name" type="text" placeholder='Enter the show name' />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Show Date"
                    htmlFor='date'
                    name='date'
                    className='d-block'
                    rules={[{ required: true, message: "Show date is required!" }]}
                  >
                    <Input id="date" type="date" min={"2024-09-24"} placeholder='Enter the show date' />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Show Timing"
                    htmlFor='time'
                    name='time'
                    className='d-block'
                    rules={[{ required: true, message: "Show time is required!" }]}
                  >
                    <Input id="time" type="time" placeholder='Enter the show time' />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
                <Col span={8}>
                  <Form.Item
                    label="Select the Movie"
                    htmlFor='movie'
                    name='movie'
                    className='d-block'
                    rules={[{ required: true, message: "Movie is required!" }]}
                  >
                    <Select id="movie" placeholder='Select Movie' defaultValue={selectedMovie && selectedMovie.title}
                      style={{ width: "100%", height: "45px" }}
                      options={movies.map((movie) => ({
                        key: movie._id, value: movie._id, label: movie.title
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Ticket Price"
                    htmlFor='ticketPrice'
                    name='ticketPrice'
                    className='d-block'
                    rules={[{ required: true, message: "Ticket price is required!" }]}
                  >
                    <Input id="ticketPrice" type="number" placeholder='Enter the ticket price' />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Total Seats"
                    htmlFor='totalSeats'
                    name='totalSeats'
                    className='d-block'
                    rules={[{ required: true, message: "Total seats is required!" }]}
                  >
                    <Input id="totalSeats" type="number" placeholder='Enter the total number of seats' />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Space>
              <Button className='' block onClick={() => {
                setView("table");
              }} htmlType='button'>
                <ArrowLeftOutlined /> Go Back
              </Button>
              <Button className='' block type="primary" htmlType='submit'
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                {view === "form" ? "Add Show" : "Edit Show"}
              </Button>
            </Space>
          </Row>
        </Form>
      )}
    </Modal>
  );
};

export default ShowModal;