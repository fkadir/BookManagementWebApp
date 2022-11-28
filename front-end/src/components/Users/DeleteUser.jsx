import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import "./Login.css";

const DeleteUser = (props) => {
  const [statusMessage, setStatusMessage] = useState("");

  const handleClick = () => {
    try {
      fetch(`http://localhost:3100/users?id=${props.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
    } catch (error) {
      setStatusMessage("Unable to delete your account at this time");
    }
  };

  return (
    <div>
      <Button className="btnn" variant="outline-danger" onClick={handleClick}>
        Delete Account
      </Button>
      <Alert variant={statusMessage != "" ? "danger" : null}>
        {statusMessage}
      </Alert>
    </div>
  );
};

export default DeleteUser;
