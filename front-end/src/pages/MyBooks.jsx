import React from "react";
import { useState, useEffect } from "react";
import BookCard from "../components/AllBooks/BookCard";
import ReadingStatusDropdown from "../components/StatusDropdown";
import { Form, Button } from "react-bootstrap";
import MyBookContainerCard from "../components/MyBooks/MyBookCard";

// import MyBookContainerCard from "./MyBookCard";

/* User's books functionality */
const MyBooks = (props) => {
  const [myBooksData, setMyBooksData] = useState([]);

  // fetch user data
  const fetchData = () => {
    getUser().then((data) => {
      const userID = data;
      fetch(`http://localhost:3100/myBooks?user=${userID}`, {
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
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /*search & filter */

  return (
    <div>
      {/* testing book cards */}
      <div className="book-card-container">
        {/* {<BookCard allBooks={myBooksData} />} */}
        {/* BookCard */}
      </div>

      <div>
        <MyBookContainerCard myBooksData={myBooksData} />
      </div>
      <div>
        <ReadingStatusDropdown />
      </div>
    </div>
  );
};

export default MyBooks;
