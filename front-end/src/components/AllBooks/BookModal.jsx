import React from "react";
import { Modal, Button } from "react-bootstrap";

/* modal of full book details (i.e a pop up of books details when you click the BookCard) */
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
        <h6 className="book-subtitle">{bookItem.Subtitle}</h6>
        <p className="authors">{bookItem.bookAuthors}</p>
        <p className="avg-rating">{bookItem.bookAvgRating}</p>
        <p className="description">{bookItem.bookDescription}</p>
        <p className="publisher">{bookItem.publisher}</p>
        <p className="publisher-date">{bookItem.publisherDate}</p>
        <p className="genre">{bookItem.bookGenre}</p>
      </Modal.Body>
    </Modal>
  );
};

export default BookModal;
