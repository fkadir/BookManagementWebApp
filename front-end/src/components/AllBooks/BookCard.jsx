import React from "react";
import { useState } from "react";
import BookModal from "./BookModal";
import ReadingStatusDropdown from "../StatusDropdown";
import "./books.css";

/* card with book preview and invokes a modal with full book details */
const BookCard = (props) => {
  const [bookModalShow, setBookModalShow] = useState(false);
  const [bookItem, setBookItem] = useState({});

  return (
    <>
      {props.allBooks.map((book, index) => {
        return (
          <>
            <div
              className="book-card"
              //show modal when card is clicked
              onClick={() => {
                setBookModalShow(true);
                setBookItem(book);
              }}
              key={index}
            >
              <img
                className="bookcover"
                src={book.bookcover}
                alt="book cover"
              />
              <div className="card-info">
                <h3 className="book-title">{book.bookTitle}</h3>
                <p className="authors">{book.bookAuthors}</p>
                <p className="avg-rating">{book.bookAvgRating}</p>
              </div>
            </div>
            {/*invoke book details modal*/}
            <BookModal
              modalShow={bookModalShow}
              bookItem={bookItem}
              onHide={() => setBookModalShow(false)}
            />
            <ReadingStatusDropdown
              bookID={book.bookID}
              bookTitle={book.bookTitle}
              bookAuthors={book.bookAuthors}
              bookAvgRating={book.bookAvgRating}
            />
          </>
        );
      })}
    </>
  );
};

export default BookCard;
