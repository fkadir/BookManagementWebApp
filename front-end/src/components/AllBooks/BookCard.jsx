import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ReadingStatusDropdown from "../StatusDropdown";
import BookModal from "./BookModal";

/* card with book preview and invokes a modal with full book details */
const BookCard = (props) => {
  const [bookModalShow, setBookModalShow] = useState(false);
  const [bookItem, setBookItem] = useState({});

  return (
    <div>
      <div
        className="book-card"
        //show modal when card is clicked
        onClick={() => {
          setBookModalShow(true);
          setBookItem(props.book);
        }}
      >
        {/* optional chaining due to undefined properties = online */}
        <img
          className="bookcover"
          src={props.book.bookcover}
          alt="book cover"
        />
        <div className="card-info">
          <h3 className="book-title">{props.book.bookTitle}</h3>
          <p className="authors">{props.book.bookAuthors}</p>
          <p className="avg-rating">{props.book.bookAvgRating}</p>
        </div>
      </div>
      {/* invoke book details modal */}
      <BookModal
        modalShow={bookModalShow}
        bookItem={bookItem}
        onHide={() => setBookModalShow(false)}
      />
      <ReadingStatusDropdown />
    </div>
  );
};

export default BookCard;
