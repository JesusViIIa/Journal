import { types } from "../types/types";
import Swal from "sweetalert2";
import { googleAuthProvider, firebase } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";
import { logoutClean } from "./notes";

export const startLoginWithEmail = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: err.code,
                    text: err.message,
                });
                dispatch(finishLoading());
            });
    };
};

export const startRegisterWithEmail = (email, password, name) => {
    return (dispatch) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName));
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: err.code,
                    text: err.message,
                })

            })

    };
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName));
            });
    };
};

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    },
});

export const startlogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(logoutClean())
    };
};

export const logout = () => ({
    type: types.logout,
});