import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./Users/Login.css";

const LoginAuth = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
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

    try {
      fetch(`http://localhost:3100/users?username=${input.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data[0].password == input.password) {
            setUserId(data[0]._id);
            setUsername(data[0].username);
            console.log(`rendering main page for ${username}`);
            // ACTUALLY RENDER MAIN PAGE AND SHIT???
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

        <Button className="headings-bold inputs" type="submit" variant="light">
          Login
        </Button>
        <Alert variant={statusMessage ? "danger" : null}>
          {" "}
          {statusMessage}
        </Alert>
        {/* forgot password??? password recovery */}
      </Form>
    </Container>
  );
};

export default LoginAuth;
