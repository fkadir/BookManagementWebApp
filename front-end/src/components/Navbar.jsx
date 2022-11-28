// import { Navbar, Nav, Container } from "react-bootstrap";
// import React from "react";
// import logo from "../images/logo-nobg.png";
// import "./Navbar.css";

// /* Component: displays navigation bar in all the pages */

// const NavbarComp = () => {
//   return (
//     // https://react-bootstrap.netlify.app/components/navbar/#rb-docs-content
//     <Navbar bg="light" expand="md" sticky="top">
//       <Container className="navbar-links" fluid>
//         <Navbar.Brand href="/" className="d-flex align-items-center">
//           <img
//             width="100"
//             height="100"
//             className="d-inline-block"
//             src={logo}
//             alt="Bookmarked Logo"
//           />
//           <h3>Bookmarked</h3>
//         </Navbar.Brand>
//         <Nav className="justify-content-end">
//           <Nav.Link href="/">Home</Nav.Link>
//           <Nav.Link href="/my-books">My Books</Nav.Link>
//           <Nav.Link href="/account-manage">Account</Nav.Link>
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavbarComp;

//////////////////////////////////////////////////////////////////

import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import logo from "../images/logo-nobg.png";

// https://react-bootstrap.github.io/components/offcanvas/  = made changes to suit our app
function NavbarComp() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          bg="light"
          expand={expand}
          sticky="top"
          className="mb-3"
        >
          <Container className="navbar-links" fluid>
            <Navbar.Brand href="/" className="d-flex align-items-center">
              <img
                width="100"
                height="100"
                className="d-inline-block"
                src={logo}
                alt="Bookmarked Logo"
              />
              <h3>Bookmarked</h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Bookmarked
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/my-books">My Books</Nav.Link>
                  <Nav.Link href="/account-manage">Account</Nav.Link>
                  <Button variant="outline-success">Logout</Button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarComp;
