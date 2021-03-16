import React from "react";

let formPassword, formEmail, formName;
function Signup(props) {
  const submission = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup">
      <form onSubmit={(e) => submission(e)}>
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
          <button type="submit">Sign up</button>
          <p>
            {"Already a member ?"} <span onClick={props.switch}>Login</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
