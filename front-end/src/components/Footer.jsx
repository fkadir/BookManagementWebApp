import { React, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import logo from "../images/logo-nobg.png";

const Footer = () => {
  const ScrollTop = () => {
    //scroll to the top of the page
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <Card bg="grey">
      <Card.Body>
        <Button className="btnn" size="lg" onClick={ScrollTop}>
          Back to the top
        </Button>
        <div>
          <img
            width="100"
            height="100"
            className="d-inline-block"
            src={logo}
            alt="Bookmarked Logo"
          />
        </div>
        <div>
          <h4>Links</h4>
          <Card.Link href="/my-books"> My Books</Card.Link>
          <Card.Link href="/account-manage"> Account</Card.Link>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Card.Text>created by Nikole Inchoco & Fenna Kadir</Card.Text>
      </Card.Footer>
    </Card>
  );
};

export default Footer;
