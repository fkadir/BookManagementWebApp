import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./Users/Login.css";

//code adapted from: https://www.positronx.io/add-confirm-password-validation-in-react-with-hook-form/ and

const LoginAuth = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const formSchema = Yup.object().shape({
    username: Yup.string().required("username is mandatory"),
    password: Yup.string().required("password is mandatory"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(input) {
    setStatusMessage("");
    const body = {
      username: input.username,
      password: input.password,
    };

    //code adapted from: https://dev.to/salarc123/mern-stack-authentication-tutorial-part-2-the-frontend-gen
    try {
      fetch(`http://localhost:3100/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          setStatusMessage(data.msg);
          localStorage.setItem("token", data.token);
          setIsLogin(data.success);
        });
    } catch (err) {
      // Remediation logic
      setStatusMessage("There was an error logging in");
    }
  }

  //handle redirect/navigate
  if (isLogin) {
    return <Navigate to="/" replace />;
  } else {
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
          <Button
            className="headings-bold inputs"
            type="submit"
            variant="light"
          >
            Login
          </Button>
          <Alert variant={statusMessage ? "danger" : null}>
            {" "}
            {statusMessage}
          </Alert>
        </Form>
      </Container>
    );
  }
};

export default LoginAuth;
