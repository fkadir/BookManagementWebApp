import React from "react";
import { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import BookCard from "../AllBooks/BookCard";

const MyBooksList = () => {
  const [backendData, setBackendData] = useState([]);

  const fetchData = (id) => {
    fetch(`http://localhost:9000/my-books/:id`)
      .then(
        //fetching data from api, based on the userID
        (response) => response.json() //getting the response from the api in json. i.e changing to array
      )
      .then((data) => {
        setBackendData(data); //setting backend data to data variable once gotten json
      });
  };

  return (
    <div>
      {/* testing book cards */}
      <div className="book-card-container">
        {<BookCard allBooks={backendData} />}
      </div>
    </div>
  );
};

export default MyBooksList;

//maaybeee the searchmybooks should be in here..? (like AllBooks)

// MyBookCard = () = > {
//      <bookcard>
//      personalRating
//      personalStatus
// }
