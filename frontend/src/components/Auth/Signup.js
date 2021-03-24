import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";

import ImageUpload from "../modal/ImageUpload";
import key from "../../secret";

let form, formButton, formErrorMsg, formPassword, formEmail, formName;
function Signup(props) {
  const [file, setFile] = useState();
  const submission = (e) => {
    e.preventDefault();
    if (!file) {
      formErrorMsg.innerText = "Please select an Image.";
      return;
    }

    const formData = new FormData();
    formData.append("name", formName.value);
    formData.append("email", formEmail.value);
    formData.append("password", formPassword.value);
    formData.append("image", file);

    formButton.disabled = true;
    fetch("/auth/signup", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        let body = await res.json();
        formButton.disabled = false;
        if (res.status >= 200 && res.status < 300) {
          props.loginAction(body.id, body.name, body.userPhoto, body.fav);
          form.reset();

          localStorage.removeItem("placesUser");
          const token = jwt.sign(
            {
              id: body.id,
              name: body.name,
            },
            key,
            {
              expiresIn: "5d",
            }
          );
          localStorage.setItem("placesUser", JSON.stringify(token));

          props.history.push("/");
        } else {
          if (formErrorMsg) formErrorMsg.innerText = body.message;
        }
      })
      .catch((err) => {
        if (formErrorMsg)
          formErrorMsg.innerText = "Error Connecting database : " + err;
        if (formButton) formButton.disabled = false;
      });
  };

  return (
    <div className="signup">
      <form ref={(el) => (form = el)} onSubmit={(e) => submission(e)}>
        <h1 className="signup_heading">Signup</h1>
        <div className="signup_form-elem">
          <label>Name</label>
          <input
            placeholder="Enter name"
            type="text"
            required
            area-required="true"
            ref={(el) => (formName = el)}
          ></input>
        </div>
        <div className="signup_form-elem">
          <label>Profile Image</label>
          <ImageUpload onInput={(file) => setFile(file)} />
        </div>
        <div className="signup_form-elem">
          <label>Email</label>
          <input
            placeholder="Enter email"
            type="email"
            required
            area-required="true"
            ref={(el) => (formEmail = el)}
          ></input>
        </div>

        <div className="signup_form-elem">
          <label>Password</label>
          <input
            placeholder="Enter password"
            type="password"
            required
            minLength="6"
            area-required="true"
            ref={(el) => (formPassword = el)}
          ></input>
        </div>
        <div className="signup_bottom">
          <button ref={(el) => (formButton = el)} type="submit">
            Sign up
          </button>
          <p>
            {"Already a member ?"} <span onClick={props.switch}>Login</span>
          </p>
        </div>
        <small
          style={{
            color: "yellow",
            letterSpacing: "1px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
          ref={(el) => (formErrorMsg = el)}
        ></small>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (id, name, photo, fav) =>
      dispatch({ type: "LOGIN", id, name, photo, fav }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
