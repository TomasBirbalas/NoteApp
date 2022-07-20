import GetCookie from '../hooks/getCookie'

import "../stylesheets/css/login.min.css"

import CustomerDetailsForm from '../components/customerDetailsForm'

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
let cookies = GetCookie('token');

function CustomerDetailsPage() {
    let random = imageArray[Math.floor(Math.random() * imageArray.length)]
  return (
    <div className="login-page">
        <img src={random} alt="image" className="backgroundImage"/>
        <CustomerDetailsForm/>
    </div>
  )
}

export default CustomerDetailsPage
