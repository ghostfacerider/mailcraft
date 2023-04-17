import React, { useState, useEffect } from "react";
import "../css/main.css";
import "font-awesome/css/font-awesome.min.css";
import Card from "./Card";
import dataService from "../services/dataService";
// import { useNavigate } from "react-router-dom";

//hooks
const Main = (props) => {
  //state hook

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    //get our data
    dataService.getPlayers((players) => {
      setPlayers(players);
    });
  }, []);

  const handleDelete = (deleteId) => {
    dataService.deletePlayer(deleteId, 
    (error) => {
      if (!error) {
        dataService.getPlayers((data) => {
          setPlayers(data);
        });
      } else {
        console.log(error);
      }
    }); 
  };


  return (
    <div>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search this site"
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {players.map((player, index) => {
              return <Card key={index} player={player} onDelete={handleDelete} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;