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
        const result = data.map((e) => (
          <Post
            key={e.id}
            image={e.image}
            userPhoto="https://images.unsplash.com/photo-1519806141527-e3c35efe2c1c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
            fav={props.favPlaces.includes(e.id) ? true : false}
            title={e.title}
            desc={e.desc}
            address={e.address}
            location={e.location}
          />
        ));
        setPlaces(result);
      })
      .catch((err) => {
        console.error(err);
        setPlaces(<h2>Could not connect to the server :(</h2>);
      });
  }, []);

  return (
    <div>
      {places}
      <Post
        image="https://cdn.pixabay.com/photo/2020/02/02/17/24/travel-4813658__340.jpg"
        userPhoto="https://images.unsplash.com/photo-1519806141527-e3c35efe2c1c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
        fav={false}
        title="India Gate"
        desc='The India Gate is a war memorial located astride the Rajpath, on the
        eastern edge of the "ceremonial axis" of New Delhi, formerly called
        Kingsway.'
        address="Rajpath, India Gate, New Delhi, Delhi 110001"
        location={{
          long: 77.2295,
          lat: 28.612912,
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favPlaces: state.fav,
    places: state.places,
    userPhoto: state.userPhoto,
    uid: state.id,
    name: state.name,
  };
};

export default connect(mapStateToProps)(Main);
