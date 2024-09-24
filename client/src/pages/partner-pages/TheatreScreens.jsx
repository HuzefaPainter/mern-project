import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Table, Button, message, Space } from 'antd';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllScreensByTheatreId } from 'api_services/screen_services';
import DeleteScreenModal from './DeleteScreenModal';
import { getTheatre } from 'api_services/theatre_services';

function TheatreScreens() {
  const [screens, setScreens] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [theatre, setTheatre] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const theatreId = useMemo(() => params.id, [params.id]);
  // params.id

  const tableHeadings = ([
    {
      title: "Name",
      dataIndex: "name",
    }, {
      title: "No. of rows",
      dataIndex: "noOfRows",
    }, {
      title: "No. of cols",
      dataIndex: "noOfCols"
    }, {
      title: "Action",
      render: (text, data) => {
        return (
          <div>
            <Space>
              <Button
                onClick={() => {
                  console.log("navigating");
                  navigate('/partner/theatre-screens/form', { state: { formType: "edit", selectedScreen: data, theatreId: theatreId } })
                }}
              ><EditOutlined />
              </Button>
              <Button
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setSelectedScreen(data);
                }}
              ><DeleteOutlined />
              </Button>
            </Space>
          </div>
        );
      }
    }
  ]);

  const getData = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const theatreResponse = await getTheatre(theatreId);
      if (!theatreResponse.success) {
        throw (new Error("Something went wrong fetching theatre"));
      } else {
        setTheatre(theatreResponse.data);
      }
      const response = await getAllScreensByTheatreId(theatreId);
      const allScreens = response.data;
      setScreens(allScreens.map((screen) => {
        screen.key = `screen${screen._id}`;
        return screen;
      }))
      dispatch(HideLoading());
    } catch (e) {
      dispatch(HideLoading());
      message.error(e.message);
    }
  }, [dispatch, theatreId]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='d-flex justify-content-end'>
      <Space direction='vertical'>
        {theatre && theatre.name}
        <Button onClick={() => {
          navigate('/partner/theatre-screens/form', { state: { formType: "add", theatreId: theatreId } })
        }}>Add Screen</Button>
      </Space>
      <div style={{ marginBottom: 10 }} />
      <Table dataSource={screens} columns={tableHeadings} />
      {
        isDeleteModalOpen && (
          <DeleteScreenModal
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            getData={getData}
            selectedScreen={selectedScreen}
            setSelectedScreen={setSelectedScreen}
          />
        )
      }
    </div>
  )
}

export default TheatreScreens