import React, { useEffect, useState } from 'react'
import GetCookie from '../hooks/getCookie';
import axios from 'axios'
import EditNote from './editNoteModal';
import CreateNote from './createNoteModal';
import AddNewNoteBtn from '../components/addNewNoteBtn'
import '../stylesheets/css/note.min.css'
import RenderCategories from '../components/renderCategories'

import image1 from '../Images/defaultImages/1.jpg'
import image2 from '../Images/defaultImages/2.jpg'
import image3 from '../Images/defaultImages/3.jpg'
import image4 from '../Images/defaultImages/4.jpg'
import image5 from '../Images/defaultImages/5.jpg'
import image6 from '../Images/defaultImages/6.jpg'

const imageArray = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6
]

let cookie = GetCookie('token');
let options = {
  headers: {
    "Authorization": 'Bearer ' + cookie,
    "content-type": "application/json"
  }
}

function Note() {
  const [notes, setNote] = useState([]);
  const [noteId, setNoteId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [isNoteCreated, setIsNoteCreated] = useState(false);

  const [serachValue, setSearchValue] = useState('');

  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      await axios.get(`https://localhost:7190/api/User/Notes`, options)
      .then(response => {
        setNote(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
    }
    fetchNotes();
  }, [])

  const handleCategories = async (id, category) => {
    try{
      await axios.put(`https://localhost:7190/api/Note/${id}/category`, {}, {
        headers: {
          "Authorization": 'Bearer ' + cookie,
          "content-type": "application/json"
        },
        params: {
          categoryTitle: category,
        }
      })
    }
    catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  const handleCreate = async (newNote, imageUploaded, setImageUploaded, isImageUploaded, imageUploadedData, checkedCategory, setNoteTile, setNoteContent, setNoteStatus, setCheckedCategory) => {
    let id = '';
    try{
      await axios.post(`https://localhost:7190/api/Note`, {}, {
        headers: {
          "Authorization": 'Bearer ' + cookie,
          "content-type": "application/json"
        },
        params: newNote
      }).then(response => {
        id = response.data.id;
        (response.status === 200) ? setIsNoteCreated(true) : setIsNoteCreated(false);
        const notesList = [response.data, ...notes];
        setNoteTile('');
        setNoteContent('');
        setNoteStatus(false);
        setImageUploaded({id: '', title: ''})
        
        setNote(notesList);
        setIsNewNoteOpen(false);
      })
    }
    catch (err) {
      console.log(`Error: ${err.message}`);
    }
    if(isImageUploaded){

      const formData = new FormData();
      formData.append('file', imageUploadedData)

      try{
        await axios.post(`https://localhost:7190/api/Note/${id}`, formData, {
        headers: {
          "Authorization": 'Bearer ' + cookie,
          "content-type": "application/json"
        },
        params: imageUploaded
      })
      }
      catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }

    if(checkedCategory.length > 0){
      checkedCategory.forEach(category => {
        handleCategories(id, category.title);
      });
    }else {
      setCheckedCategory([]);
    }
    if(isNoteCreated) {
      setIsOpen(false);
    }
  }

  const handleEdit = async (noteId) => {
    const updatedNote = {title: editTitle, content: editContent}
    try {
      const resp = await axios.put(`https://localhost:7190/api/Note/${noteId}`, {}, {
        headers: {
          "Authorization": 'Bearer ' + cookie,
          "content-type": "application/json"
        },
        params: updatedNote
      });
      setNote(notes.map(n => n.id === noteId ? { ...resp.data } : n));
      setIsOpen(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const hadleDelete = async (noteId) => {
    try{
      await axios.delete(`https://localhost:7190/api/Note/${noteId}`, options)
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    const noteList = notes.filter(n => n.id !== noteId);
    setNote(noteList);
  }

  const arr = notes.filter(note => {
    return note.title.toLowerCase().indexOf(serachValue.toLocaleLowerCase()) >= 0
  }).map((note, index) => {
    let random = imageArray[Math.floor(Math.random() * imageArray.length)]

    const categoriesArray = note.categories.map((category, index) => {
      return(
        <li className="category-tag" key={index}>{category.title}</li>
      )
    })
    return (
      <div className="note-card" key={index}>
        {note.images.length > 0 ? <img src={`data:image/png;base64,${note.images[0].data}`} className="card-cover"/> : <img src={random} alt="image" className="card-cover"/> }
        <div className='note-content'>
          <h2>{ note.title }</h2>
          <p>{ note.content }</p>
          <ul className="categories">
            {categoriesArray}
          </ul>
          <div className='card-actions'>
            <button className="fa-solid fa-pen-to-square" value={note.id} onClick={(e) => {setNoteId(e.target.value); setIsOpen(true)}}></button>
            <button className="fa-solid fa-trash-can" value={note.id} onClick={(e) => hadleDelete(e.target.value)}></button>
          </div>
        </div>
      </div>
    )
  });
  return (
    <>
    <div className="search-bar">
        <input type="text" placeholder="Search..." onChange={e => setSearchValue(e.target.value)} />
        <i class="fa-solid fa-magnifying-glass"></i>
    </div>
    <div className="note-cards">
      {arr}
      <EditNote
          notes={notes}
          noteId={noteId}
          handleEdit={handleEdit}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editContent={editContent}
          setEditContent={setEditContent}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      <button className='add' onClick={() => setIsNewNoteOpen(true)}>
        <AddNewNoteBtn/>
        <CreateNote
          handleCreate={handleCreate}
          isNewNoteOpen={isNewNoteOpen}
          setIsNewNoteOpen={setIsNewNoteOpen}
        />
      </button>
    </div>
    <RenderCategories />
    {notes.length == 0 &&
      <div class="no-data">
        <h1>Notes not found</h1>
        <span>Please create your first note</span>
      </div>
    }
    </>
  )
}

export default Note