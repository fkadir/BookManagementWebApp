import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo-nobg.png";

// https://react-bootstrap.github.io/components/offcanvas/  = made changes to suit our app
function NavbarComp() {
  const navigate = useNavigate();
  const handleLogout = () => {};

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} sticky="top" className="nav mb-3">
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
                  <Button
                    className="btnn"
                    onClick={() => {
                      localStorage.removeItem("token");
                      console.log(localStorage.getItem("token"));
                      navigate("/login");
                    }}
                  >
                    Logout
                  </Button>
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
