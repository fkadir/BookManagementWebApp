import React from "react";
import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import MyBookContainerCard from "../components/MyBooks/MyBookCard";

/* User's books functionality */
const MyBooks = (props) => {
  const [myBooksData, setMyBooksData] = useState([]);
  const [userID, setUserID] = useState(null);

  // fetch books based on user ID
  const fetchData = (title) => {
    getUser().then((data) => {
      const userID = data;
      let apiRoute = `http://localhost:3100/myBooks?user=${userID}`;

      // If the user is searching by title; add it to the query
      if (title) {
        apiRoute += `&title=${title}`;
      }

      // getting books based on the the userID and title
      fetch(apiRoute, {
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
          setMyBooksData(data);
        });
    });
  };

  //filter by status
  const filterStatusHandler = (newStatus) => {
    getUser().then((data) => {
      const userID = data;
      fetch(
        `http://localhost:3100/myBooks?status=${newStatus}&user=${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setMyBooksData(data);
        });
    });
  };

  //getting user
  async function getUser() {
    try {
      if (userID) {
        return userID;
      }

      const res = await fetch(`http://localhost:3100/users/isUserAuth`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }).then((response) => response.json());

      setUserID(res.id);

      return res.id;
    } catch (error) {
      //error handling
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* filter by status */}
      <Dropdown>
        <Dropdown.Toggle className="btnn" id="dropdown-basic">
          Filter by Reading Status
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              filterStatusHandler("toRead");
            }}
          >
            To Read
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              filterStatusHandler("Currently Reading");
            }}
          >
            Currently Reading
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              filterStatusHandler("Read");
            }}
          >
            Read
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <MyBookContainerCard
        myBooksData={myBooksData}
        refreshFunction={fetchData} //the function that gets called on referesh
        userID={userID}
      />
    </div>
  );
};

export default MyBooks;
