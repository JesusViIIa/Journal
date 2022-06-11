import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  startGoogleLogin, startLoginWithEmail } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {
  const dispatch =  useDispatch()
  const {loading}= useSelector(state => state.ui)
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  })
  const {email, password }= formValues

  const handleSubmit =(e)=>{
    e.preventDefault()
    dispatch(startLoginWithEmail(email, password))

  }
  const handlegooglelogin=()=>{
    dispatch(startGoogleLogin())
  }
  return (
    <div>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button disabled={loading} className="btn btn-primary btn-block" type="submit">
          Login
        </button>

        <div className="auth__social-networks">
          <p> Login with social networks</p>
          <div onClick={handlegooglelogin} className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className="link" to={"/auth/register"}>Create new account</Link>
      </form>
    </div>
  );
};
