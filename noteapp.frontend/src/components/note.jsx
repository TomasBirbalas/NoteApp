import React, { useEffect, useState } from 'react'
import GetCookie from '../hooks/getCookie';
import axios from 'axios'
import EditNote from './editNoteModal';
import CreateNote from './createNoteModal';
import AddNewNoteBtn from '../components/addNewNoteBtn'
import '../stylesheets/css/note.min.css'

let cookie = GetCookie('token');
let options = {
  headers: {
    "Authorization": 'Bearer ' + cookie,
    "content-type": "application/json"
  }
}

function Note() {
  const [notes, setNote] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);

  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      await axios.get(`https://localhost:7190/api/User/Notes`, options)
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
  const handleCreate = async (newNote, imageUploaded, setImageUploaded, isImageUploaded, imageUploadedData, checkedCategory) => {
    let id = '';
    try{
      await axios.post(`https://localhost:7190/api/Note`, {}, {
        headers: {
          "Authorization": 'Bearer ' + cookie,
          "content-type": "application/json"
        },
        params: newNote
      }).then(response => {
        console.log(response.data)
        id = response.data;
      })
    }
    catch (err) {
      console.log(`Error: ${err.message}`);
    }
    if(isImageUploaded){
      setImageUploaded({id: id})
      try{
        await axios.post(`https://localhost:7190/api/Note/${id}`, imageUploadedData, {
        headers: {
          "Authorization": 'Bearer ' + cookie,
          "content-type": "application/json"
        },
        params: imageUploaded
      }).then(response => {
        console.log(response.data)
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
    return (
      <div className="note-card" key={index}>
        {note.images.length > 0 ? <img src={`data:image/png;base64,${note.images[0].data}`} className="card-cover"/> : `image not found` }
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
    <div className="note-cards">
      {arr}
      <button onClick={() => setIsNewNoteOpen(true)}>
        <AddNewNoteBtn/>
        <CreateNote
          handleCreate={handleCreate}
          isNewNoteOpen={isNewNoteOpen}
          setIsNewNoteOpen={setIsNewNoteOpen}
        />
      </button>
    </div>
  )
}

export default Note