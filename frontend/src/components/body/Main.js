import React from "react";

import Post from "./Post";

function Main() {
  return (
    <div>
      <Post
        image="https://cdn.pixabay.com/photo/2020/02/02/17/24/travel-4813658__340.jpg"
        userPhoto="https://images.unsplash.com/photo-1519806141527-e3c35efe2c1c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTB8fHByb2ZpbGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
        location=""
        fav={false}
        title="India Gate"
        desc='The India Gate is a war memorial located astride the Rajpath, on the
        eastern edge of the "ceremonial axis" of New Delhi, formerly called
        Kingsway.'
      />
    </div>
  );
}

export default Main;