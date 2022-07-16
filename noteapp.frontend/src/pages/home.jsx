import React from 'react'
import GetCookie from '../hooks/getCookie'
import axios from 'axios';

function Home() {
    const cookie = GetCookie('token');

    const UserNotes = () => {
        console.log("userNote run");

        axios.get(
            'https://localhost:7190/api/User/Notes', {
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
            'https://localhost:7190/api/User/AddDetails', {},
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

    const FilterNote = () => {
        console.log("filterNote run");

        axios.get(
            'https://localhost:7190/api/Note',
            {
                headers: {
                    "Authorization": 'Bearer ' + cookie,
                    "content-type": "application/json"
                  },
                params: {
                    title : 'Atnaujintas'
                }
            })
            .then(response => {
              console.log(response.data);

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    const CreateNote = () => {
        console.log("createNote run");

        axios.post(
            'https://localhost:7190/api/Note', {},
            {
                headers: {
                    "Authorization": 'Bearer ' + cookie,
                    "content-type": "application/json"
                  },
                params: {
                    title : 'Bandymas2',
                    content : 'Antras note',
                    isPublic: false
                }
            })
            .then(response => {
              console.log(response.data);

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    const DeleteNote = () => {
        console.log("deleteNote run");
        const postId = "7D1C2438-5207-4398-9E97-62D971D63C42";
        axios.delete(
            `https://localhost:7190/api/Note/${postId}`,
            {
                headers: {
                    "Authorization": 'Bearer ' + cookie,
                    "content-type": "application/json"
                  }
            })
            .then(response => {
              console.log(response.data);

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    const EditNote = () => {
        console.log("editNote run");
        const editId = "ED4C23C8-E83C-43F5-BDE0-88A10E073348";

        axios.put(
            `https://localhost:7190/api/Note/${editId}`, {},
            {
                headers: {
                    "Authorization": 'Bearer ' + cookie,
                    "content-type": "application/json"
                  },
                params: {
                    title : 'Atnaujintas Post',
                    content : 'Koreguoju post',
                }
            })
            .then(response => {
              console.log(response.data);

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    const AssignCategoryToNote = (event) => {
        console.log("editNote run");
        const noteId = event.target.value;

        axios.put(
            `https://localhost:7190/api/Note/${noteId}/category`, {},
            {
                headers: {
                    "Authorization": 'Bearer ' + cookie,
                    "content-type": "application/json"
                  },
                params: {
                    categoryTitle : 'Kategorija'
                }
            })
            .then(response => {
              console.log(response.data);

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    const CreateCategory = () => {
        console.log("createCategory run");

        axios.post(
            'https://localhost:7190/api/Category', {},
            {
                headers: {
                    "Authorization": 'Bearer ' + cookie,
                    "content-type": "application/json"
                  },
                params: {
                    title : 'Kategorija'
                }
            })
            .then(response => {
              console.log(response.data);

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }

    const EditCategory = (event) => {
        console.log("createCategory run");
        const catId = event.target.value;
        axios.put(
            `https://localhost:7190/api/Category/${catId}`, {},
            {
                headers: {
                    "Authorization": 'Bearer ' + cookie,
                    "content-type": "application/json"
                  },
                params: {
                    newTitle : 'Koreguota kategorija'
                }
            })
            .then(response => {
              console.log(response.data);

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    const DeleteCategory = (event) => {
        console.log("deleteCategory run");
        const catId = event.target.value;
        axios.delete(
            `https://localhost:7190/api/Category/${catId}`,
            {
                headers: {
                    "Authorization": 'Bearer ' + cookie,
                    "content-type": "application/json"
                  }
            })
            .then(response => {
              console.log(response.data);

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }
    const GetCategoriesList = () => {
        console.log("categoriesList run");
        axios.get(
            `https://localhost:7190/api/Category/`,
            {
                headers: {
                    "Authorization": 'Bearer ' + cookie,
                    "content-type": "application/json"
                  }
            })
            .then(response => {
              console.log(response.data);

            })
            .catch(function (error) {
                console.log(error.response);
            });
    }



  return (
    <div>
        {(cookie) ? (
            <div className="welcome">
                <h1>Helo</h1>
                {UserNotes()}
                <button onClick={AddUserDetails}>Add User Details</button>
                <button onClick={FilterNote}>Filter</button>
                <button onClick={CreateNote}>Click</button>
                <button onClick={DeleteNote} value="7D1C2438-5207-4398-9E97-62D971D63C42">Delete Note</button>
                <button onClick={EditNote} value="D3130B44-D998-44FE-9E96-A1C0F981A8AF">Edit Note</button>
                <button onClick={AssignCategoryToNote} value="ED4C23C8-E83C-43F5-BDE0-88A10E073348">Assign Note</button>

                <button onClick={CreateCategory}>Sukurk kategorija</button>
                <button onClick={EditCategory} value="57D7FE06-D7D9-4F8D-9C20-BBB8313EF43A">Edit Note</button>
                <button onClick={DeleteCategory} value="57D7FE06-D7D9-4F8D-9C20-BBB8313EF43A">Delete category</button>
                <button onClick={GetCategoriesList}>Get All Categories</button>
            </div>
        ) : (
            <h1>Please login</h1>
        )}
    </div>
  )
}

export default Home