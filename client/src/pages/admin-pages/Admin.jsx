import React from 'react'
import { Tabs } from 'antd';
import MovieList from './MovieList';
import TheatreTable from './TheatreTable';

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
      children: <TheatreTable />
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