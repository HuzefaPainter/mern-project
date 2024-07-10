import React, { useCallback, useEffect, useState } from 'react'
import { Table, Button, message } from 'antd';
import MovieForm from './MovieForm';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllMovies } from '../../api/movies';
import DeleteMovieModal from './DeleteMovieModal';

function MovieList() {

  const fakeMovies = [
    {
      key: "1",
      poster: "Image1",
      title: "The Green Mile",
      description: "A movie about the magic of human life",
      duration: 120,
      genre: "Drama",
      language: "English",
      releaseDate: "1996-05-02"
    },
    {
      key: "2",
      poster: "Image2",
      title: "Rocky",
      description: "The journey of the comeback of the boxer Rocky Balboa whose down on his luck",
      duration: 160,
      genre: "Action",
      language: "English",
      releaseDate: "1980-08-20"
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState(fakeMovies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return (
          <img
            width="75"
            height="115"
            style={{ objectFit: "cover" }}
            src={data.poster}
            alt={data.title}
          />);
      }
    }, {
      title: "Movie name",
      dataIndex: "title",
    }, {
      title: "Description",
      dataIndex: "description"
    }, {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => {
        return `${text} Mins`;
      }
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language"
    }, {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text) => {
        return moment(text).format("MM-DD-YY");
      }
    }, {
      title: "Action",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            ><EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            ><DeleteOutlined />
            </Button>
          </div>
        );
      }
    }
  ];

  const getData = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllMovies();
      const allMovies = response.data;
      setMovies(allMovies.map((movie) => {
        movie.key = `movie${movie._id}`;
        return movie;
      }))
      dispatch(HideLoading());
    } catch (e) {
      dispatch(HideLoading());
      message.error(e.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className='d-flex justify-content-end'>
      <Button onClick={() => {
        setIsModalOpen(true);
        setFormType("add");
      }}>Add Movie</Button>
      <div style={{ marginBottom: 10 }} />
      <Table dataSource={movies} columns={tableHeadings} />
      {
        isModalOpen && (
          <MovieForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            formType={formType}
            getData={getData}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        )
      }
      {
        isDeleteModalOpen && (
          <DeleteMovieModal
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            getData={getData}
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        )
      }
    </div>
  )
}

export default MovieList