import React, {useEffect, useState} from 'react'
import axios from 'axios'
import GetCookie from '../hooks/getCookie';
import RemoveCookie from '../hooks/removeCookie';
import { Navigate } from 'react-router-dom'

function MyAccountMenu() {

  let cookie = GetCookie('token');
  const [data, setData] = useState([]);
  const classes = ["my-account"];
  

  if(cookie && data == null){
    <Navigate to="/account-details" />
  }


  useEffect(() => {
    if(cookie !== null && cookie !== undefined){
      axios.get(
        "https://localhost:7190/api/User/",
        {
            headers: {
                "Authorization": 'Bearer ' + cookie,
                "content-type": "application/json"
                }
        })
        .then(response => {
            console.log(response.data);
            setData(response.data)
        })
        .catch(function (error) {
            console.log(error.response);
        });
    }
  }, {})

  if(data.lenght > 0) {
    console.log(data)
    classes.push("logedin");
  }

  const logout = () => {
    RemoveCookie('token');
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
     </div>
    </div>
  )
}

export default MyAccountMenu