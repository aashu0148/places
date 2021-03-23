import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";

import Post from "../body/Post";
import Spinner from "../Spinner";
import "./UserPlaces.css";

function UserPlaces(props) {
  const [userPlaces, setUserPlaces] = useState(<Spinner />);
  const [userPhoto, setUserPhoto] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch(`/users/${props.match.params.uid}`).then(async (response) => {
      const res = await response.json();
      if (response.status > 300 && response.status < 500) {
        setUserPlaces(<h1>No such user :(</h1>);
        return;
      }
      setUserName(res.name);
      setUserPhoto(res.userPhoto);

      fetch(`/users/${res.id}/places`).then(async (res) => {
        let data = await res.json();
        if (res.status >= 200 && res.status < 300) {
          let result = data.map((place) => (
            <Post
              key={place.id}
              id={place.id}
              image={place.image}
              userPhoto={place.authorPhoto}
              fav={false}
              title={place.title}
              desc={place.desc}
              address={place.address}
              location={place.location}
            />
          ));
          setUserPlaces(result);
        } else setUserPlaces(<h2>{data.message}</h2>);
      });
    });
  }, []);

  return (
    <div className="userPlaces">
      <div className="userPlaces_head">
        <Avatar
          style={{ width: "200px", height: "200px" }}
          src={"http://localhost:5000/" + userPhoto}
        />
        <h2>{userName}</h2>
      </div>
      <br />
      <div className="userPlaces_body">{userPlaces}</div>
    </div>
  );
}

export default UserPlaces;
