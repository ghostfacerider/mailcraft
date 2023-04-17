import React, { useState } from "react";
import "../css/signin.css";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const SignIn = (props) => {
  //define state in this component using Hooks! yay

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  //use the provided by react route
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    //reset any validation messages
    console.log({ email, password });
    setErrors({});

    //we will post the form data to the API for Autherntication
    authService.signin({ email, password }, (error) => {
      if (!error) {
        navigate("/");
      } else {
        console.log(error);
        //save our validation errors in state
        if (error.status === 422) {
          //store any validation in state
          setErrors(error.data.errors);
        } else if (error.status === 401) {
          setErrors(error.data);
        }
      }
    });
  };

  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="text"
        id="inputEmail"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        className="form-control"
        placeholder="Email address"
        autoFocus
      />

      {errors.email && (
        <div className="alert alert-danger"> {errors.email.message}</div>
      )}

      {errors.serverMessage && (
        <div className="alert alert-danger"> {errors.serverMessage}</div>
      )}
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        placeholder="Password"
      />

      {errors.password && (
        <div className="alert alert-danger"> {errors.password.message} </div>
      )}
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default SignIn;
