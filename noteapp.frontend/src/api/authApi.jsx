import axios from 'axios'
import SetCookie from '../hooks/setCookie'
import RemoveCookie from '../hooks/removeCookie'
import { Link } from 'react-router-dom'

import Swal from 'sweetalert2'


const mainHost = 'https://localhost:7190/api/Auth/'

const Register = details => {
    console.log(details);

    axios.post(
        `${mainHost}register`, {
          email : details.email,
          password : details.password,
          passwordConfirmation : details.confirmPassword,
        })
        .then(response => {
          if(response.status == 200){
            Swal.fire({
                title: 'Successfully',
                text: 'Have a nice journey with NoteApp',
                icon: 'success',
              })
        }
        });
}

export {  Register }