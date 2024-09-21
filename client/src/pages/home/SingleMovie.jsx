// @ts-nocheck
import { CalendarOutlined } from "@ant-design/icons";
import React from "react";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import moment from "moment";
import { useDispatch } from "react-redux";
const { message, Input, Divider, Row, Col } = require("antd");
const { getMovieById } = require("api_services/movie_services");
const { getAllTheatresByMovie } = require("api_services/theatre_services");
const { useState, useEffect, useCallback } = require("react");
const { useParams, useNavigate } = require("react-router-dom");

const SingleMovie = () => {
  const params = useParams();
  const [movie, setMovie] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDate = (e) => {
    setDate(moment(e.target.value).format("YYYY-MM-DD"));
    navigate(`/movies/${params.id}?date=${e.target.value}`);
  };

  const getData = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await getMovieById(params.id);
      if (response.success === true) {
        setMovie(response.data);
      } else {
        throw (new Error(response.message));
      }
      dispatch(HideLoading());
    } catch (e) {
      message.error(e.message);
      dispatch(HideLoading());
    }
  }, [dispatch, params.id]);

  const getAllTheatres = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllTheatresByMovie({ movie: params.id, date });
      if (response.success === true) {
        setTheatres(response.data);
      } else {
        throw (new Error(response.message));
      }
      dispatch(HideLoading());
    } catch (e) {
      message.error(e.message);

    }
  }, [params.id, date, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getAllTheatres();
  }, [getAllTheatres, date]);

  return (
    <>
      <div className="inner-container">
        {movie && (
          <div className='d-flex single-movie-div'>
            <div className="flex-Shrink-0 me-3 single-movie-img">
              <img src={movie.poster} width={150} alt="Movie Poster" />
            </div>
            <div className="w-100">
              <h1 className="mt-0">{movie.title}</h1>
              <p className="movie-data">
                Language: <span>{movie.language}</span>
              </p>
              <p className="movie-data">
                Genre: <span>{movie.genre}</span>
              </p>
              <p className="movie-data">
                Release Date: <span> {moment(movie.date).format("MMM Do YYYY")}</span>
              </p>
              <p className="movie-data">
                Duration: <span>{movie.duration} Minutes</span>
              </p>
              <hr />
              <div className="d-flex flex-column-mob align-items-center mt-3">
                <label className="me-3 flex-shrink-0">Choose the date:</label>
                <Input
                  onChange={handleDate}
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  className="max-width-300 mt-8px-mob"
                  value={date}
                  placeholder="default size"
                  prefix={<CalendarOutlined />}
                />
              </div>
            </div>
          </div>
        )}
        {theatres.length === 0 && (
          <div className="pt-3">
            <h2 className="blue-clr">
              Currently, no theatres available for this movie!
            </h2>
          </div>
        )}
        {theatres.length > 0 && (
          <div className="theatre-wrapper mt-3 pt-3">
            <h2>Theatres</h2>
            {theatres.map((theatre) => {
              return (
                <div key={theatre._id}>
                  <Row gutter={24} key={theatre._id}>
                    <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                      <h3>{theatre.name}</h3>
                      <p>{theatre.address}</p>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                      <ul className="show-ul">
                        {theatre.shows.sort((a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm"))
                          .map((show) => {
                            return (
                              <li
                                key={show._id}
                                onClick={() => navigate(`/book-show/${show._id}`)}
                              >
                                {moment(show.time, "HH:mm").format("hh:mm A")}
                              </li>
                            );
                          })
                        }
                      </ul>
                    </Col>
                  </Row>
                  <Divider />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SingleMovie;