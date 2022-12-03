import { Dropdown, DropdownButton } from "react-bootstrap/";
import axios from "axios";
import useState from "react";

const ReadingStatusDropdown = (props) => {
  const ReadingStatusHandler = (
    bookID,
    bookTitle,
    bookAuthors,
    status,
    bookAvgRating
  ) => {
    getUser().then((data) => {
      const userID = data;
      fetch(`http://localhost:3100/myBooks?user=${userID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userID,
          bookDataId: bookID,
          title: bookTitle,
          author: bookAuthors,
          status: status,
          rating: bookAvgRating,
        }),
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

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Reading Status
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            ReadingStatusHandler(
              props.bookID,
              props.bookTitle,
              props.bookAuthors,
              "toRead",
              props.bookAvgRating
            );
          }}
        >
          To Read
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            ReadingStatusHandler(
              props.bookID,
              props.bookTitle,
              props.bookAuthors,
              "Currently Reading",
              props.bookAvgRating
            );
          }}
        >
          Currently Reading
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            ReadingStatusHandler(
              props.bookID,
              props.bookTitle,
              props.bookAuthors,
              "Read",
              props.bookAvgRating
            );
          }}
        >
          Read
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ReadingStatusDropdown;
