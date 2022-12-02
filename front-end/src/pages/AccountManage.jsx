import React, { useState, useEffect } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import DeleteUser from "../components/Users/DeleteUser";
import DisplayUser from "../components/Users/DisplayUser";
import EditUser from "../components/Users/EditUser";
import "./Login.css";

function AccountManage() {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const getUser = () => {
    try {
      fetch(`http://localhost:3100/users/isUserAuth`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.username);
          setUsername(data.username);
        });
    } catch (error) {
      setStatusMessage("Your account details cannot be shown at this time");
    }
  };

  useEffect(() => {
    getUser();
  });

  const handleEdit = () => {
    setEdit(true);
  };

  let comp;
  if (edit) {
    comp = (
      <Container fluid>
        <EditUser username={username} />
        <DeleteUser username={username} />
        <Alert variant={statusMessage ? "danger" : null}>
          {" "}
          {statusMessage}
        </Alert>
      </Container>
    );
  } else {
    comp = (
      <Container fluid>
        <DisplayUser username={username} />
        <Button className="btnn" onClick={handleEdit} variant="outline-success">
          Edit Account
        </Button>
        <Alert variant={statusMessage ? "danger" : null}>
          {" "}
          {statusMessage}
        </Alert>
      </Container>
    );
  }
  return comp;
}

export default AccountManage;
