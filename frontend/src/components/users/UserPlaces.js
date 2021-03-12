import React from "react";

function UserPlaces(props) {
  return (
    <div className="userPlaces">
      <h1>{props.match.params.uid}</h1>
    </div>
  );
}

export default UserPlaces;
