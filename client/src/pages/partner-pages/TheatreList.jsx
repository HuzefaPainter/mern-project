import React, { useCallback, useEffect, useState } from 'react'
import { Table, Button, message } from 'antd';
import TheatreForm from './TheatreForm';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllTheatres, getAllTheatresByOwner, updateTheatre } from '../../api_services/theatre_services';
import DeleteTheatreModal from './DeleteTheatreModal';
import ShowModal from './ShowModal';

function TheatreList({ isAdmin }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const dispatch = useDispatch();

  const getUser = (state) => state.users && state.users.user;
  const user = useSelector(getUser);
  // const ownerField = {
  //   title: "Owner",
  //   dataIndex: "owner",
  //   render: (text) => {
  //     return text;
  //   }
  // // };
  const handleStatusUpdate = async (theatre) => {
    try {
      dispatch(ShowLoading());
      theatre.isActive = !theatre.isActive;
      const response = await updateTheatre(theatre);
      if (response.success) {
        message.success(response.message);
        await getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (e) {
      dispatch(HideLoading());
      console.log("Error while updating status: ", e.message);
    }
  };

  const adminActions = (data) => {
    if (data.isActive) {
      return (
        <div>
          <Button
            onClick={() => {
              handleStatusUpdate(data);
            }}
          >Block
          </Button>
        </div>)
    } else {
      return (
        <div>
          <Button
            onClick={() => {
              handleStatusUpdate(data);
            }}
          >Approve
          </Button>
        </div>
      );
    }
  };

  const tableHeadings = ([
    {
      title: "Name",
      dataIndex: "name",
    }, {
      title: "Address",
      dataIndex: "address",
    }, {
      title: "Phone Number",
      dataIndex: "phoneNumber"
    }, {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (bool) => {
        return bool ? "Active" : "Pending/Blocked";
      }
    }, {
      title: "Action",
      render: (text, data) => {
        if (isAdmin) {
          return adminActions(data);
        }
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedTheatre(data);
                setFormType("edit");
              }}
            ><EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTheatre(data);
              }}
            ><DeleteOutlined />
            </Button>
            {data.isActive === true ? <Button
              onClick={() => {
                setIsShowModalOpen(true);
                setSelectedTheatre(data);
              }}
            >+ Show
            </Button> : <></>}
          </div>
        );
      }
    }
  ]);

  const getData = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      let response;
      if (isAdmin) {
        response = await getAllTheatres();
      } else {
        response = await getAllTheatresByOwner(user._id);
      }
      const allTheatres = response.data;
      setTheatres(allTheatres.map((theatre) => {
        theatre.key = `theatre${theatre._id}`;
        return theatre;
      }))
      dispatch(HideLoading());
    } catch (e) {
      dispatch(HideLoading());
      message.error(e.message);
    }
  }, [dispatch, user._id, isAdmin]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className='d-flex justify-content-end'>
      <Button onClick={() => {
        setIsModalOpen(true);
        setFormType("add");
      }}>Add Theatre</Button>
      <div style={{ marginBottom: 10 }} />
      <Table dataSource={theatres} columns={tableHeadings} />
      {
        isModalOpen && (
          <TheatreForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            formType={formType}
            getData={getData}
            selectedTheatre={selectedTheatre}
            setSelectedTheatre={setSelectedTheatre}
          />
        )
      }
      {
        isDeleteModalOpen && (
          <DeleteTheatreModal
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            getData={getData}
            selectedTheatre={selectedTheatre}
            setSelectedTheatre={setSelectedTheatre}
          />
        )
      }
      {
        isShowModalOpen && (
          <ShowModal
            isShowModalOpen={isShowModalOpen}
            setIsShowModalOpen={setIsShowModalOpen}
            selectedTheatre={selectedTheatre}
          />
        )
      }
    </div>
  )
}

export default TheatreList