import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";

import User from "./User";
import Spinner from "../Spinner";
import "./Users.css";

function Users() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState(<Spinner />);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const result = data.map((e) => (
          <User
            key={e.id}
            name={e.name}
            places={e.places.length}
            userPhoto={e.userPhoto}
            uid={e.id}
          />
        ));
        setUsers(result);
      })
      .catch((err) => {
        console.error(err);
        setUsers(<h2>Can't connect to the server :(</h2>);
      });
  }, []);

  return (
    <div className="users">
      <div className="users_search">
        <input
          type="text"
          placeholder="Search user"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="users_search-btn">
          <SearchIcon />
        </div>
      </div>
      {users}
      <User
        name="John"
        places="12"
        userPhoto="https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427__340.jpg"
        uid="uid_9"
      />
    </div>
  );
}

export default Users;
