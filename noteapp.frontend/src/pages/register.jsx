import React from 'react'
import { Register } from '../api/authApi'

import RegisterForm from '../components/registerForm'
import '../stylesheets/css/login.min.css'

import image1 from '../Images/randomImages/1.jpg'
import image2 from '../Images/randomImages/2.jpg'
import image3 from '../Images/randomImages/3.jpg'
import image4 from '../Images/randomImages/4.jpg'
import image5 from '../Images/randomImages/5.jpg'


function RegisterUser() {
    const imageArray = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    let random = imageArray[Math.floor(Math.random() * imageArray.length)]

  return (
    <div className="login-page">
        <img src={random} alt="image" className="backgroundImage"/>
        <RegisterForm Register={Register}/>
    </div>
  )
}

export default RegisterUser