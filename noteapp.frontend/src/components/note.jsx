import React, { useEffect, useState } from 'react'
import GetCookie from '../hooks/getCookie';
import axios from 'axios'
import { Link } from 'react-router-dom'

import '../stylesheets/css/note.min.css'

const cookie = GetCookie('token');
const options = {
  headers: {
    "Authorization": 'Bearer ' + cookie,
    "content-type": "application/json"
  }
}

function Note() {
  const [note, setNote] = useState([]);

  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // useEffect(() => {
  //   console.log("userNote run");

  //   const fetchPosts = async () => {axios.get(`https://localhost:7190/api/User/Notes`, options)
  //     .then(response => {
  //       setNote(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error.response);
  //     });
  //   }
  // }, [])

  const fetchPosts = async () => {
    await axios.get(`https://localhost:7190/api/User/Notes`, options)
    .then(response => {
      setNote(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
    });
  }
  fetchPosts();

  const handleEdit = async (noteId) => {
    const updatedNote = {title: editTitle, content: editContent}
    try {
      const resp = await axios.put(`https://localhost:7190/api/Note/${noteId}`, {}, options, updatedNote);
      setNote(note.map(n => n.id === noteId ? {...resp.data } : n));
      setEditTitle('');
      setEditContent('');
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
    const noteList = note.filter(n => n.id !== noteId);
    setNote(noteList);
  }

  const arr = note.map((note, index) => {

    if(note.images.count > 0){
      note.images.forEach(image => {
        
      });
    }

    return (
      <div className="note-card" key={index}>
      {note.images.count > 0 ? <img src="data:image/png;base64,"/> : "Image not fount" }
      <h2>{ note.title }</h2>
      <p>{ note.content }</p>
      <Link to={`/editNote/${note.id}`}>btn</Link>
      <button className="fa-solid fa-pen-to-square" value={note.id}></button>
      <button className="fa-solid fa-trash-can" value={note.id} onClick={(e) => hadleDelete(e.target.value)}></button>
      </div>
    )
  });
  return (
    <div className="note-cards">
      {arr}
    </div>
  )
}

export default Note