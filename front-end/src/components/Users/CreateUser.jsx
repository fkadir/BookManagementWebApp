import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./Login.css";

//password validation from: https://www.positronx.io/add-confirm-password-validation-in-react-with-hook-form/

//ref: code from createuser lab4
const CreateUser = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const formSchema = Yup.object().shape({
    email: Yup.string().email().required("email is mandatory"),
    username: Yup.string().required("username is mandatory"),
    password: Yup.string()
      .required("Password is mandatory")
      .min(6, "Password must be 6 char long"),
    pwCheck: Yup.string()
      .required("Password is mandatory")
      .oneOf([Yup.ref("password")], "Password does not match"),
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
          console.log(data);
          // ensure username is unique
          if (data.length != 0) {
            setStatusMessage("Username already in use ");
          } else {
            let user = {
              username: input.username,
              password: input.password,
              email: input.email,
            };
            handleCreateUser(user);
          }
        });
    } catch (err) {
      setStatusMessage("There was an error creating your account");
    }
  }

  function handleCreateUser(user) {
    try {
      fetch("http://localhost:3100/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          setStatusMessage(data.msg);
          setConfirmation(data.confirm);
        });
    } catch (err) {
      // Remediation logic
      setStatusMessage("There was an error creating the user");
    }
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="inputs">
          <Form.Label className="headings-bold">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </Form.Group>

        <Form.Group className="inputs">
          <Form.Label className="headings-bold">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            {...register("username")}
            className={` form-control ${errors.username ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
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

        <Button className="headings-bold inputs btnn" type="submit">
          create account
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

export default CreateUser;
