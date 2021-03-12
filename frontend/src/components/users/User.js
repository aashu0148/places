import React from "react";
import { Avatar } from "@material-ui/core";

import "./User.css";

function user(props) {
  return (
    <div className="user">
      <div className="user_head">
        <Avatar src={props.userPhoto} />
        <h3 className="user_title">{props.name}</h3>
      </div>
      <div className="user_places">{props.places} Places</div>
    </div>
  );
}

export default user;
