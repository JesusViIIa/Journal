
import {  Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from "../Components/auth/LoginScreen";
import { Register } from "../Components/auth/Register";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        
      <Routes>
        <Route path="login" element={<LoginScreen/>} />
        <Route path="register" element={<Register/>} />
        <Route path="/*" element={<Navigate to={"login"} />}/>
      </Routes>
      </div>
    </div>
  );
};
