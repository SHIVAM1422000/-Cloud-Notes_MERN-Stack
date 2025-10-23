import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/Notes/noteContext";
// import AddNote from './AddNote';
import NoteItem from "./NoteItem";
import { useHistory } from "react-router-dom";
import AddNote from "./AddNote";
import "../styles/Notes.css"

function Note(props) {
  const context = useContext(NoteContext);
  const { notes, getNote, editNote, setNotes } = context;
  let originalNOTES=[];
  useEffect(()=>{
    originalNOTES=notes;
  },[])
  let history = useHistory();
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const [searchQuery, setSeachQuery] = useState("");

  const sortHandler = () => {
    const result = notes.sort((a, b) => a.title.localeCompare(b.title));
    setNotes([...result]);
  };

  const onSearchChange = (e) => {
    setSeachQuery(e.target.value);
  };

  const searchHandler = (e) => {
    const searchNotes = notes.filter(
      (curr) =>
        curr.title.includes(searchQuery) ||
        curr.description.includes(searchQuery) ||
        curr.tag.includes(searchQuery)
    );
    setNotes(searchNotes);
    setSeachQuery("");
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
    ) {
      getNote();
    } else {
      history.push("/login");
    }
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    const status = editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    if (status) {
      props.showAlert("Note updated  Successfully", "success");
    } else {
      props.showAlert("Oops..!! something went wrong", "danger");
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* //notes fetching  */}

      <div className="container">
        <div>
          <h1 className="mt-2" style={{textAlign:"center"}}>YOUR NOTES</h1>
          <div className="features">
            <button className="btn btn-success sort" onClick={sortHandler} style={{marginRight:"20px"}}>
              SORT
            </button>
            <form className="feature-form"
              onSubmit={(e) => {
                e.preventDefault();
                searchHandler();
              }}
            >
              <input
                type="text"
                placeholder="SEARCH NOTES"
                value={searchQuery}
                onChange={(e) => onSearchChange(e)}
                className="form-control"
              />
              <button className="btn btn-warning">SEARCH</button>
            </form>
          </div>
        </div>
        <div className="row  mt-2">
          {notes.length === 0 && "No Notes To Display"}
          {notes.map((my_note) => {
            return (
              <NoteItem
                key={my_note._id}
                note={my_note}
                updateNote={updateNote}
                showAlert={props.showAlert}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Note;
