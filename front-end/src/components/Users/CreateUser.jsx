import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

//potential for later when actually implementing it:
// https://www.geeksforgeeks.org/how-to-show-and-hide-password-in-reactjs/ ???

//ref: code from createuser lab4
const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleUsernameFieldChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handlePwFieldChange = (event) => {
    event.preventDefault();
    setPw(event.target.value);
  };

  // const handlePwCheck = (event) => {
  //   event.preventDefault;
  //   if (event.target.value == pw) {
  //     return true;
  //   } else return false;
  // };

  const handleEmailFieldChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    console.log(email);
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    console.log("clicked :)");
    setStatusMessage("");

    let user = {
      username: username,
      pw: pw,
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
  };

  return (
    <div className="container mt-3">
      <Form>
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
            type="text"
            placeholder=""
            value={pw}
            onChange={(e) => handlePwFieldChange(e)}
          />
        </Form.Group>

        {/* validation! */}
        <Form.Group>
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Button variant="light" onClick={handleCreateUser}>
          {" "}
          create account
        </Button>
      </Form>
      {/* forgot password??? */}
    </div>
  );
};

export default CreateUser;

{
  /* <div className="">
<div className="">
  <label className="">Email</label>
  <input
    type="text"
    placeholder="name@example.com"
    value={email}
    onChange={(e) => handleEmailFieldChange(e)}
  />

  <label className="">Username</label>
  <input
    type="text"
    placeholder=""
    value={username}
    onChange={(e) => handleUsernameFieldChange(e)}
  />

  <label className="">Password</label>
  <input
    type="text"
    placeholder=""
    value={pw}
    onChange={(e) => handlePwFieldChange(e)}
  />

  <label className="">Repeat Password</label>
  <input
    type="text"
    placeholder=""
    value={pw}
    onChange={(e) => handlePwFieldChange(e)}
  />
  <button className="" onClick={handleCreateUser}>
    Create User
  </button>
  <p className="">{statusMessage}</p>
</div>
</div> */
}
