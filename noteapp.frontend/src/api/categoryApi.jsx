import GetCookie from '../hooks/getCookie'
import axios from 'axios'

const cookie = GetCookie('token');
const mainHost = "https://localhost:7190/api/Category";

const CreateCategory = () => {
    console.log("createCategory run");

    axios.post(
        mainHost, {},
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
        mainHost + catId, {},
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
        mainHost + catId,
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
        mainHost,
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

export { CreateCategory, EditCategory, DeleteCategory, GetCategoriesList }