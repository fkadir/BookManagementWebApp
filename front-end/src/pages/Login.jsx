import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../components/Logo";
import CreateUser from "../components/Users/CreateUser";
import LoginAuth from "../components/LoginAuth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Footer from "../components/Footer.jsx";

function Login({ communicateLogin }) {
  // false = create account functionality, true = login functionality
  const [state, setState] = useState(true);

  //maybe unnecessary??
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

  if (state) {
    return (
      <div>
        <Logo />
        <LoginAuth
          handleLogin={(username) => {
            // setUser(username);
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
