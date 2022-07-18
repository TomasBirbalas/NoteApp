import React, {useEffect, useState} from 'react'
import axios from 'axios'
import GetCookie from '../hooks/getCookie';
import RemoveCookie from '../hooks/removeCookie';

function MyAccountMenu() {

  let cookie = GetCookie('token');
  const [data, setData] = useState([]);
  const classes = ["my-account"];
  const userCardClass = ["user-card"];
  
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

  if(data !== null) {
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