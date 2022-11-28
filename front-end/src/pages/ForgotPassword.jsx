import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import Logo from "../components/Logo";
import "./Login.css";

// code adapted from: https://github.com/coding-with-chaim/forgot-password-code/blob/master/client/src/routes/ResetPassword/index.js

// wwwwhhyyyy does nodemailer not work god damn it
const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = (input) => {
    input.preventDefault();

    try {
      fetch(`http://localhost:3100/pwrecovery/forgot?email=${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) =>
        response.json().then((value) => {
          setStatusMessage(value.msg);
          if (value.msg == "") {
            setEmailSent(true);
          }
        })
      );
    } catch (error) {
      setStatusMessage("Email could not be send");
    }
  };

  let comp;
  if (emailSent) {
    comp = (
      <div>
        <Logo />
        <span>An email with reset instructions is on its way</span>
      </div>
    );
  } else {
    comp = (
      <Container fluid>
        <Logo />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="inputs">
            <Form.Label className="headings-bold">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button
            className="headings-bold inputs"
            type="submit"
            variant="light"
          >
            Get Reset Link
          </Button>
          <Alert variant={statusMessage ? "danger" : null}>
            {statusMessage}
          </Alert>
        </Form>
      </Container>
    );
  }

  return comp;
};

export default ForgotPassword;
