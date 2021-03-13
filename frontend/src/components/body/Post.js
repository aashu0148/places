import React from "react";
import { useState } from "react";
import Map from "../modal/Map";

import RoomIcon from "@material-ui/icons/Room";
import HeartHollowIcon from "@material-ui/icons/FavoriteBorder";
import HeartIcon from "@material-ui/icons/Favorite";
import { Avatar } from "@material-ui/core";

import "./Post.css";

function Post(props) {
  const [fav, setFav] = useState(props.fav);
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <div className="post">
      <Map
        long={props.location.long}
        lat={props.location.lat}
        show={mapOpen}
        hide={() => setMapOpen(false)}
      />
      <div className="post_head">
        <div onClick={() => setFav(!fav)} className="post_favorite">
          {fav ? (
            <HeartIcon color="secondary" />
          ) : (
            <HeartHollowIcon color="secondary" />
          )}
        </div>
        <img src={props.image} alt="Place Pic" />
      </div>
      <div className="post_footer">
        <div className="post_footer-user">
          <Avatar src={props.userPhoto} />
        </div>
        <div className="post_footer-content">
          <h2 className="post_title">{props.title}</h2>
          <p className="post_desc">{props.desc}</p>
        </div>
        <div className="post_footer-location" onClick={() => setMapOpen(true)}>
          <RoomIcon color="secondary" />
        </div>
      </div>
      <br />
      <div className="post_sub-footer">
        <b>Adress :</b> {props.address}
      </div>
    </div>
  );
}

export default Post;
