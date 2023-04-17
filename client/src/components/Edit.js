import React, { useState, useEffect } from "react";
import dataService from "../services/dataService";
import { useNavigate, useParams } from "react-router-dom";

const edit = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [position, setPosition] = useState("");
  
  const [errors, setErrors] = useState({});
  //use the provided by react route
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    dataService.getOnePlayer(params.id, (player) => {
      
      setFirstName(player.firstname);
      setLastName(player.lastname);
      setPosition(player.position);
    });
  }, []);
  // console.log(player);
 
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors();
    dataService.updatePlayer(
      params.id,
      { firstname, lastname, position },
      (error) => {
        if (!error) {
          navigate("/");
        } else {
          console.log(error);
        }
      }
    );
    navigate("/");
  };
  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 font-weight-normal text-center">Edit Players</h1>
      <label htmlFor="inputname" className="sr-only"></label>
      <input
        type="text"
        id="inputFirstName"
        name="firstname"
        defaultValue={firstname}
        onChange={(e) => setFirstName(e.target.value)}
        className="form-control"
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
        defaultValue={lastname}
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
        defaultValue={position}
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

export default edit;
