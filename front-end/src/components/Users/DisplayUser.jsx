import React, { useState, useEffect } from "react";
import { Alert, Table } from "react-bootstrap";
import "./Login.css";

const DisplayUser = (props) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    handleDisplayUser();
  });

  const handleDisplayUser = () => {
    try {
      fetch(`http://localhost:3100/users?username=${props.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data[0].username);
          setEmail(data[0].email);
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
          <tr>{user}</tr>
          <tr className="headings-bold">Email</tr>
          <tr>{email}</tr>
        </tbody>
      </Table>
      <Alert variant={statusMessage != "" ? "danger" : null}>
        {statusMessage}
      </Alert>
    </div>
  );
};

export default DisplayUser;
