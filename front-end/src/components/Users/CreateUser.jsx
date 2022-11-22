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

  function onSubmit(data) {
    setStatusMessage("");

    let user = {
      username: data.username,
      password: data.password,
      email: data.email,
    };

    try {
      fetch("http://localhost:3100/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((response) => response.json());
    } catch (err) {
      // Remediation logic
      setStatusMessage("There was an error creating the user");
    }
  }

  return (
    <Container bg="light" fluid="sm">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
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

        <Form.Group>
          <Form.Label className="headings-bold">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            {...register("username")}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>
        </Form.Group>

        <Form.Group>
          <Form.Label className="headings-bold">Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </Form.Group>

        <Form.Group>
          <Form.Label className="headings-bold">Confirm Password</Form.Label>
          <Form.Control
            name="pwCheck"
            type="password"
            {...register("pwCheck")}
            className={`form-control ${errors.pwCheck ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.pwCheck?.message}</div>
        </Form.Group>

        <Button className="headings-bold" type="submit" variant="light">
          {" "}
          create account
        </Button>
        <Alert variant={statusMessage != "" ? "danger" : null}>
          {" "}
          {statusMessage}
        </Alert>
      </Form>
    </Container>
  );
};

export default CreateUser;
