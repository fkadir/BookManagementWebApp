import React from "react";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
// import { FaStar } from "react-icons/fa";

/* Component: displays all the books in the main page */

const BooksList = () => {
  const [backendData, setBackendData] = useState([]);

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

  const [currentPage, setCurrentPage] = useState(0); //tracking the page

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]); //fetch data when current page changes

  const handleMoreClick = () => {
    setCurrentPage(currentPage + 1); //increments page
  };

  // displays all books in cards
  return (
    <div>
      <h1 className="booklist-title"> All Books</h1>
      <div>
        {backendData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          backendData.map((allBooks) => (
            <Card border="secondary">
              <Card.Body>
                <Card.Img variant="left" src={allBooks.bookcover} />
                <Card.Title className="title">{`Title: ${allBooks.bookTitle}`}</Card.Title>
                <Card.Subtitle className="authors">{`Authors: ${allBooks.bookAuthors}`}</Card.Subtitle>
                <Card.Text className="avg-rating">
                  {" "}
                  {`Average Rating: ${allBooks.bookAvgRating}`}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
      <div>
        <Button onClick={handleMoreClick}>More...</Button>
      </div>
    </div>
  );
};

export default BooksList;
