import React from 'react'
import axios from 'axios'

import RegisterForm from '../components/registerForm'
import '../stylesheets/css/login.min.css'

import image1 from '../Images/randomImages/1.jpg'
import image2 from '../Images/randomImages/2.jpg'
import image3 from '../Images/randomImages/3.jpg'
import image4 from '../Images/randomImages/4.jpg'
import image5 from '../Images/randomImages/5.jpg'


function Register() {
    const imageArray = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    let random = imageArray[Math.floor(Math.random() * imageArray.length)]

    const Register = details => {
        console.log(details);

        axios.post(
            'https://localhost:7190/api/Auth/register', {
              email : details.email,
              password : details.password,
              passwordConfirmation : details.confirmPassword,
            })
            .then(response => {
              console.log(response.data);
            });
    }
  return (
    <div className="login-page">
        <img src={random} alt="image" className="backgroundImage"/>
        <RegisterForm Register={Register}/>
    </div>
  )
}

export default Register