import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../components/Logo";
import CreateUser from "../components/Users/CreateUser";
import LoginAuth from "../components/LoginAuth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function Login() {
  // false = create account functionality, true = login functionality
  const [state, setState] = useState(true);

  const handleLogin = (e) => {
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
        {/* <footer /> */}
      </div>
    );
  } else {
    return (
      <div>
        <Logo />
        <CreateUser />
        <Button className="inputs" variant="light" onClick={handleLogin}>
          Already have an account?{" "}
        </Button>
        {/* <footer /> */}
      </div>
    );
  }
}

export default Login;
