import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../Spinner";
import Post from "./Post";

function FavPlaces(props) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (props.favPlaces.length == 0) {
      setPlaces(<h2>No favorite place. Please add one.</h2>);
      return;
    }
    fetch("/places/fav", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(props.favPlaces),
    })
      .then(async (res) => {
        if (res.status > 300 && res.status < 500) {
          setPlaces(<h2>Can't connect to the server:(</h2>);
          return;
        }
        const data = await res.json();

        const result = data.map((e) => {
          return (
            <Post
              key={e._id}
              id={e._id}
              image={e.image}
              userPhoto={e.authorPhoto}
              fav={true}
              title={e.title}
              desc={e.desc}
              address={e.address}
              location={e.location}
            />
          );
        });

        setPlaces(result);
      })
      .catch(() => {
        setPlaces(<h2>Can't connect to the server:(</h2>);
      });
  }, [props.favPlaces]);

  return <div>{places.length > 0 ? places : <Spinner />}</div>;
}

const mapStateToProps = (state) => {
  return {
    favPlaces: state.fav,
    uid: state.id,
  };
};

export default connect(mapStateToProps)(FavPlaces);
