import React, { useState, Navigate } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./Login.css";

const EditUser = (props) => {
  const [statusMessage, setStatusMessage] = useState("");

  //adapt to pw not being required??
  const formSchema = Yup.object().shape({
    password: Yup.string().min(6, "Password must be 6 char long"),
    pwCheck: Yup.string().oneOf(
      [Yup.ref("password")],
      "Password does not match"
    ),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  //adapt to edit user!!
  function onSubmit(input) {
    console.log(input);
    setStatusMessage("");
    // try {
    //   fetch(`http://localhost:3100/users?username=${input.username}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //       // ensure username is unique
    //       if (data[0].username) {
    //         setStatusMessage("Username already in use ");
    //       } else {
    //         let user = {
    //           username: input.username,
    //           password: input.password,
    //           email: input.email,
    //         };
    //         // handleEditUser(user);
    //       }
    //     });
    // } catch (err) {
    //   setStatusMessage("There was an error creating your account");
    // }
  }

  // adapt to edit!!
  //   function handleEditUser(user) {
  //     try {
  //       fetch("http://localhost:3100/users", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(user),
  //       }).then((response) => response.json());
  //     } catch (err) {
  //       // Remediation logic
  //       setStatusMessage("There was an error chanign details");
  //     }
  //   }

  //why does this function work???
  function handleExit() {
    console.log("EXIT");
  }

  return (
    <Container fluid>
      <div> Edit Account</div>
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
          className="headings-bold inputs"
          type="submit"
          variant="outline-danger"
          onClick={handleExit}
        >
          Exit
        </Button>
        <Button
          className="headings-bold inputs"
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
      </Form>
    </Container>
  );
};

export default EditUser;
