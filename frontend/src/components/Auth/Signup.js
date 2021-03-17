import React from "react";
import { connect } from "react-redux";

let form, formButton, formErrorMsg, formPassword, formEmail, formName;
function Signup(props) {
  const submission = (e) => {
    e.preventDefault();
    let data = {
      name: formName.value,
      email: formEmail.value,
      password: formPassword.value,
    };
    formButton.disabled = true;
    fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        let body = await res.json();
        formButton.disabled = false;
        if (res.status >= 200 && res.status < 300) {
          props.loginAction(
            body.id,
            body.name,
            body.userPhoto,
            body.places,
            body.fav
          );
          form.reset();
          props.history.push("/");
        } else {
          if (formErrorMsg) formErrorMsg.innerText = body.message;
        }
      })
      .catch((err) => {
        formButton.disabled = false;
        formErrorMsg.innerText = "Error Connecting database : " + err;
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
    loginAction: (id, name, photo, places, fav) =>
      dispatch({ type: "LOGIN", id, name, photo, places, fav }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
