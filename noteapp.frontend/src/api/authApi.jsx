import axios from 'axios'
import SetCookie from '../hooks/setCookie'
import RemoveCookie from '../hooks/removeCookie'

const mainHost = 'https://localhost:7190/api/Auth/'

const Login = (details) => {
    axios.post(
        `https://localhost:7190/api/Auth/login`, {
            email : details.email,
            password : details.password,
        })
        .then(response => {
            RemoveCookie('token');
            SetCookie('token', response.data);
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