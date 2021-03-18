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
        const result = data.map((e) => (
          <User key={e.id} name={e.name} userPhoto={e.userPhoto} uid={e.id} />
        ));
        if (data.length == 0) {
          setUsers(<h2>No users available.</h2>);
        } else {
          setUsers(result);
        }
      })
      .catch((err) => {
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
    </div>
  );
}

export default Users;
