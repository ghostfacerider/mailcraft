import React from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import authService from "../services/authService";
// import dataService from "../services/dataService";

const Card = ({ player, onDelete }) => {
  // const navigate = useNavigate();

  const handleDelete = (id) => {
    onDelete(id);
}  

  return (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <img
          className="card-img-top"
          // data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
          alt={player.name}
          style={{ height: 225, width: "100%", display: "block" }}
          src={player.picture}
          data-holder-rendered="true"
        />
        <div className="card-body">
          {/* {console.log(props)} */}
          <p className="card-text">ID: {player._id}</p>
          <p className="card-text">First Name: {player.firstname}</p>
          <p className="card-text">Last Name: {player.lastname}</p>
          <p className="card-text">Active: {player.isActive}</p>
          <p className="card-text">Age: {player.age}</p>
          <p className="card-text">Gender: {player.gender}</p>
          <p className="card-text">Day of Birth: {player.birthDate}</p>
          <p className="card-text">Position: {player.position}</p>
          <p className="card-text">
            Current Team: <br />
            Team City: {player.currectTeam && player.currectTeam.team_city}{" "}
            <br />
            Team Name: {player.currectTeam && player.currectTeam.team_name}
          </p>
          <p className="card-text">
            Previous Team:
            <br />
            Team City: {player.previousTeam &&
              player.previousTeam.team_city}{" "}
            <br />
            Team Name: {player.previousTeam && player.previousTeam.team_name}
          </p>
          <p className="card-text">
            Country:
            <br />
            Country Code: {player.country && player.country.code} <br />
            Name: {player.country && player.country.name} <br />
            City: {player.country && player.country.city}
          </p>
          <p className="card-text">Bio: {player.bio}</p>
          {authService.isAuthenticated() && (
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  View
                </button>
                <Link
                  to={`/edit/${player._id}`}
                  // type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(player._id)}
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Delete
                </button>
              </div>
              <small className="text-muted">{/* {player.firstname} */}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;