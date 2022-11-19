import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";

function NavbarComp() {
  return (
    // https://react-bootstrap.netlify.app/components/navbar/#rb-docs-content
    <div>
      <Navbar bg="light" expand="lg">
        <Container className="navbar-links" fluid>
          <Navbar.Brand href="#">Bookmarked</Navbar.Brand>
          <Nav.Link to="/">Home</Nav.Link>
          <Nav.Link to="/my-books">My Books</Nav.Link>
          <Nav.Link to="/account-manage">Account</Nav.Link>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComp;
