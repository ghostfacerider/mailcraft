import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = (props) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  //use tge provided by react route
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    //reset any validation messages
    console.log({ email, password, firstname, lastname });
    setErrors({});

    // console.log("buttonClick_reg");
    //we will post the form data to the API for Autherntication

    authService.register({ email, password, firstname, lastname }, (error) => {
      if (!error) {
        navigate("/");
      } else {
        console.log(error);
      }
    });
  };

  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 font-weight-normal text-center">
        Please Register
      </h1>

      <label htmlFor="inputname" className="sr-only">
        First Name
      </label>
      <input
        type="text"
        id="inputFirstName"
        name="firstname"
        onChange={(e) => setFirstName(e.target.value)}
        className="form-control"
        placeholder="First name"
        autoFocus
      />
      {errors.firstname && (
        <div className="alert alert-danger"> {errors.firstname.message}</div>
      )}

      <label htmlFor="inputname" className="sr-only">
        Last Names
      </label>
      <input
        type="text"
        id="inputname"
        name="lastname"
        onChange={(e) => setLastName(e.target.value)}
        className="form-control"
        placeholder="Last name"
        autoFocus
      />

      {errors.lastname && (
        <div className="alert alert-danger"> {errors.lastname.message}</div>
      )}

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
        <div className="alert alert-danger"> {errors.password.message}</div>
      )}

      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default Register;
