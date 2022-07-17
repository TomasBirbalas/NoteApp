import GetCookie from '../hooks/getCookie'
import { Login } from '../api/authApi'
import { Navigate } from 'react-router-dom'


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
const cookies = GetCookie('token');

function LoginUser() {
    let random = imageArray[Math.floor(Math.random() * imageArray.length)]
    
    // const [error, setError] = useState("");
  return (
    <div className="login-page">
        <img src={random} alt="image" className="backgroundImage"/>
        {/* <LoginForm Login={Login} error={error}/> */}
        <LoginForm Login={Login}/>
        {cookies ? <Navigate to="/"/> : console.log() }
    </div>
  )
}

export default LoginUser