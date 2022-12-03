import React from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import BookModal from "./BookModal";
import NotesModal from "../MyBooks/NotesModal";
import "./books.css";

/* card with book preview and invokes a modal with full book details */
const BookCard = ({ allBooks }) => {
  const [bookModalShow, setBookModalShow] = useState(false);
  const [notesModalShow, setNotesModalShow] = useState(false);
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

            {/* <Button
              className="btnn"
              onClick={() => {
                setNotesModalShow(true);
                setBookItem(book);
              }}
            >
              Notes
            </Button>
            Invoke Notes Mddal 
            <NotesModal
              modalShow={notesModalShow}
              bookItem={bookItem}
              onHide={() => setNotesModalShow(false)}
            ></NotesModal> */}
          </>
        );
      })}
    </>
  );
};

export default BookCard;
