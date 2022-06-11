import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploadingFiles } from "../../actions/notes";
import moment from 'moment'
export const NotesAppbar = () => {
  const date = new Date().getTime()
  const today = moment(date)


  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const handleSaveNote = () => {
    dispatch(startSaveNote(active));
  };
  const handlePicture = () => {
    document.querySelector("#fileSelector").click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file){
      dispatch(startUploadingFiles(file))
    }
  };
  return (
    <div className="notes__appbar">
      <span>{today.format("dddd, MMMM Do YYYY")}</span>
      <input
        id="fileSelector"
        onChange={handleFileChange}
        style={{ display: "none" }}
        type="file"
        name="file"
      />
      <div>
        <button onClick={handlePicture} className="btn btn-primary">
          Picture
        </button>
        <button onClick={handleSaveNote} className="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  );
};
