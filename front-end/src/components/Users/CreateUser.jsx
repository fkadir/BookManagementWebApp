import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";

//password validation from: https://www.positronx.io/add-confirm-password-validation-in-react-with-hook-form/

//ref: code from createuser lab4
const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

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

  function onSubmit(data) {
    setStatusMessage("");

    let user = {
      username: username,
      pw: data.password,
      email: email,
    };

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
          setStatusMessage("User " + user.username + " created");
        });
    } catch (err) {
      // Remediation logic
      setStatusMessage("There was an error creating the user");
    }
  }

  const handleEmailFieldChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleUsernameFieldChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => handleEmailFieldChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={username}
            onChange={(e) => handleUsernameFieldChange(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="pwCheck"
            type="password"
            {...register("pwCheck")}
            className={`form-control ${errors.pwCheck ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.pwCheck?.message}</div>
        </Form.Group>

        <div className="mt-3">
          <Button type="submit" variant="light">
            {" "}
            create account
          </Button>
        </div>
      </Form>
      {/* forgot password??? */}
    </div>
  );
};

export default CreateUser;
