import React from 'react'
import GetCookie from '../hooks/getCookie'
import Note from '../components/note';
import { UserNotes } from '../api/userApi'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
    const cookie = GetCookie('token');
  return (
    <div>
        {(cookie) ? (
            <div className="welcome">
                <Note />
            </div>
        ) : (
            <h1>Please login</h1>
        )}



    </div>
  )
}

export default Home


// const UserNotes = () => {
    //     console.log("userNote run");

    //     axios.get(
    //         'https://localhost:7190/api/User/Notes', {
    //             headers: {
    //                 Authorization: 'Bearer ' + cookie
    //               }
    //         })
    //         .then(response => {
    //           console.log(response.data);

    //         })
    //         .catch(function (error) {
    //             console.log(error.response);
    //         });
    // }

    // const AddUserDetails = () => {
    //     console.log("run");

    //     axios.post(
    //         'https://localhost:7190/api/User/AddDetails', {},
    //         {
    //             headers: {
    //                 "Authorization": 'Bearer ' + cookie,
    //                 "content-type": "application/json"
    //               },
    //             params: {
    //                 name : 'Tomas',
    //                 surname : "Birbalas",
    //                 gen : 0,
    //                 dob : "1991-10-02"
    //             }
    //         })
    //         .then(response => {
    //           console.log(response.data);

    //         })
    //         .catch(function (error) {
    //             console.log(error.response);
    //         });
    // }

    // const EditNote = () => {
    //     console.log("editNote run");
    //     const editId = "ED4C23C8-E83C-43F5-BDE0-88A10E073348";

    //     axios.put(
    //         `https://localhost:7190/api/Note/${editId}`, {},
    //         {
    //             headers: {
    //                 "Authorization": 'Bearer ' + cookie,
    //                 "content-type": "application/json"
    //               },
    //             params: {
    //                 title : 'Atnaujintas Post',
    //                 content : 'Koreguoju post',
    //             }
    //         })
    //         .then(response => {
    //           console.log(response.data);

    //         })
    //         .catch(function (error) {
    //             console.log(error.response);
    //         });
    // }
    // const AssignCategoryToNote = (event) => {
    //     console.log("editNote run");
    //     const noteId = event.target.value;

    //     axios.put(
    //         `https://localhost:7190/api/Note/${noteId}/category`, {},
    //         {
    //             headers: {
    //                 "Authorization": 'Bearer ' + cookie,
    //                 "content-type": "application/json"
    //               },
    //             params: {
    //                 categoryTitle : 'Kategorija'
    //             }
    //         })
    //         .then(response => {
    //           console.log(response.data);

    //         })
    //         .catch(function (error) {
    //             console.log(error.response);
    //         });
    // }

    // const CreateCategory = () => {
    //     console.log("createCategory run");

    //     axios.post(
    //         'https://localhost:7190/api/Category', {},
    //         {
    //             headers: {
    //                 "Authorization": 'Bearer ' + cookie,
    //                 "content-type": "application/json"
    //               },
    //             params: {
    //                 title : 'Kategorija'
    //             }
    //         })
    //         .then(response => {
    //           console.log(response.data);

    //         })
    //         .catch(function (error) {
    //             console.log(error.response);
    //         });
    // }

    // const EditCategory = (event) => {
    //     console.log("createCategory run");
    //     const catId = event.target.value;
    //     axios.put(
    //         `https://localhost:7190/api/Category/${catId}`, {},
    //         {
    //             headers: {
    //                 "Authorization": 'Bearer ' + cookie,
    //                 "content-type": "application/json"
    //               },
    //             params: {
    //                 newTitle : 'Koreguota kategorija'
    //             }
    //         })
    //         .then(response => {
    //           console.log(response.data);

    //         })
    //         .catch(function (error) {
    //             console.log(error.response);
    //         });
    // }
    // const DeleteCategory = (event) => {
    //     console.log("deleteCategory run");
    //     const catId = event.target.value;
    //     axios.delete(
    //         `https://localhost:7190/api/Category/${catId}`,
    //         {
    //             headers: {
    //                 "Authorization": 'Bearer ' + cookie,
    //                 "content-type": "application/json"
    //               }
    //         })
    //         .then(response => {
    //           console.log(response.data);

    //         })
    //         .catch(function (error) {
    //             console.log(error.response);
    //         });
    // }
    // const GetCategoriesList = () => {
    //     console.log("categoriesList run");
    //     axios.get(
    //         `https://localhost:7190/api/Category/`,
    //         {
    //             headers: {
    //                 "Authorization": 'Bearer ' + cookie,
    //                 "content-type": "application/json"
    //               }
    //         })
    //         .then(response => {
    //           console.log(response.data);

    //         })
    //         .catch(function (error) {
    //             console.log(error.response);
    //         });
    // }