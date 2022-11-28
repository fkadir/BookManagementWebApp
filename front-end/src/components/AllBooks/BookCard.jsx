import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import BookModal from "./BookModal";

const BookCard = ({ allBooks }) => {
  const [modalShow, setModalShow] = useState(false);
  const [bookItem, setBookItem] = useState({});

  return (
    <>
      {allBooks.map((book, index) => {
        return (
          <>
            <div
              className="book-card"
              onClick={() => {
                setModalShow(true);
                setBookItem(book);
              }}
              key={index}
            >
              <h1> card title </h1>
              <img src={book.bookcover} alt="book cover" />
              <div className="card-info">
                <h3 className="book-title">{book.bookTitle}</h3>
                <p className="authors">{`By ${book.bookAuthors}`}</p>
                <p className="avg-rating">{book.bookAvgRating}</p>
              </div>
            </div>
            <BookModal
              modalShow={modalShow}
              bookItem={bookItem}
              onHide={() => setModalShow(false)}
            />
          </>
        );
      })}
    </>
  );
};

export default BookCard;
