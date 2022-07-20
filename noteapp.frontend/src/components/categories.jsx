import React, {useEffect, useState} from 'react'
import GetCookie from '../hooks/getCookie';
import axios from 'axios';


let cookie = GetCookie('token');
const options = {
    headers: {
      "Authorization": 'Bearer ' + cookie,
      "content-type": "application/json"
    }
  }
function Categories({checkedCategoriesHandler}) {
  const [categories, setCategories] = useState([]);

  const [categoryName, setCategoryName] = useState('');

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

const hadleAddCategory = async (categoryTitle) => {
  await axios.post(`https://localhost:7190/api/Category`, {}, {
    headers: {
      "Authorization": 'Bearer ' + cookie,
      "content-type": "application/json"
    },
    params: {
      title: categoryTitle
    }
  }).then(response => {
    const newCategory = response.data
    const categoriesList = [...categories, newCategory];
    setCategories(categoriesList);
  })
  setCategoryName('');
}

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
      {
        <>
        <div className="categories-tag">
          {categoriesArray}
        </div>
        <div className="input-wrap">
          <input type="text" value={categoryName} onChange={(e)=> setCategoryName(e.target.value)}/>
          <button className="submit-btn" onClick={() => hadleAddCategory(categoryName) }>New category</button>
        </div>
        </>
      }
    </div>
  )
}

export default Categories
