import React from "react";
import { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import BookCard from "./BookCard";
import "./books.css";

/* Component: displays all the books in the main page */

const BooksList = () => {
  const [backendData, setBackendData] = useState([]);
  // const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");

  /* fetch all books data */
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
    const ScrollTop = () => {
      //scroll to the top of the page
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
  };

  /* handle book search */
  const handleSearch = () => {
    fetch(`http://localhost:9000/books/search/${search}`)
      .then(
        //fetching data from api port 9000
        (response) => response.json() //getting the response from the api in json. i.e changing to array
      )
      .then((data) => {
        setBackendData(data); //setting backend data to data variable once gotten json
      });
  };

  // const ScrollTop = () => {
  //   //scroll to the top of the page
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // };

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
          placeholder="Search for book title"
          className="me-2"
          id="search"
          aria-label="Search"
        />
        <Button className="btnn" onClick={handleSearch}>
          Search
        </Button>
      </Form>

      {/* show cards */}
      <div className="book-card-container">
        {<BookCard allBooks={backendData} />}
      </div>

      <div>
        <Button className="btnn" onClick={handleMoreClick}>
          More...
        </Button>
      </div>
    </div>
  );
};

export default BooksList;
