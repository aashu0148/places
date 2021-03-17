import React, { useState } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";

import "./New.css";
function New(props) {
  const [currChar, setcurrChar] = useState(0);
  let formForm, formAddress, formDesc, formTitle, formLat, formLong, formImage;
  const submission = (e) => {
    e.preventDefault();
    let obj = {
      title: formTitle.value,
      desc: formDesc.value,
      image: formImage.value,
      location: {
        long: formLong.value,
        lat: formLat.value,
      },
      address: formAddress.value,
      author: props.uid,
      authorPhoto: props.userPhoto,
    };

    fetch("/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    }).then((res) => {
      formForm.reset();
      props.placeUpdateAction();
      props.hide();
    });
  };

  const content = (
    <div
      className={
        props.show
          ? "modal_new-backdrop modal_new-backdrop-show"
          : "modal_new-backdrop"
      }
      onClick={props.hide}
    >
      <div
        className="modal_new "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal_new_head">Add a Place</div>

        <form
          ref={(el) => (formForm = el)}
          className="modal_new_form"
          onSubmit={(e) => submission(e)}
        >
          <div className="form-elem">
            <label>Title</label>
            <input
              ref={(el) => (formTitle = el)}
              placeholder="Enter Title"
              type="text"
              required
            ></input>
          </div>
          <div className="form-elem">
            <label>Image URL</label>
            <input
              ref={(el) => (formImage = el)}
              placeholder="Enter Image url"
              type="text"
              required
            ></input>
          </div>
          <div className="form-elem">
            <label>
              Description{" "}
              <span style={{ fontSize: "0.7rem" }}>{currChar}/200</span>
            </label>
            <textarea
              ref={(el) => (formDesc = el)}
              placeholder="Enter Description"
              maxLength="200"
              required
              onChange={(e) => setcurrChar(e.target.value.length)}
            ></textarea>
          </div>
          <div className="form-elem">
            <label>Location</label>
            <input
              ref={(el) => (formLong = el)}
              placeholder="Longitute"
              type="number"
              min="-90"
              max="90"
              step="0.0001"
            ></input>
            <input
              ref={(el) => (formLat = el)}
              placeholder="Latitude"
              type="number"
              min="-90"
              max="90"
              step="0.0001"
            ></input>
          </div>
          <div className="form-elem">
            <label>Address</label>
            <input
              ref={(el) => (formAddress = el)}
              placeholder="Enter address"
              type="text"
              required
              maxLength="80"
            ></input>
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
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal_new"));
}

const mapStateToProps = (state) => {
  return {
    uid: state.id,
    userPhoto: state.userPhoto,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    placeUpdateAction: () => dispatch({ type: "PLACE_UPDATE" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
