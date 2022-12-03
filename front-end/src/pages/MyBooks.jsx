// import MyBooksList from "../components/MyBooks/MyBooksList";
import React from "react";
import { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import BookCard from "../components/AllBooks/BookCard";
import ReadingStatusDropdown from "../components/StatusDropdown";
// import MyBookContainerCard from "./MyBookCard";

/* User's books functionality */
const MyBooks = () => {
  const [myBooksData, setMyBooksData] = useState([]);

  //fetch data
  const fetchData = () => {
    fetch(`http://localhost:9000/my-books/`)
      .then(
        //fetching data from api, based on the userID
        (response) => response.json() //getting the response from the api in json. i.e changing to array
      )
      .then((data) => {
        setMyBooksData(data); //setting backend data to data variable once gotten json
      });
  };

  return (
    <div>
      <div>Search + Filter</div>
      {/* testing book cards */}
      <div className="book-card-container">
        {<BookCard allBooks={myBooksData} />}
        BookCard
      </div>

      {/* personal note: these should go into MyBookCard????? */}
      <div>Personal Rating </div>
      <div>
        <ReadingStatusDropdown />
      </div>
      <div>Notes = modal??</div>
    </div>
  );
};

export default MyBooks;
