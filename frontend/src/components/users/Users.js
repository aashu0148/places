import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

import User from "./User";
import "./Users.css";

function Users() {
  const [name, setName] = useState("");
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
      <User
        name="John"
        places="12"
        userPhoto="https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427__340.jpg"
      />
      <User
        name="Suzen"
        places="7"
        userPhoto="https://cdn.pixabay.com/photo/2020/10/04/10/43/horse-5625922__340.jpg"
      />
      <User
        name="jimmy"
        places="4"
        userPhoto="https://cdn.pixabay.com/photo/2015/09/18/00/24/robin-944887__340.jpg"
      />
    </div>
  );
}

export default Users;
