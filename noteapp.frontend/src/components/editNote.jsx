import React, {useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'

const EditNote = ({notes, handleEdit, editTitle, setEditTitle, editContent, setEditContent}) => {
    const {id} = useParams();
    const note = notes.find(note => (note.id).toString() === id);

    useEffect(() => {
        if(note) {
            setEditTitle(note.title);
            setEditContent(note.content);
        }
    }, [note, setEditTitle, setEditContent])
    return (
        <div className="edit-note">
            {editTitle &&
            <>
            <h2>Edit Note</h2>
            <form className="edit-note-form" onSubmit={(e)=> e.preventDefault()}>
                <label htmlFor="editTitle">Title</label>
                <input id="editTitle" type="text" required value={editTitle} />

                <label htmlFor="editContent">Content</label>
                <input id="editContent" type="text" required value={editContent} />

                <button type="submit" onClick={() => handleEdit(note.id)}>Submit</button>
            </form>
            </>
            }
            {
            !editTitle && 
            <>
                <h2>Post Not Found</h2>
                <p>
                <Link to="/">Back to home page</Link>
                </p>
                </>
            }
        </div>
    )
}

export default EditNote