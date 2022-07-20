import React, {useEffect, useState} from 'react'
import GetCookie from '../hooks/getCookie';
import Modal from 'react-modal';
import Categories from '../components/categories'


let cookie = GetCookie('token');
const options = {
    headers: {
      "Authorization": 'Bearer ' + cookie,
      "content-type": "application/json"
    }
  }
Modal.setAppElement('#root');
function CreateNote({handleCreate, isNewNoteOpen, setIsNewNoteOpen}) {

    const [noteTitle, setNoteTile] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [noteStatus, setNoteStatus] = useState(false);
    const [imageUploaded, setImageUploaded] = useState({id: '', title: ''});
    const [imageUploadedData, setImageUploadedData] = useState();
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const [checkedCategory, setCheckedCategory] = useState([]);

    const onFileChange = event => {
        let imageFile = event.target.files[0];
        var reader = new FileReader();

        reader.onload = x => {
          setImageUploadedData(imageFile);
        };
  
        reader.readAsDataURL(imageFile);
        
        setImageUploaded({ title: event.target.files[0].name });
        setIsImageUploaded(true);
    };

    const checkedCategoriesHandler = (event, category) => {

            var categories_array = [...checkedCategory];
            if (event.target.checked) {
                categories_array = [...checkedCategory, category];
            } else {
                categories_array.splice(checkedCategory.indexOf(category), 1);
            }
            setCheckedCategory(categories_array);
    }

    const newNote = {
        title: noteTitle,
        content: noteContent,
        isPublic: noteStatus
    }
  return (
      <Modal isOpen={isNewNoteOpen} onRequestClose={() => setIsNewNoteOpen(false)} shouldCloseOnOverlayClick={true}>
        <div className="edit-note">
            <h2>Create new note</h2>
            <form className="edit-note-form" onSubmit={(e)=> e.preventDefault()}>
              <div className="input-wrap">
                <label htmlFor="editTitle">Title</label>
                <input id="editTitle" type="text" required value={noteTitle} onChange={(e) => {setNoteTile(e.target.value)}}/>
              </div>
                
              <div className="input-wrap">
                <label htmlFor="editContent">Content</label>
                <input id="editContent" type="text" required value={noteContent} onChange={(e) => {setNoteContent(e.target.value)}}/>
              </div>
                
              <div className="input-wrap">
                <label htmlFor="editStatus">Is Your note is private?</label>
                <label class="switch">
                  <input type="checkbox" onClick={(e) => setNoteStatus(!noteStatus)}/>
                  <span class="slider"></span>
                </label>
              </div>
              
              <div className="input-wrap-cat">
                <h3><label htmlFor="selectCategories">Please select categories, or create new</label></h3>
                <Categories checkedCategoriesHandler={checkedCategoriesHandler}/>
              </div>
              
              <input type="file" onChange={(e) => onFileChange(e)} />
              <button className="submit-btn" type="submit" onClick={() => handleCreate(newNote, imageUploaded, setImageUploaded, isImageUploaded, imageUploadedData, checkedCategory, setNoteTile, setNoteContent, setNoteStatus, setImageUploaded, setCheckedCategory )}>Submit</button>
            </form>
        </div>
    </Modal>
  )
}

export default CreateNote