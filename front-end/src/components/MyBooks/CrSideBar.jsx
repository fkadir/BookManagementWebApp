import React, { useState, useEffect } from "react";
import BookCard from "../AllBooks/BookCard";
import "../AllBooks/books.css";

/* Component: displays Currently Reading in the side bar of the main page */
//filter by status
const CrSideBar = () => {
  const [CR, setCR] = useState([]);
  const getCR = () => {
    getUser().then((data) => {
      const userID = data;
      const status = "Currently Reading";
      fetch(`http://localhost:3100/myBooks?status=${status}&user=${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setCR(data);
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
    getCR();
  });

  if (CR.length > 0) {
    return (
      <div className="cr-sidebar">
        <h3>Currently Reading</h3>
        <>
          {CR.map((book, index) => {
            return (
              <>
                <img
                  className="bookcover"
                  src={book.bookCover}
                  alt="book cover"
                />
                <div className="card-info">
                  <p className="book-title">{book.bookTitle}</p>
                  <p className="authors">{book.bookAuthors}</p>
                  <p className="avg-rating">{book.bookAvgRating}</p>
                </div>
              </>
            );
          })}
        </>
      </div>
    );
  } else {
    return (
      <div className="cr-sidebar">
        <h3>Currently Reading</h3>
        <p> You are currently reading no books. Shame on you!</p>
      </div>
    );
  }
};

export default CrSideBar;
