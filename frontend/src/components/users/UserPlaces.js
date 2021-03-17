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
    fetch(`/users/${props.match.params.uid}`)
      .then((res) => res.json())
      .then((res) => {
        setUserName(res.name);
        setUserPhoto(res.userPhoto);
        let places = res.places;

        fetch("/users/places", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(places),
        }).then(async (res) => {
          let data = await res.json();
          if (res.status >= 200 && res.status < 300) {
            let result = data.map((place) => (
              <Post
                key={place.id}
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
        <Avatar style={{ width: "200px", height: "200px" }} src={userPhoto} />
        <h2>{userName}</h2>
      </div>
      <br />
      <div className="userPlaces_body">
        {userPlaces}
        {/* <Post
          image="https://cdn.pixabay.com/photo/2020/02/02/17/24/travel-4813658__340.jpg"
          userPhoto="https://images.unsplash.com/photo-1519806141527-e3c35efe2c1c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
          fav={false}
          title="India Gate"
          desc='The India Gate is a war memorial located astride the Rajpath, on the
                eastern edge of the "ceremonial axis" of New Delhi, formerly called
                Kingsway.'
          address="Rajpath, India Gate, New Delhi, Delhi 110001"
          location=""
        /> */}
      </div>
    </div>
  );
}

export default UserPlaces;
