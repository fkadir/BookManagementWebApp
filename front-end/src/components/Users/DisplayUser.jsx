import React, { useState, useEffect } from "react";
import { Alert, Table } from "react-bootstrap";
import "./Login.css";

const DisplayUser = (props) => {
  const [statusMessage, setStatusMessage] = useState("");
  var [username, setUsername] = useState(null);
  var [email, setEmail] = useState(null);
  var [pw, setPw] = useState(null);

  useEffect(() => {
    handleDisplayUser();
  });

  const handleDisplayUser = () => {
    try {
      fetch(`http://localhost:3100/users?id=${props.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsername(data[0].username);
          setEmail(data[0].email);
          setPw(data[0].password);
        });
    } catch (error) {
      setStatusMessage("Unable to display your account at this time");
    }
  };

  return (
    <div>
      <Table className="text-center">
        <thead className="title">
          <tr>Account Details </tr>
        </thead>
        <tbody>
          <tr className="headings-bold">Username</tr>
          <tr>{username}</tr>
          <tr className="headings-bold">Email</tr>
          <tr>{email}</tr>
          <tr className="headings-bold">Password</tr>
          <tr>{pw}</tr>
        </tbody>
      </Table>
      <Alert variant={statusMessage != "" ? "danger" : null}>
        {statusMessage}
      </Alert>
    </div>
  );
};

export default DisplayUser;
