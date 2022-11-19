import React from "react";
import { useState, useEffect } from "react";

function BooksList() {
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

  return (
    <>
      <div>
        {backendData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          backendData.map((allBooks) => (
            <table>
              <tr className="item">
                <td className="title">{`Title: ${allBooks.bookTitle}`}</td>
                <td className="authors">{`Authors: ${allBooks.bookAuthors}`}</td>
                <td className="avg-rating">{`Average Rating: ${allBooks.bookAvgRating}`}</td>
              </tr>
            </table>
          ))
        )}
      </div>
      <div>
        <button onClick={handleMoreClick}>More...</button>
      </div>
    </>
  );
}

export default BooksList;
