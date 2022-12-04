import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import BookModal from "./BookModal";
import NotesModal from "../MyBooks/NotesModal";
import ReadingStatusDropdown from "../StatusDropdown";
import "./books.css";

/* card with book preview and invokes a modal with full book details */
const BookCard = (props) => {
  const [bookModalShow, setBookModalShow] = useState(false);
  const [notesModalShow, setNotesModalShow] = useState(false);
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
                src={book.bookCover}
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
              bookID={book.bookId}
              bookTitle={book.bookTitle}
              bookSubtitle={book.bookSubtitle}
              bookAuthors={book.bookAuthors}
              bookAvgRating={book.bookAvgRating}
              bookDescription={book.bookDescription}
              bookCover={book.bookCover}
            />
            <Button
              className="btnn"
              onClick={() => {
                setNotesModalShow(true);
                setBookItem(book);
              }}
            >
              Notes
            </Button>
            {/* Invoke Notes Modal */}
            <NotesModal
              modalShow={notesModalShow}
              bookItem={bookItem}
              onHide={() => setNotesModalShow(false)}
            ></NotesModal>
          </>
        );
      })}
    </>
  );
};

export default BookCard;
