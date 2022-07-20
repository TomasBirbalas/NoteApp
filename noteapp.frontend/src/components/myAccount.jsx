import React, {useEffect, useState} from 'react'
import axios from 'axios'
import GetCookie from '../hooks/getCookie';
import RemoveCookie from '../hooks/removeCookie';
import { Navigate } from 'react-router-dom'

function MyAccountMenu() {

  const [isCookieExist, setIsCookieExist] = useState();
  const [data, setData] = useState({});
  const classes = ["my-account"];
  
  useEffect(() => {
    const cookie = GetCookie('token');
    console.log(cookie)
    if(cookie == null)
    {
      setIsCookieExist(false);
    }else {
      setIsCookieExist(true);
    }

    const fetchUserData = async () =>{
      try {
        await axios.get(
          "https://localhost:7190/api/User/",
          {
              headers: {
                  "Authorization": 'Bearer ' + cookie,
                  "content-type": "application/json"
                  }
          })
          .then(response => {
            console.log(response)
              setData(response.data)
          })
          .catch(function (error) {
              console.log(error.response);
          });
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }

    if(isCookieExist){
      fetchUserData();
    }
  }, {})

  if(Object.keys(data).length === 0) {
    console.log('tuscia');
    <Navigate to="/customer-details" replace />
  }else {
    classes.push("logedin");
  }

  const logout = () => {
    RemoveCookie('token');
    setIsCookieExist(false);
  }

  if(!isCookieExist) {
    <Navigate to="/login" />
  }

  return (
    <div className={classes.join(" ")}>
      <div className="accout-symbol">
        <i className='fa-regular fa-user'></i>
        <div className='round'></div>
      </div>
      <div className="user-card">
        <h2>{data.name} {data.surname}</h2>
        <button onClick={logout}>Log out</button>
        {(!isCookieExist ? <Navigate to="/login" /> : '')}
     </div>
    </div>
  )
}

export default MyAccountMenu