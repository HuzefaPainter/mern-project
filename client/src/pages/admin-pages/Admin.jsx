import React from 'react'
import { Tabs } from 'antd';
import MovieList from './MovieList';
import TheatreList from '../partner-pages/TheatreList';

function Admin() {

  const tableItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />
    },
    {
      key: "2",
      label: "Theatres",
      children: <TheatreList isAdmin={true} />
    }
  ]

  return (
    <div style={{ margin: 25 }}>
      <h1>Admin Page</h1>
      <Tabs items={tableItems}></Tabs>
    </div>
  )
}

export default Admin