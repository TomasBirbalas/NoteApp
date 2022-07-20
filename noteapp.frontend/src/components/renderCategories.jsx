import React, { useEffect, useState } from 'react'
import GetCookie from '../hooks/getCookie';
import axios from 'axios'
import EditCategoryModal from './editCategoryModal';

let cookie = GetCookie('token');
let options = {
  headers: {
    "Authorization": 'Bearer ' + cookie,
    "content-type": "application/json"
  }
}

function RenderCategories() {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [editTitle, setEditTitle] = useState('');


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

      const handleEdit = async (categoryId) => {
        const updatedCategory = {newTitle: editTitle}
        try {
          var resp = await axios.put(`https://localhost:7190/api/Category/${categoryId}`, {}, {
            headers: {
              "Authorization": 'Bearer ' + cookie,
              "content-type": "application/json"
            },
            params: updatedCategory
          });
          console.log(resp)
          setCategories(categories.map(c => c.id === categoryId ? { ...resp.data } : c));
          setIsOpen(false);

        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      }

      const hadleDelete = async (categoryId) => {
        try{
          await axios.delete(`https://localhost:7190/api/Category/${categoryId}`, options)
          .catch(function (error) {console.log(error.response)});
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
        const categoryList = categories.filter(c => c.id !== categoryId);
        setCategories(categoryList);
      }

      const categoriesList = categories.map((category, index) => {
        return(
          <div className="catalog" key={`category-${index}`}>
            <a href={`category/${category.id}`} className="link-to-category" >
              <div class="folder_tab"></div>
              <div class="folder"></div>
              <h2>{category.title}</h2>
            </a>
            <div className="accion-btns">
            <button className="fa-solid fa-pen-to-square" value={category.id} onClick={(e) => {setCategoryId(e.target.value); setIsOpen(true)}}></button>
            <button className="fa-solid fa-trash-can" value={category.id} onClick={(e) => hadleDelete(e.target.value)}></button>
          </div>
        </div>
        )
      })
  return (
    <div className='categories-block'>
      {categoriesList}
      <EditCategoryModal
        categories={categories}
        categoryId={categoryId}
        handleEdit={handleEdit}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}

export default RenderCategories
