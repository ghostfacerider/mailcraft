import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dataService from "../services/dataService";

const Create = (props) => {
 
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleCreate = (event) => {
    //  console.log("test create");
    event.preventDefault();
    setErrors({});

    dataService.createPlayer({ firstname, lastname, position }, (error) => {
      if (!error) {
        navigate("/");
      } else {
        console.log(error);
      }
    });
  };

  return (
    <form className="form-signin" onSubmit={handleCreate}>
      <label htmlFor="inputname" className="sr-only">
        First Name
      </label>
      <input
        type="text"
        id="inputFirstName"
        name="firstname"
        value={firstname}
        onChange={(e) => setFirstName(e.target.value)}
        className="form-control"
        placeholder="First name"
        autoFocus
      />
      {errors.firstname && (
        <div className="alert alert-danger"> {errors.firstname.message}</div>
      )}

      <label htmlFor="inputname" className="sr-only">
        Last name
      </label>
      <input
        type="text"
        id="inputlastname"
        name="lastname"
        value={lastname}
        onChange={(e) => setLastName(e.target.value)}
        className="form-control"
        placeholder="Last Name"
        autoFocus
      />
      {errors.lastname && (
        <div className="alert alert-danger"> {errors.lastname.message}</div>
      )}
      <label htmlFor="inputname" className="sr-only">
        Position
      </label>
      <input
        type="text"
        id="inputPostion"
        name="position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="form-control"
        placeholder="Position"
        autoFocus
      />
      {errors.position && (
        <div className="alert alert-danger"> {errors.position.message}</div>
      )}

      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Create;
