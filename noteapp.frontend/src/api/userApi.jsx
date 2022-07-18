import GetCookie from '../hooks/getCookie'
import axios from 'axios'

let cookie = GetCookie('token');
const mainHost = "https://localhost:7190/api/User/";
const UserNotes = () => {

    console.log("userNote run");

    axios.get(
        `${mainHost}Notes`, {
            headers: {
                Authorization: 'Bearer ' + cookie
                }
        })
        .then(response => {
            console.log(response.data);

        })
        .catch(function (error) {
            console.log(error.response);
        });
}

const AddUserDetails = () => {
    console.log("run");

    axios.post(
        `${mainHost}AddDetails`, {},
        {
            headers: {
                "Authorization": 'Bearer ' + cookie,
                "content-type": "application/json"
                },
            params: {
                name : 'Tomas',
                surname : "Birbalas",
                gen : 0,
                dob : "1991-10-02"
            }
        })
        .then(response => {
            console.log(response.data);

        })
        .catch(function (error) {
            console.log(error.response);
        });
}

export {UserNotes,  AddUserDetails}