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
        console.log(event.target.files)


        var reader = new FileReader();

        reader.onload = function () {
  
          var arrayBuffer = this.result;
          setImageUploadedData(arrayBuffer)
        };
  
        reader.readAsArrayBuffer(event.target.files[0]);
        
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
      <Modal isOpen={isNewNoteOpen} onRequestClose={() => setIsNewNoteOpen(false)}>
        <div className="edit-note">
            <h2>Edit Note</h2>
            <form className="edit-note-form" onSubmit={(e)=> e.preventDefault()}>
                <label htmlFor="editTitle">Title</label>
                <input id="editTitle" type="text" required value={noteTitle} onChange={(e) => {setNoteTile(e.target.value)}}/>

                <label htmlFor="editContent">Content</label>
                <input id="editContent" type="text" required value={noteContent} onChange={(e) => {setNoteContent(e.target.value)}}/>

                <label htmlFor="editStatus">Is Your note is private?</label>
                <input type="checkbox" onClick={(e) => setNoteStatus(!noteStatus)}/>

                <label htmlFor="selectCategories"></label>
                <Categories checkedCategoriesHandler={checkedCategoriesHandler}/>
                <input type="file" onChange={(e) => onFileChange(e)} />
                {console.log(checkedCategory)}
                <button type="submit" onClick={() => handleCreate(newNote, imageUploaded, setImageUploaded, isImageUploaded, imageUploadedData, checkedCategory)}>Submit</button>
            </form>
        </div>
    </Modal>
  )
}

export default CreateNote