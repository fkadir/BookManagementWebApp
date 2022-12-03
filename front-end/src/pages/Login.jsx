import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../components/Logo";
import CreateUser from "../components/Users/CreateUser";
import LoginAuth from "../components/LoginAuth";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Footer from "../components/Footer.jsx";

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
        <Button className="btnn" onClick={handleCreateAccount}>
          Create an account?{" "}
        </Button>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Logo />
        <CreateUser />
        <Button className="inputs btnn" onClick={handleSignIn}>
          Click here to login{" "}
        </Button>
        <Footer />
      </div>
    );
  }
}

export default Login;
