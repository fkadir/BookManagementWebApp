import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";
import logo from "../images/logo-nobg.png";
import "./Navbar.css";

const Logo = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#" class="d-flex align-items-left">
        <img
          width="100"
          height="100"
          className="d-inline-block"
          src={logo}
          alt="Bookmarked Logo"
        />
        <h3>Bookmarked</h3>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Logo;
