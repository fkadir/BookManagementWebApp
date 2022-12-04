import React from "react";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import BookModal from "./BookModal";
import ReadingStatusDropdown from "../StatusDropdown";
import "./books.css";

/* card with book preview & invokes a modal with full book details */
const BookCard = (props) => {
  const [bookModalShow, setBookModalShow] = useState(false);
  const [bookItem, setBookItem] = useState({});

  /* delete handler for deleting a book in my books, using the DB book id */
  const deleteBook = (id) => {
    fetch(`http://localhost:3100/myBooks/${id}`, { method: "DELETE" }).then(
      () => props.refreshFunction()
    );
  };

  return (
    <>
      {props.allBooks.map((book, index) => {
        return (
          <>
            <Card
              className="text-left"
              border="secondary"
              style={{ width: "auto" }}
            >
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
                <div className="card-info pad-left">
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
              {/* invoke reading status drop down*/}
              <ReadingStatusDropdown
                bookID={book.bookId}
                bookTitle={book.bookTitle}
                bookSubtitle={book.bookSubtitle}
                bookAuthors={book.bookAuthors}
                bookAvgRating={book.bookAvgRating}
                bookDescription={book.bookDescription}
                bookCover={book.bookCover}
              />
              {/* delete button to remove a book from "my books" */}
              {props.showDelete && (
                <Button
                  className="btnn"
                  onClick={() => {
                    deleteBook(book.id);
                  }}
                >
                  Delete
                </Button>
              )}
            </Card>
          </>
        );
      })}
    </>
  );
};

export default BookCard;
