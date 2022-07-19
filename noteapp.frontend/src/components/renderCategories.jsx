import React, { useEffect, useState } from 'react'
import GetCookie from '../hooks/getCookie';
import axios from 'axios'

let cookie = GetCookie('token');
let options = {
  headers: {
    "Authorization": 'Bearer ' + cookie,
    "content-type": "application/json"
  }
}

function RenderCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
          await axios.get(`https://localhost:7190/api/Category`, options)
          .then(response => {
            setCategories(response.data);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error.response);
          });
        }
        fetchCategories();
      }, [])
    
      const categoriesList = categories.map((category, index) => {
        return(
          <a href={`category/${category.id}`} key={index} className="link-to-category" >
            <div class="folder_tab"></div>
            <div class="folder"></div>
            <h2>{category.title}</h2>
          </a>
        )
      })
  return (
    <div className='categories-block'>
      {categoriesList}
    </div>
  )
}

export default RenderCategories
