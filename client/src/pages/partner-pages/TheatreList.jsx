import React, { useCallback, useEffect, useState } from 'react'
import { Table, Button, message } from 'antd';
import TheatreForm from './TheatreForm';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllTheatres, getAllTheatresByOwner } from '../../api/theatre';
import DeleteTheatreModal from './DeleteTheatreModal';

function TheatreList({ isAdmin }) {

  const fakeTheatres = [
    {
      key: "1",
      name: "PVR INOX",
      address: "Juhu Tara Road, Juhu, Mumbai",
      phoneNumber: "9819240550",
      email: "pvrInoxJuhu@pvr.com",
      owner: "668bf0e09854da2d57267c08",
      isActive: true
    },
    {
      key: "2",
      name: "PVR IMAX",
      address: "Jio World Plaza, BKC, Mumbai",
      phoneNumber: "9833027997",
      email: "pvrImaxBKC@pvr.com",
      owner: "668fee602bbaec348ad13b10",
      isActive: false
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theatres, setTheatres] = useState(fakeTheatres);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
        return bool ? "Active" : "Pending";
      }
    }, {
      title: "Action",
      render: (text, data) => {
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
    </div>
  )
}

export default TheatreList