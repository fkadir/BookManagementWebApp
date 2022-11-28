import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./Users/Login.css";

const LoginAuth = ({ handleLogin }) => {
  const [statusMessage, setStatusMessage] = useState("");
  const formSchema = Yup.object().shape({
    username: Yup.string().required("username is mandatory"),
    password: Yup.string().required("password is mandatory"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(input) {
    setStatusMessage("");
    const username = input.username;

    try {
      fetch(`http://localhost:3100/users?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data[0].password == input.password) {
            let code = {
              authentication: Math.random().toString(16).substr(2, 10),
            };
            fetch(`http://localhost:3100/users?username=${username}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(code),
            })
              .then((response) => response.json())
              .then((data) => {
                handleLogin(username);
              });
          } else {
            setStatusMessage("Username or Password was incorrect");
          }
        });
    } catch (err) {
      // Remediation logic
      setStatusMessage("There was an error logging in");
    }
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="inputs">
          <Form.Label className="headings-bold">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            {...register("username")}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </Form.Group>

        <Form.Group className="inputs">
          <Form.Label className="headings-bold">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </Form.Group>
        <p>
          <a href="./login/forgot">Forgot Your Password?</a>
        </p>
        <Button className="headings-bold inputs" type="submit" variant="light">
          Login
        </Button>
        <Alert variant={statusMessage ? "danger" : null}>
          {" "}
          {statusMessage}
        </Alert>
      </Form>
    </Container>
  );
};

export default LoginAuth;
