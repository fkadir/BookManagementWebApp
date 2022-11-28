import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Logo from "../components/Logo";
import CreateUser from "../components/Users/CreateUser";
import LoginAuth from "../components/LoginAuth";
import Button from "react-bootstrap/Button";

import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Login({ communicateLogin }) {
  // false = create account functionality, true = login functionality
  let [state, setState] = useState(true);

  //maybe?
  // null =  not loggedin, username = loggedin
  // const [user, setUser] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    setState(true);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setState(false);
  };

  // if (user) {
  //   return <Navigate to="/" replace />;
  // } else
  if (state) {
    return (
      <div>
        <Logo />
        <LoginAuth
          handleLogin={(username) => {
            setUser(username);
            communicateLogin(username);
          }}
        />
        <Button variant="light" onClick={handleCreateAccount}>
          Create an account?{" "}
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
