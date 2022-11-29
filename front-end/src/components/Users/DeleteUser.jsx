import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import "./Login.css";

const DeleteUser = (props) => {
  const [statusMessage, setStatusMessage] = useState("");
  const [deleted, setDeleted] = useState(false);

  const handleDelete = () => {
    try {
      fetch(`http://localhost:3100/users?username=${props.username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDeleted(true);
        });
    } catch (error) {
      setStatusMessage("Unable to delete your account at this time");
    }
  };

  // handle redirect
  // if (deleted) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div>
      <Button className="btnn" variant="outline-danger" onClick={handleDelete}>
        Delete Account
      </Button>
      <Alert variant={statusMessage != "" ? "danger" : null}>
        {statusMessage}
      </Alert>
    </div>
  );
};

export default DeleteUser;
