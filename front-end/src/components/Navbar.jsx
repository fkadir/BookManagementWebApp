import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";
import logo from "../images/logo-nobg.png";
import "./Navbar.css";

/* Component: displays navigation bar in all the pages */

const NavbarComp = () => {
  return (
    // https://react-bootstrap.netlify.app/components/navbar/#rb-docs-content
    <Navbar bg="light" expand="lg">
      <Container className="navbar-links" fluid>
        <Navbar.Brand href="#" class="d-flex align-items-center">
          <img
            width="100"
            height="100"
            className="d-inline-block"
            src={logo}
            alt="Bookmarked Logo"
          />
          <h3>Bookmarked</h3>
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/my-books">My Books</Nav.Link>
          <Nav.Link href="/account-manage">Account</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
