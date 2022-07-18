import React, {useEffect, useState} from 'react'
import GetCookie from '../hooks/getCookie';
import axios from 'axios';


const cookie = GetCookie('token');
const options = {
    headers: {
      "Authorization": 'Bearer ' + cookie,
      "content-type": "application/json"
    }
  }
function Categories({checkedCategoriesHandler}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      await axios.get(`https://localhost:7190/api/Category`, options)
      .then(response => {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
    }
    fetchCategories();
  }, [])

  const categoriesArray = categories.map((category, index) => {
    return (
      <div className='category-checkbox' key={`category${index}`}>
        <input type="checkbox" id={`category${index}`} name={`category${index}`} value={category.id} onChange={(e) => checkedCategoriesHandler(e, category)}/>
        <label htmlFor={`category${index}`}> {category.title}</label><br></br>
      </div>
    );
  })

  return (
    <div>
      {categoriesArray}
    </div>
  )
}

export default Categories
