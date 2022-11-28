import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import Logo from "../components/Logo";
import "./Login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

// code adapted from: https://github.com/coding-with-chaim/forgot-password-code/blob/master/client/src/routes/ResetPassword/index.js and https://www.positronx.io/add-confirm-password-validation-in-react-with-hook-form/

//unadapted youtube: 6:25

const ResetPassword = (props) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const requestId = useParams();

  const formSchema = Yup.object().shape({
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

  const onSubmit = (input) => {
    let body = {
      _id: requestId,
      password: input.password,
    };

    try {
      fetch(`http://localhost:3100/pwrecovery/reset`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((response) =>
        response.json().then((value) => {
          setStatusMessage(value.msg);
          if (value.msg == "") {
            setConfirm(true);
          }
        })
      );
    } catch (error) {
      setStatusMessage("Your password could not be reset at this time");
    }
  };

  let comp;
  if (confirm) {
    comp = (
      <div>
        <Logo />
        <span>Password has been updated!</span>
      </div>
    );
  } else {
    comp = (
      <Container fluid>
        <Logo />
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            variant="light"
          >
            Save
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

export default ResetPassword;
