import React from 'react'
import GetCookie from '../hooks/getCookie'
import Note from '../components/note';
import { Navigate } from 'react-router-dom'

function Home() {
let cookie = GetCookie('token');
  return (
      <>
      {
          (cookie === null) ?
          <Navigate to="/login" replace={true} />
          : 
          <div className="welcome">
                <Note />
          </div>
      }
      </>
  )
}

export default Home