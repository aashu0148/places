import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Map from "../modal/Map";

import RoomIcon from "@material-ui/icons/Room";
import HeartHollowIcon from "@material-ui/icons/FavoriteBorder";
import HeartIcon from "@material-ui/icons/Favorite";
import { Avatar } from "@material-ui/core";

import "./Post.css";

let requestTimer;
function Post(props) {
  const [fav, setFav] = useState(props.fav);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    setFav(props.fav);
  }, [props]);

  const UpdateFav = (uid, pid, isFav, favPlaces) => {
    clearTimeout(requestTimer);
    requestTimer = setTimeout(() => {
      if (isFav && !favPlaces.includes(pid)) {
        favPlaces.push(pid);
      } else if (!isFav && favPlaces.includes(pid)) {
        favPlaces.splice(favPlaces.indexOf(pid), 1);
      }

      fetch(`/users/${uid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favPlaces),
      }).then(() => {
        props.updateFavPlacesAction(favPlaces);
      });
    }, 1500);
  };

  return (
    <div className="post">
      <Map
        long={props.location ? props.location.long : ""}
        lat={props.location ? props.location.lat : ""}
        show={mapOpen}
        hide={() => setMapOpen(false)}
      />
      <div className="post_head">
        <div
          onClick={() => {
            UpdateFav(props.uid, props.id, !fav, props.favPlaces);
            setFav(!fav);
          }}
          className="post_favorite"
        >
          {fav ? (
            <HeartIcon color="secondary" />
          ) : (
            <HeartHollowIcon color="secondary" />
          )}
        </div>
        <img
          src={"http://localhost:5000/" + props.image}
          alt={`${props.title} Picture`}
        />
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

const mapStateToProps = (state) => {
  return {
    uid: state.id,
    favPlaces: state.fav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFavPlacesAction: (favPlaces) => {
      dispatch({ type: "UPDATE_FAV_PLACES", fav: favPlaces });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
