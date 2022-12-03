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
        <Button variant="outline-success" onClick={handleCreateAccount}>
          Create an account?{" "}
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Logo />
        <CreateUser />
        <Button
          className="inputs"
          variant="outline-success"
          onClick={handleSignIn}
        >
          Click here to login{" "}
        </Button>
      </div>
    );
  }
}

export default Login;
