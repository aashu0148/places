import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../Spinner";
import Post from "./Post";

function FavPlaces(props) {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    async function fetchPosts(place) {
      let res = await fetch(`/places/${place}`);
      let data = await res.json();
      let result = [...places];
      result.push(
        <Post
          key={data.id + props.uid}
          image={data.image}
          userPhoto="https://images.unsplash.com/photo-1519806141527-e3c35efe2c1c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
          fav={true}
          title={data.title}
          desc={data.desc}
          address={data.address}
          location={data.location}
        />
      );
      setPlaces(result);
    }
    if (props.favPlaces.length == 0) {
      setPlaces([<h2>No favorite place :(</h2>]);
    }
    props.favPlaces.forEach((item) => {
      fetchPosts(item);
    });
  }, []);

  return <div>{places.length > 0 ? places : <Spinner />}</div>;
}

const mapStateToProps = (state) => {
  return {
    favPlaces: state.fav,
    uid: state.id,
  };
};

export default connect(mapStateToProps)(FavPlaces);
