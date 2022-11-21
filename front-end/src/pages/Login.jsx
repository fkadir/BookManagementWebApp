import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "../components/Navbar.jsx";
import CreateUser from "../components/Users/CreateUser";
import LoginAuth from "../components/LoginAuth";
import React, { useState } from "react";

function Login() {
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
      <div className="Login">
        <NavbarComp />
        <LoginAuth />
        <button onClick={handleCreateAccount}> Create account? </button>
        {/* <footer /> */}
      </div>
    );
  } else {
    return (
      <div className="Login">
        <NavbarComp />
        <CreateUser />
        <button onClick={handleLogin}> Login? </button>
        {/* <footer /> */}
      </div>
    );
  }
}

export default Login;
