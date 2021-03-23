import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";

import ImageUpload from "./ImageUpload";
import "./New.css";

function New(props) {
  const errorMsg = useRef();
  const submitButton = useRef();
  const [currChar, setcurrChar] = useState(0);
  const [file, setFile] = useState();
  let formForm, formAddress, formDesc, formTitle, formLat, formLong, formImage;
  const submission = (e) => {
    e.preventDefault();

    if (!file) {
      errorMsg.current.innerText = "Please select an image.";
      return;
    } else {
      errorMsg.current.innerText = "";
    }
    submitButton.current.disabled = true;
    const formData = new FormData();
    formData.append("title", formTitle.value);
    formData.append("desc", formDesc.value);
    formData.append("location", {
      long: formLong.value,
      lat: formLat.value,
    });
    formData.append("address", formAddress.value);
    formData.append("author", props.uid);
    formData.append("authorPhoto", props.userPhoto);
    formData.append("image", file);

    fetch("/places", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        formForm.reset();
        props.placeUpdateAction();
        submitButton.current.disabled = false;
        props.hide();
      })
      .catch((err) => {
        submitButton.current.disabled = false;
        errorMsg.current.innerText = "Error while creating new Post :(";
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
            <label>Location</label>
            <div className="modal_new_location">
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
          </div>
          <div className="form-elem">
            <label>Image</label>
            <ImageUpload
              onInput={(file) => {
                setFile(file);
              }}
            />
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
            <button ref={submitButton} className="btn-submit" type="submit">
              Submit
            </button>
          </div>
        </form>
        <small
          ref={errorMsg}
          style={{
            fontWeight: "bold",
            color: "red",
            fontSize: "0.9rem",
            letterSpacing: "1px",
            padding: "0 4px",
            display: "block",
            width: "fit-content",
            margin: "0 auto",
          }}
        ></small>
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
