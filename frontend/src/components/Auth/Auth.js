import React, { useState } from "react";

import Login from "./Login";
import Signup from "./Signup";
import "./style.css";

function Auth() {
  const [comp, setComp] = useState("login");

  const switchComp = () => {
    if (comp == "login") setComp("signup");
    else setComp("login");
  };

  return (
    <div className="auth">
      {comp == "login" ? (
        <Login switch={switchComp} />
      ) : (
        <Signup switch={switchComp} />
      )}
    </div>
  );
}

export default Auth;
