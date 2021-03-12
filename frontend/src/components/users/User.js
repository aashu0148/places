import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

import "./User.css";

function user(props) {
  return (
    <div className="user">
      <Link
        style={{ textDecoration: "none", color: "#000" }}
        to={`/users/${props.uid}`}
      >
        <div className="user_head">
          <Avatar src={props.userPhoto} />
          <h3 className="user_title">{props.name}</h3>
        </div>
      </Link>
      <div className="user_places">{props.places} Places</div>
    </div>
  );
}

export default user;
