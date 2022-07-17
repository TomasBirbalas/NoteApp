import GetCookie from '../hooks/getCookie'
import axios from 'axios'

const cookie = GetCookie('token');
const mainHost = "https://localhost:7190/api/Note";

const CreateNote = () => {
    console.log("createNote run");

    axios.post(
        mainHost, {},
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

const EditNote = (event) => {
    console.log("editNote run");
    const editId = event.target.value;

    axios.put(
        mainHost + editId, {},
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

const DeleteNote = (event) => {
    console.log("deleteNote run");
    const postId = event.targe.value;
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

const FilterNote = () => {
    console.log("filterNote run");

    axios.get(
        mainHost,
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

const AssignCategoryToNote = (event) => {
    console.log("editNote run");
    const noteId = event.target.value;

    axios.put(
        `${mainHost + noteId}/category`, {},
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

export { CreateNote, EditNote, DeleteNote, FilterNote, AssignCategoryToNote };