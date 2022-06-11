import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDeletingNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppbar } from "./NotesAppbar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [values, handleFormChange, reset] = useForm(note);
  const { body, title } = values;
  
  const activeId = useRef(note.id)
  useEffect(() => {
    if (note.id!== activeId.current){
      reset(note)
      activeId.current = note.id
    }
  }, [ note, reset]);
 useEffect(() => {
   dispatch(activeNote(values.id, {...values}))
   
 }, [values, dispatch]);

 const handleDelete =()=>{
   dispatch(startDeletingNote(note.id))

 }


  return (
    <div className="notes__main-content">
      <NotesAppbar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Write something"
          name="title"
          value={title}
          onChange={handleFormChange}
          className="notes__title-input"
        />
        <textarea
          name="body"
          placeholder="How´s going today"
          value={body}
          onChange={handleFormChange}
          className="notes__textarea"
        ></textarea>
        {note.url && (
          <div className="notes__image">
            <img 
              src={note.url}
              alt="img"
            />
            
          </div>
        )}
      </div>
      <button onClick={handleDelete} className="btn btn-danger">Delete</button>
    </div>
  );
};
