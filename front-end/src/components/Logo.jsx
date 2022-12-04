import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";
import logo from "../images/logo-nobg.png";
import "./Users/Login.css";

const Logo = () => {
  return (
    <Navbar sticky="top" className="nav mb-3">
      <Container className="navbar-links" fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center pad-0">
          <img
            width="100"
            height="100"
            className="d-inline-block"
            src={logo}
            alt="Bookmarked Logo"
          />
          <h3>Bookmarked</h3>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Logo;
