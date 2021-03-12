import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./New.css";

function New(props) {
  const submission = (e) => {
    e.preventDefault();
    console.log("In submission");
  };

  const content = (
    <div className={props.show ? "modal_new modal_new_show" : "modal_new"}>
      <div className="modal_new_head">Add a Place</div>

      <form className="modal_new_form" onSubmit={(e) => submission(e)}>
        <div className="form-elem">
          <label>Title</label>
          <input placeholder="Enter Title" type="text" required></input>
        </div>
        <div className="form-elem">
          <label>Image URL</label>
          <input placeholder="Enter Image url" type="text"></input>
        </div>
        <div className="form-elem">
          <label>Description</label>
          <textarea placeholder="Enter Description"></textarea>
        </div>
        <div className="form-elem">
          <label>Location</label>
          <input placeholder="Longitute" type="text"></input>
          <input placeholder="Latitude" type="text"></input>
        </div>
        <div className="form-elem">
          <label>Address</label>
          <input placeholder="Enter address" type="text"></input>
        </div>

        <div className="modal_new_buttons">
          <div className="btn-close" onClick={props.hide}>
            Close
          </div>
          <button className="btn-submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal_new"));
}

export default New;
