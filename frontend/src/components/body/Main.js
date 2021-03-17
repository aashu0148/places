import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../Spinner";
import Post from "./Post";

function Main(props) {
  const [places, setPlaces] = useState(<Spinner />);
  useEffect(() => {
    console.log("use effect triggered");
    fetch("/places")
      .then((res) => res.json())
      .then((data) => {
        const result = data.map((e) => {
          return (
            <Post
              key={e._id}
              image={e.image}
              userPhoto="https://images.unsplash.com/photo-1519806141527-e3c35efe2c1c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
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
