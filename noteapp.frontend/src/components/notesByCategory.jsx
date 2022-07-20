import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GetCookie from '../hooks/getCookie'
import axios from 'axios'
import EditNote from './editNoteModal'
import { Link } from 'react-router-dom'
import '../stylesheets/css/note.min.css'

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

function NotesByCategory() {
    const [notes, setNote] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
  
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    const { id } = useParams();
  
    useEffect(() => {
      const fetchNotes = async () => {
        await axios.get(`https://localhost:7190/api/Category/notes/${id}`, {
            headers: {
                "Authorization": 'Bearer ' + cookie,
                "content-type": "application/json"
              }
        })
        .then(response => {
          setNote(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.response);
        });
      }
      fetchNotes();
    }, [])
  
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
        setNote(notes.map(n => n.id === noteId ? { ...updatedNote } : n));
        setIsOpen(false);
        console.log('post edited');
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  
    const hadleDelete = async (noteId) => {
      try{
        await axios.delete(`https://localhost:7190/api/Note/${noteId}`, options)
        .catch(function (error) {console.log(error.response)});
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
      const noteList = notes.filter(n => n.id !== noteId);
      setNote(noteList);
    }
  
    const arr = notes.map((note, index) => {
      let random = imageArray[Math.floor(Math.random() * imageArray.length)]
      return (
        <div className="note-card" key={index}>
        {note.images.length > 0 ? <img src={`data:image/png;base64,${note.images[0].data}`} className="card-cover"/> : <img src={random} alt="image" className="card-cover"/> }
          <div className='note-content'>
            <h2>{ note.title }</h2>
            <p>{ note.content }</p>
            <div className='card-actions'>
              <button className="fa-solid fa-pen-to-square" value={note.id} onClick={() => setIsOpen(true)}></button>
              <button className="fa-solid fa-trash-can" value={note.id} onClick={(e) => hadleDelete(e.target.value)}></button>
            </div>
          </div>
  
  
          <EditNote
            notes={notes}
            noteId={note.id}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editContent={editContent}
            setEditContent={setEditContent}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      )
    });
    return (
      (arr.lenght > 0) ?
      <div className="note-cards">
        {arr}
      </div>
      :
      <div className='emptyCategory'>
        <h1>Category is empty</h1>
        <Link to="/">Back to home page and create a new note</Link>
      </div>
    )
}

export default NotesByCategory