import React, { useContext, useState } from "react";
import NoteContext from "../Context/Notes/noteContext";
import NoteItem from "./NoteItem";

function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  //when submit button is clicked
  const handleClick = async (event) => {
    event.preventDefault();
    if (note.title.length < 3 || note.description.length < 3) {
      props.showAlert("Title or description TOO SHORT", "danger");
      return;
    }
    const status = await addNote(note.title, note.description, note.tag);
    if (status) {
      props.showAlert("Note Added Successfully", "success");
    } else {
      props.showAlert("Oops something went wrong..!!", "danger");
    }
    setnote({ title: "", description: "", tag: "" });
  };

  //when changes are done in input field
  const handleChange = (event) => {
    setnote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1 className="mt-3" style={{textAlign:"center"}}> ADD YOUR NOTES</h1>
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={handleChange}
            />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
