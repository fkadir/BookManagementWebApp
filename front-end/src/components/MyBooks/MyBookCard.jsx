import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BookCard from "../AllBooks/BookCard";
import MyBooks from "../../pages/MyBooks.jsx";
import NotesModal from "../MyBooks/NotesModal";
import "../AllBooks/books.css";
import ReadingStatusDropdown from "../StatusDropdown";
// import ReactStars from "react-rating-stars-component";

const MyBookContainerCard = (props) => {
  const [notesModalShow, setNotesModalShow] = useState(false);

  const starRating = () => {};

  return (
    <>
      {props.myBooksData.map((book, index) => {
        return (
          <>
            <div className="book-card-container">
              <Button variant="danger">Danger</Button>
              <BookCard book={book} />
              {/* to do */}
              <ReadingStatusDropdown
                bookID={book.bookID}
                bookTitle={book.bookTitle}
                bookAuthors={book.bookAuthors}
                bookAvgRating={book.bookAvgRating}
              />
              <Button
                className="btnn"
                onClick={() => {
                  setNotesModalShow(true);
                }}
              >
                Notes
              </Button>
              {/* Invoke Notes Modal */}
              <NotesModal
                book={book}
                className="notes"
                modalShow={notesModalShow}
                onHide={() => setNotesModalShow(false)}
              ></NotesModal>
            </div>
          </>
        );
      })}
    </>
  );
};

export default MyBookContainerCard;
