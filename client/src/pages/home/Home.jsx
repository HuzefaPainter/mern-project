import { Col, Input, message, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { getAllMovies } from '../../api_services/movie_services';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

function Home() {

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
    } catch (e) {
      console.log("Error in getData in home");
      dispatch(HideLoading());
      message.error(e.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    console.log("SearchText: ", searchText);
  };

  return (
    <>
      <Row className='justify-content-center w-100'>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input placeholder='Search movies...' onChange={handleSearch} prefix={<SearchOutlined />} />
          <br />
          <br />
          <br />
        </Col>
      </Row>
      <Row className='justify-content-center' gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}>
        {
          movies && movies.filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
            .map((movie) => {
              return <Col
                className='gutter-row mb-5'
                key={movie._id}
                xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 10 }}>
                <div className='text-center'>
                  <img onClick={() => {
                    navigate(
                      `/movies/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                    );
                  }}
                    className='cursor-pointer' src={movie.poster} alt="Movie Poster" width={200}
                    style={{ borderRadius: "8px" }} />
                  <h3 onClick={() => {
                    navigate(
                      `/movies/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                    );
                  }}
                    className='cursor-pointer'
                  >{movie.title}</h3>
                </div>
              </Col>
            })
        }
      </Row>
    </>
  )
}

export default Home