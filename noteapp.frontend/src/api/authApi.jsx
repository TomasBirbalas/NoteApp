import axios from 'axios'
import SetCookie from '../hooks/setCookie'
import RemoveCookie from '../hooks/removeCookie'
import { Navigate } from 'react-router-dom'

const mainHost = 'https://localhost:7190/api/Auth/'

const Login = (details) => {
    axios.post(
        `${mainHost}login`, {
            email : details.email,
            password : details.password,
        })
        .then(response => {
            console.log(response.data);
            RemoveCookie('token');
            SetCookie('token', response.data);
            if(response.status === 200){
                console.log(response.status);
               <Navigate to="/" replace />;
            }
        })
        .catch(function (error) {
            console.log(error.response.data);
        });
}

const Register = details => {
    console.log(details);

    axios.post(
        `${mainHost}register`, {
          email : details.email,
          password : details.password,
          passwordConfirmation : details.confirmPassword,
        })
        .then(response => {
          console.log(response.data);
        });
}

export { Login, Register }