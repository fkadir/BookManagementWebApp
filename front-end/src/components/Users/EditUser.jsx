import React, { useState, Navigate } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./Login.css";

const EditUser = (props) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const formSchema = Yup.object().shape({
    pwCheck: Yup.string().oneOf(
      [Yup.ref("password")],
      "Password does not match"
    ),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  //handle form input
  function onSubmit(input) {
    delete input.pwCheck;
    if (!input.email) {
      delete input.email;
    }
    if (!input.username) {
      delete input.username;
    }
    if (!input.password) {
      delete input.password;
    }

    try {
      fetch(`http://localhost:3100/users?username=${props.username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      })
        .then((response) => response.json())
        .then((data) => {
          setConfirmation("Changes have been saved!");
        });
    } catch (err) {
      setStatusMessage("There was an error creating your account");
    }
  }

  function handleExit() {
    console.log("EXIT");
  }

  return (
    <Container fluid>
      <h3> Edit Account</h3>
      <Form>
        <Form.Group className="inputs">
          <Form.Label className="headings-bold">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            {...register("email")}
          />
        </Form.Group>

        <Form.Group className="inputs">
          <Form.Label className="headings-bold">Username</Form.Label>
          <Form.Control type="text" name="username" {...register("username")} />
        </Form.Group>

        <Form.Group className="inputs">
          <Form.Label className="headings-bold">Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </Form.Group>

        <Form.Group className="inputs">
          <Form.Label className="headings-bold">Confirm Password</Form.Label>
          <Form.Control
            name="pwCheck"
            type="password"
            {...register("pwCheck")}
            className={`form-control ${errors.pwCheck ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.pwCheck?.message}</div>
        </Form.Group>

        <Button
          className="headings-bold inputs btnn"
          type="submit"
          onClick={handleExit}
        >
          Exit
        </Button>
        <Button
          className="headings-bold inputs btnn"
          type="submit"
          variant="outline-success"
          onClick={handleSubmit(onSubmit)}
        >
          Save Account Details
        </Button>
        <Alert variant={statusMessage != "" ? "danger" : null}>
          {" "}
          {statusMessage}
        </Alert>
        <Alert variant={confirmation != "" ? "success" : null}>
          {" "}
          {confirmation}
        </Alert>
      </Form>
    </Container>
  );
};

export default EditUser;
