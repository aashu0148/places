import React from "react";

let formEmail, formPassword;
function Login(props) {
  const submission = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <form onSubmit={(e) => submission(e)}>
        <h1 className="login_heading">Login</h1>

        <div className="login_form-elem">
          <label>Email</label>
          <input
            placeholder="Enter email"
            type="email"
            required
            area-required="true"
            ref={(el) => (formEmail = el)}
          ></input>
        </div>

        <div className="login_form-elem">
          <label>Password</label>
          <input
            placeholder="Enter password"
            type="password"
            required
            area-required="true"
            minLength="6"
            ref={(el) => (formPassword = el)}
          ></input>
        </div>
        <div className="login_bottom">
          <button type="submit">Login</button>
          <p>
            {"new here ?"} <span onClick={props.switch}>Sign up</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
