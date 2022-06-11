import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { uploadFile } from "../helpers/uploadFile";

export const startNewNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
        };
        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
        console.log(docRef);
        dispatch(activeNote(docRef.id, newNote));
        dispatch(addNewNote(docRef.id, newNote));
    };
};

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note,
    },
});

export const startLoadNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(LoadNotes(notes));
    };
};

export const LoadNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes,
});

export const startSaveNote = (note) => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;

        const noteToFirestore = {...note };
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        dispatch(refreshNote(note.id, noteToFirestore));
        Swal.fire({
            icon: "success",
            title: note.title,
            text: "Note saved succesfully",
        });
    };
};

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        ...note,
    },
});

export const startUploadingFiles = (file) => {
    return async(dispatch, getState) => {
        const { active } = getState().notes;
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        const fileURL = await uploadFile(file);
        active.url = fileURL

        dispatch(startSaveNote(active))



        Swal.close()
    };
};

export const startDeletingNote = (id) => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid

        await db.doc(`${uid}/journal/notes/${id}`).delete()
        dispatch(deleteNote(id))

    }

}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})


export const logoutClean = () => ({
    type: types.notesLogoutCleaning
})

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})