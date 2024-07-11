import moment from 'moment';
import React, { useCallback, useState } from 'react'

function MovieShowsInTheatreModal({ isModalOpen, setIsModalOpen, selectedTheatre }) {

  const [view, setView] = useState("table");
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [shows, setShows] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  const getData = useCallback(async () => {

  }, []);
  //TODO: Complete file later
  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Show Date",
      dataIndex: "date",
      render: (text, data) => {
        return moment(text).format("MMM DD YYYY");
      }
    },
  ];

  return (
    <div>MoviesInTheatreModal</div>
  )
}

export default MovieShowsInTheatreModal