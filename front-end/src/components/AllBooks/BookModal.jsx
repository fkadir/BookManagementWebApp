import React from "react";
import { Modal, Button } from "react-bootstrap";

const BookModal = ({ modalShow, bookItem, onHide }) => {
  return (
    <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Book Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={bookItem.bookcover} alt="book cover" />
        <h4 className="book-title">{bookItem.bookTitle}</h4>
        <p className="authors">{bookItem.bookAuthors}</p>
        <p className="avg-rating">{bookItem.bookAvgRating}</p>
        <p className="description">{bookItem.bookDescription}</p>
      </Modal.Body>
    </Modal>
  );
};

export default BookModal;
