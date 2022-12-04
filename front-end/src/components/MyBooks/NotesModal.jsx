import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Form, Modal, Button, InputGroup } from "react-bootstrap";

/* modal of full book details (i.e a pop up of books details when you click the BookCard) */
const NotesModal = ({ modalShow, book, onHide }) => {
  const [notes, setNotes] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [newNote, setNewNote] = useState(false);

  const { register, handleSubmit, reset, formState } = useForm();

  async function getNotes() {
    try {
      const res = await fetch(
        `http://localhost:3100/mynotes?user=${book.userId}&book=${book.bookId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.json());
      return res;
    } catch (error) {
      setStatusMessage("Error has occured");
    }
  }

  function onSubmit(input) {
    try {
      if (newNote) {
        const body = {
          userId: book.userId,
          bookDataId: book.bookId,
          notes: input.newNote,
        };
        console.log(body, "here");
        fetch(`http://localhost:3100/mynotes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      } else {
        //update note
        const body = { notes: input.newNote };
        fetch(
          `http://localhost:3100/mynotes?user=${book.userId}&book=${book.bookId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (!data.acknowledged) throw "";
          });
      }
    } catch (error) {
      setStatusMessage("Something went wrong saving your notes");
    }
  }

  useEffect(() => {
    getNotes().then((data) => {
      if (data.msg === "newNote") {
        setNewNote(true);
      } else {
        setNotes(data.notes);
        setStatusMessage(data.msg);
      }
    });
  });

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
        <Form>
          <InputGroup>
            <Form.Control
              defaultValue={notes}
              as="textarea"
              aria-label="With textarea"
              name="newNotes"
              {...register("newNote")}
            />
          </InputGroup>
          <Button
            className="btnn"
            onClick={() => {
              handleSubmit(onSubmit);
              onHide();
            }}
          >
            Save
          </Button>
        </Form>
      </Modal.Body>
      <Alert variant={statusMessage ? "danger" : null}> {statusMessage}</Alert>
    </Modal>
  );
};

export default NotesModal;
