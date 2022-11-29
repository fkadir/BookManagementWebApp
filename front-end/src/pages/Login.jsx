import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../components/Logo";
import CreateUser from "../components/Users/CreateUser";
import LoginAuth from "../components/LoginAuth";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";

function Login() {
  // false = create account functionality, true = login functionality
  let [state, setState] = useState(true);

  const handleSignIn = (e) => {
    e.preventDefault();
    setState(true);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setState(false);
  };

  if (state) {
    return (
      <div>
        <Logo />
        <LoginAuth />
        <Button variant="light" onClick={handleCreateAccount}>
          Create an account?{" "}
        </Button>
        {/* for testing purposes */}
        <Button
          className="inputs"
          variant="light"
          onClick={localStorage.removeItem("token")}
        >
          LOGOUT{" "}
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Logo />
        <CreateUser />
        <Button className="inputs" variant="light" onClick={handleSignIn}>
          Already have an account?{" "}
        </Button>
      </div>
    );
  }
}

export default Login;
