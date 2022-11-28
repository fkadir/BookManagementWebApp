import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import DeleteUser from "../components/Users/DeleteUser";
import DisplayUser from "../components/Users/DisplayUser";
import EditUser from "../components/Users/EditUser";
import "./Login.css";

function AccountManage() {
  const [edit, setEdit] = useState(false);
  //somehow needs to know what user we talking about for now hardcoded:
  const userID = "6385324cdeed9e43e10f5d08";

  const handleEdit = () => {
    setEdit(true);
  };

  let comp;
  if (edit) {
    comp = (
      <Container fluid>
        <EditUser id={userID} />
        {/* id={userID} */}
        <DeleteUser />
      </Container>
    );
  } else {
    comp = (
      <Container fluid>
        <DisplayUser id={userID} />
        <Button className="btnn" onClick={handleEdit} variant="outline-success">
          Edit Account
        </Button>
      </Container>
    );
  }
  return comp;
}

export default AccountManage;
