import React, {useEffect, useState} from 'react'
import axios from 'axios'
import GetCookie from '../hooks/getCookie';
import RemoveCookie from '../hooks/removeCookie';
import { Navigate } from 'react-router-dom'

function MyAccountMenu() {

  const [isCookieExist, setIsCookieExist] = useState();
  const [data, setData] = useState({});
  const classes = ["my-account"];
  
  const cookie = GetCookie('token');
  useEffect(() => {
    const fetchUserData = async () =>{
      try {
        const resp = await axios.get(
          "https://localhost:7190/api/User/",
          {
              headers: {
                  "Authorization": 'Bearer ' + cookie,
                  "content-type": "application/json"
                  }
          })
          setData(resp.data)
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
    if(typeof cookie === 'string' && cookie.length === 0 || cookie === null)
    {
      setIsCookieExist(false);

    }else {
      setIsCookieExist(true);
      fetchUserData();
    }
  }, [isCookieExist])

  const logout = () => {
    RemoveCookie('token');
    setIsCookieExist(false);
    <Navigate to="/login" replace={true}/>
  }

  if(Object.keys(data).length === 0) {
    <Navigate to="/customer-details" replace />
  }else {
    classes.push("logedin");
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
     </div>
     {/* {(Object.keys(data).length === 0 && cookie !== null) ? <Navigate to="/customer-details" replace={true}/>: ''} */}
    </div>
  )
}

export default MyAccountMenu