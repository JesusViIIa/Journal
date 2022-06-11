import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { removeError,  setError } from "../../actions/ui";
import { startRegisterWithEmail } from "../../actions/auth";

export const Register = () => {
  const dispatch =  useDispatch()
  const state = useSelector(state => state.ui.msgError)
  console.log(state);
  const [registerForm, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = registerForm;
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, password2);
    if (isFormValid()){
      dispatch(startRegisterWithEmail(email, password, name))
    }
  };
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Inserta un nombre valido'))
      return false;
    } else if (!validator.isEmail(email) || email.length === 0) {
      dispatch(setError('Inserta un correo valido'))
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError('Las contraseñas no coinicden o estan vacías'))
      return false;
    }
    dispatch(removeError())
    return true
  };

  return (
    <div>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegisterSubmit}>
        {state && <div className="auth__alert-error">{state}</div>}

        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          onChange={handleChange}
        />
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>

        <Link className="link " to={"/auth/login"}>
          Do you have an account? Login
        </Link>
      </form>
    </div>
  );
};
