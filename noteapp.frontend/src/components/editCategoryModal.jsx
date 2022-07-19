import React, {useEffect} from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function EditCategoryModal({categories, categoryId, handleEdit, editTitle, setEditTitle, isOpen, setIsOpen}) {
    const category = categories.find(c => c.id === categoryId);

    useEffect(() => {
        if(category) {
            setEditTitle(category.title);
        }
    }, [category, setEditTitle])

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} shouldCloseOnOverlayClick={true} className="edit-category-title">
        <h2>Edit Category</h2>
        <form className="edit-category-form" onSubmit={(e)=> e.preventDefault()}>
            <div className="input">
                <input id="editTitle" className="input-wrap" type="text" name="editTitle" placeholder=" " required value={editTitle} onChange={(e)=> setEditTitle(e.target.value)}/>
                <label htmlFor="editTitle" className="float-label">Category Title</label>
            </div>
            <button type="submit" onClick={() => handleEdit(category.id)}>Submit</button>
        </form>
    </Modal>
  )
}

export default EditCategoryModal