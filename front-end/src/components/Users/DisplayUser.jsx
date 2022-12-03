import React, { useState, useEffect } from "react";
import { Alert, Table } from "react-bootstrap";
import "./Login.css";

const DisplayUser = (props) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setStatusMessage("");
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
          if (data.length === 1) {
            setUser(data[0].username);
            setEmail(data[0].email);
          } else {
            setStatusMessage("Error has occured");
          }
        });
    } catch (error) {
      setStatusMessage("Unable to display your account at this time");
    }
  };

  return (
    <div>
      <Table className="text-center">
        <thead>
          <h3>Account Details </h3>
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
