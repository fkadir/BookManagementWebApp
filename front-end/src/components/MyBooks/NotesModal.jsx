import React from "react";
import { Form, Modal, Button, InputGroup } from "react-bootstrap";

/* modal of full book details (i.e a pop up of books details when you click the BookCard) */
const NotesModal = ({ modalShow, bookItem, onHide }) => {
  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">Notes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p> TEST </p>
        <Form>
          <InputGroup>
            <Form.Control as="textarea" aria-label="With textarea" />
          </InputGroup>
        </Form>
      </Modal.Body>
      <Button variant="outline-danger">Cancel</Button>
      <Button variant="outline-success">Save</Button>
    </Modal>
  );
};

export default NotesModal;
