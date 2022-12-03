import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import BookModal from "./BookModal";

/* card with book preview and invokes a modal with full book details */
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
              //show modal on when card is clicked
              onClick={() => {
                setModalShow(true);
                setBookItem(book);
              }}
              key={index}
            >
              <img src={book.bookcover} alt="book cover" />
              <div className="card-info">
                <h3 className="book-title">{book.bookTitle}</h3>
                <p className="authors">{book.bookAuthors}</p>
                <p className="avg-rating">{book.bookAvgRating}</p>
              </div>
            </div>
            {/*invoke book details modal*/}
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
