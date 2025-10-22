import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const baseUrl =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/";

  const initial_notes = [];

  const [notes, setNotes] = useState(initial_notes);

  //fetch all notes
  // ==========================

  const getNote = async () => {
    try {
      //Add Api Call:
      const response = await fetch(`${baseUrl}api/notes/fetchnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        // body: JSON.stringify(data)
      });

      let json = await response.json();

      //function for frontend:
      //  console.log(json);
      setNotes(json);
    } catch (error) {
      console.log(error);
    }
  };

  //adds new Note
  // ==========================

  const addNote = async (title, description, tag) => {
    try {
      //Add Api Call:
      // ************************
      const response = await fetch(`${baseUrl}api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      let json = await response.json();

      //Frontedn Part:
      // ***************************
      setNotes(notes.concat(json));
    } catch (error) {
      console.log(error);
    }
  };

  //delete a note
  // ==========================

  const deleteNote = async (id) => {
    try {
      //Add Api Call:
      // **********************

      const response = await fetch(`${baseUrl}api/notes/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        // body: JSON.stringify(data)
      });

      let json = await response.json();
      console.log(json);

      // Frontend PArt:
      // **********************
      let newNote = notes.filter((note) => note._id !== id);
      setNotes(newNote);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //edit a note
  // ==========================

  const editNote = async (id, title, description, tag) => {
    try {
      //Add Api Call:
      const response = await fetch(`${baseUrl}api/notes/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      // let json = await response.json();
      // console.log(json);

      let newNotes = JSON.parse(JSON.stringify(notes));
      //logic for frontend
      for (let index = 0; index < newNotes.length; index++) {
        if (newNotes[index]._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }

      setNotes(newNotes);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
