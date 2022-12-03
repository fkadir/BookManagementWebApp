import { React, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import logo from "../images/logo-nobg.png";
import "./Footer.css";

const Footer = () => {
  const ScrollTop = () => {
    //scroll to the top of the page
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <Card className="footer-bg">
      <Card.Body>
        <Button className="btnn" size="lg" onClick={ScrollTop}>
          Back to the top
        </Button>
        <div className="logo">
          <Button className="btnn-light" href="/my-books">
            My Books
          </Button>
          <img
            width="100"
            height="100"
            className="d-inline-block"
            src={logo}
            alt="Bookmarked Logo"
          />
          <Button className="btnn-light" href="/account-manage">
            My account
          </Button>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted footer-bg">
        <Card.Text>created by Nikole Inchoco & Fenna Kadir</Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default Footer;
