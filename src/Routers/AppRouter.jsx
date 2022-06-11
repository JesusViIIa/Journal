import { firebase } from "../firebase/firebase-config";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { JournalScreen } from "../Components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { startLoadNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged( async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch(startLoadNotes(user.uid))
        setChecking(false);
        setLoggedIn(true)
        
      } else {
        setLoggedIn(false);
      }

      setChecking(false);
    });
  }, [setChecking, dispatch, loggedIn]);

  if (checking) {
    return (
      <div className="auth__main">
        <div className="auth__box-container">cargando...</div>
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRoutes loggedIn={loggedIn}>
              <JournalScreen />
            </PrivateRoutes>
          }
        />
        <Route
          path="/auth/*"
          element={
            <PublicRoutes loggedIn={loggedIn}>
              <AuthRouter />
            </PublicRoutes>
          }
        />
      </Routes>
    </Router>
  );
};
