import React, { useContext } from "react";
import NoteContext from "../Context/Notes/noteContext";
import AddNote from "./AddNote";
// import NoteItem from './NoteItem';

function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const handleDelete = () => {
    const success = deleteNote(props.note._id);
    if (success) {
      props.showAlert("Note Deleted  Successfully", "success");
    } else {
      props.showAlert("Unable to delete note, TRY AGAIN..!!", "danger");
    }
  };

  const handleUpdate = () => {
    props.updateNote(props.note);
  };

  return (
    <>
      <div className="col-md-4 mt-4">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-centre">
              <h5 className="card-title">{props.note.title}</h5>
              <i
                className="far fa-trash-alt ms-auto"
                onClick={handleDelete}
              ></i>
              <i className="fas fa-edit ms-2" onClick={handleUpdate}></i>
            </div>
            <p className="card-text">{props.note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteItem;
