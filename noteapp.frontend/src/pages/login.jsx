import React, { useState } from 'react'
import axios from 'axios'
import SetCookie from '../hooks/setCookie'
import RemoveCookie from '../hooks/removeCookie'

import "../stylesheets/css/login.min.css"

import LoginForm from '../components/loginForm'

import image1 from '../Images/randomImages/1.jpg'
import image2 from '../Images/randomImages/2.jpg'
import image3 from '../Images/randomImages/3.jpg'
import image4 from '../Images/randomImages/4.jpg'
import image5 from '../Images/randomImages/5.jpg'

const imageArray = [
    image1,
    image2,
    image3,
    image4,
    image5
]

function Login() {
    let random = imageArray[Math.floor(Math.random() * imageArray.length)]
    
    const [error, setError] = useState("");
    const Login = details => {
        console.log(details);

        axios.post(
            'https://localhost:7190/api/Auth/login', {
              email : details.email,
              password : details.password,
            })
            .then(response => {
              console.log(response.data);
              RemoveCookie('token');
              SetCookie('token', response.data);
            })
            .catch(function (error) {
                setError(error.response.data);
                console.log(error.response.data);
            });
    }
  return (
    <div className="login-page">
        <img src={random} alt="image" className="backgroundImage"/>
        <LoginForm Login={Login} error={error}/>
    </div>
  )
}

export default Login