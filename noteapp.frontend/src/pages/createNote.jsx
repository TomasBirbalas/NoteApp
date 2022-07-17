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

function CreateNote() {

    const [noteTitle, setNoteTile] = useState('');
    const [noteContent, setNoteContent] = useState('');

    const submitHandler = () => {
        try
        {
            console.log(noteTitle);

            axios.post('https://localhost:7190/api/Note', {}, {
                headers: {
                    "Authorization": 'Bearer ' + cookie,
                    "content-type": "application/json"
                    },
                params: {
                    title : noteTitle,
                    content : noteContent,
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
        catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

  return (
    <div className="edit-note">
        <h2>Edit Note</h2>
        <form className="edit-note-form" onSubmit={(e)=> e.preventDefault()}>
            <label htmlFor="editTitle">Title</label>
            <input id="editTitle" type="text" required value={noteTitle} onChange={(e) => {setNoteTile(e.target.value)}}/>

            <label htmlFor="editContent">Content</label>
            <input id="editContent" type="text" required value={noteContent} onChange={(e) => {setNoteContent(e.target.value)}}/>

            <button type="submit" onClick={submitHandler}>Submit</button>
        </form>
    </div>
  )
}

export default CreateNote