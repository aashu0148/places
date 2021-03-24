import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";

import User from "./User";
import Spinner from "../Spinner";
import "./Users.css";

let timer;
function Users() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState(<Spinner />);
  const [allUsers, setAllUsers] = useState();

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
          setAllUsers(result);
        }
      })
      .catch((err) => {
        setUsers(<h2>Can't connect to the server :(</h2>);
      });
  }, []);

  const searchUser = (search) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fetch(`/users/search/${search}`).then(async (res) => {
        if (res.status >= 200 && res.status < 300) {
          const data = await res.json();
          const result = data.map((e) => (
            <User key={e.id} name={e.name} userPhoto={e.userPhoto} uid={e.id} />
          ));
          setUsers(result);
        } else {
          setUsers(<h2>No users available with name = {search}</h2>);
        }
      });
    }, 800);
  };

  useEffect(() => {
    if (name === "" || name.replace(/\s/g, "").length === 0) {
      setUsers(allUsers);
      return;
    }

    let searchString = name.trim();

    searchUser(searchString);
  }, [name]);

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
