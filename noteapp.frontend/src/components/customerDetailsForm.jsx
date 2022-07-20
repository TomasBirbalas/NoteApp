import React, { useState } from 'react'
import axios from 'axios'
import GetCookie from '../hooks/getCookie';
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'

function CustomerDetailsForm() {
    const [details, setDetails] = useState({name: "", surname: "", gen: 0, dob: ""});
    const [respStatus, setRespStatus] = useState(0);

    let cookie = GetCookie('token');

    var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const UserDetails = async (details) => {
        await axios.post(
            `https://localhost:7190/api/User/AddDetails`, {}, {
                headers: {
                    "Authorization": 'Bearer ' + cookie,
                    "content-type": "application/json"
                  },
                  params: details 
            })
            .then(response => {
                setRespStatus(response.status);

                if(respStatus == 200){
                    Swal.fire({
                        title: 'Thank you',
                        text: 'Have a nice journey with NoteApp',
                        icon: 'success',
                      })
                }else {
                    Swal.fire({
                        title: 'Error!',
                        text: `Please try again...`,
                        icon: 'error',
                        confirmButtonText: 'Lets try one more time'
                      })
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    }


    const submitHandler = (e) => {
        e.preventDefault();
        UserDetails(details);
    }
  return (
    <form className="form" onSubmit={submitHandler}>
        <h1>We want to know more about you</h1>
        <div className="input">
            <input id="name" className="input-wrap" type="text" name="email" placeholder=" " onChange={e => setDetails({...details, name: e.target.value})} value={details.name} required/>
            <label htmlFor="email" className="float-label">Name:</label>
        </div>
        <div className="input">
            <input id="surname" className="input-wrap" type="text" name="surname" placeholder=" " onChange={e => setDetails({...details, surname: e.target.value})} value={details.surname} required/>
            <label htmlFor="surname" className="float-label">Surname:</label>
        </div>
        <div className="input">
            <select id="gender" className="input-wrap" type="text" name="gender" placeholder=" " onChange={e => setDetails({...details, gen: e.target.value})} value={details.gen} required>
            <option value="0">Man</option>
            <option value="1">Woman</option>
            <option value="2">I will not reveal</option>
            </select>
            <label htmlFor="gender" className="float-label">Gender:</label>
        </div>

        <div className="input">
            <input id="dob" className="input-wrap" type="date" name="dob" min="1950-01-01" max={date} onChange={e => setDetails({...details, dob: e.target.value})} value={details.dob} required/>
            <label htmlFor="dob" className="float-label">Date Of Birth::</label>
        </div>

        <input type="submit" value="Confirm data" />
        {(respStatus === 200) ? <Navigate to="/" /> : ''}
    </form>
  )
}

export default CustomerDetailsForm
