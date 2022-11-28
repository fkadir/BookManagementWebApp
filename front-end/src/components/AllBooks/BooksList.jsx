import React from "react";
import { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import BookCard from "./BookCard";
// import { FaStar } from "react-icons/fa";

/* Component: displays all the books in the main page */

const BooksList = () => {
  const [backendData, setBackendData] = useState([]);
  // const [searchBooksResults, setSearchBooksResults] = useState([]);
  // const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  // const [bookData, setBookData] = useState([]);

  // /*search book */
  // const searchBook = (evt) => {
  //   if (evt.key === "Enter") {
  //     fetch(`http://localhost:9000/books/`)
  //       .then(
  //         //fetching data from api port 9000
  //         (response) => (response.json()) //getting the response from the api in json. i.e changing to array
  //       )
  //       .then((data) => {
  //         setBackendData(data); //setting backend data to data variable once gotten json
  //       });
  //   }
  // };

  /* fetch books data */
  const fetchData = (currentPage) => {
    fetch(`http://localhost:9000/books/${currentPage}`)
      .then(
        //fetching data from api port 9000
        (response) => response.json() //getting the response from the api in json. i.e changing to array
      )
      .then((data) => {
        setBackendData(data); //setting backend data to data variable once gotten json
      });
  };

  /* handle current page */
  const [currentPage, setCurrentPage] = useState(0); //tracking the page

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]); //fetch data when current page changes

  const handleMoreClick = () => {
    setCurrentPage(currentPage + 1); //increments page
  };

  /* display to user */
  return (
    <div>
      <h1 className="booklist-title"> All Books</h1>

      {/* search bar */}
      <Form className="d-flex">
        <Form.Control
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // onKeyPress={searchBook}
          placeholder="Search for book"
          className="me-2"
          aria-label="Search"
        />
        {/* <Button variant="outline-success" onClick={handleSearch}>
          Search
        </Button> */}
      </Form>

      {/* testing book cards */}
      <div className="book-card-container">
        {<BookCard allBooks={backendData} />}
      </div>

      <div>
        <Button onClick={handleMoreClick}>More...</Button>
      </div>
    </div>
  );
};

export default BooksList;
