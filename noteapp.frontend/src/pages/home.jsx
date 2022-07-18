import React from 'react'
import GetCookie from '../hooks/getCookie'
import Note from '../components/note';

function Home() {
    let cookie = GetCookie('token');
    console.log(cookie);
  return (
      <>
      {
          (cookie !== null) ?
          <div className="welcome">
              {console.log("patekau")}
                <Note />
            </div>
            : 
            <h1>Please login</h1>
      }
      </>
  )
}

export default Home