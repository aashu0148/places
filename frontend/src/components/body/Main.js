import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../Spinner";
import Post from "./Post";

function Main(props) {
  const [places, setPlaces] = useState(<Spinner />);
  useEffect(() => {
    fetch("/places")
      .then((res) => res.json())
      .then((data) => {
        const result = data.map((e) => {
          return (
            <Post
              key={e._id}
              image={e.image}
              userPhoto={e.authorPhoto}
              fav={props.favPlaces.includes(e.id) ? true : false}
              title={e.title}
              desc={e.desc}
              address={e.address}
              location={e.location}
            />
          );
        });
        setPlaces(result);
      })
      .catch((err) => {
        console.error(err);
        setPlaces(<h2>Could not connect to the server :(</h2>);
      });
  }, [props.noOfPlaces]);

  return <div>{places}</div>;
}

const mapStateToProps = (state) => {
  return {
    favPlaces: state.fav,
    userPhoto: state.userPhoto,
    uid: state.id,
    name: state.name,
    noOfPlaces: state.noOfPlaces,
  };
};

export default connect(mapStateToProps)(Main);
