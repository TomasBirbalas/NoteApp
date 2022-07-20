import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';

import Modal from 'react-modal';
Modal.setAppElement('#root');
const EditNote = ({notes, noteId, handleEdit, editTitle, setEditTitle, editContent, setEditContent, isOpen, setIsOpen}) => {
    const note = notes.find(note => note.id === noteId);

    useEffect(() => {
        if(note) {
            setEditTitle(note.title);
            setEditContent(note.content);
        }
    }, [note, setEditTitle, setEditContent])
    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} shouldCloseOnOverlayClick={true} >
        <div className="edit-note">
            <>
            <h2>Edit Note</h2>
            <form className="edit-note-form" onSubmit={(e)=> e.preventDefault()}>
                <div className="input-wrap">
                    <label htmlFor="editTitle">Title</label>
                    <input id="editTitle" type="text" required value={editTitle} onChange={(e)=> setEditTitle(e.target.value)} />
                </div>
                <div className="input-wrap">
                    <label htmlFor="editContent">Content</label>
                    <input id="editContent" type="text" required value={editContent} onChange={(e)=> setEditContent(e.target.value)} />
                </div>

                <button type="submit" className='submit-btn' onClick={() => handleEdit(note.id)}>Submit</button>
            </form>
            </>
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
        </Modal>
    )
}

export default EditNote