import React from "react";
import { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import BookCard from "../components/AllBooks/BookCard";
import ReadingStatusDropdown from "../components/StatusDropdown";
// import MyBookContainerCard from "./MyBookCard";

/* User's books functionality */
const MyBooks = () => {
  const [myBooksData, setMyBooksData] = useState([]);

  //fetch data
  const fetchData = () => {
    getUser().then((data) => {
      const userID = data;
      fetch(`http://localhost:3100/mybooks?user=${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(
          //fetching data from api, based on the userID
          (response) => response.json() //getting the response from the api in json. i.e changing to array
        )
        .then((data) => {
          //not sure how you want to format the data, so this is a start
          console.log(data);
          setMyBooksData(data); //setting backend data to data variable once gotten json
        });
    });
  };

  async function getUser() {
    try {
      const res = await fetch(`http://localhost:3100/users/isUserAuth`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((response) => response.json());
      return res.id;
    } catch (error) {
      //error handling
    }
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <div>Search + Filter</div>
      {/* testing book cards */}
      <div className="book-card-container">
        {<BookCard allBooks={myBooksData} />}
        {/* BookCard */}
      </div>

      {/* personal note: these should go into MyBookCard????? */}
      <div>Personal Rating </div>
      <div>
        <ReadingStatusDropdown />
      </div>
    </div>
  );
};

export default MyBooks;
