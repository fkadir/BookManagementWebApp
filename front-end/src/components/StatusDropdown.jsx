import { Dropdown } from "react-bootstrap/";

/* reading status dropwdown component - to read, currently reading, read*/
const ReadingStatusDropdown = (props) => {
  const ReadingStatusHandler = (
    bookID,
    bookTitle,
    bookAuthors,
    status,
    bookAvgRating,
    bookCover,
    bookSubtitle,
    bookDescription
  ) => {
    getUser().then((data) => {
      const userID = data;
      fetch(`http://localhost:3100/myBooks`, {
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
          cover: bookCover,
          subtitle: bookSubtitle,
          description: bookDescription,
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
      <Dropdown.Toggle className="btnn" id="dropdown-basic">
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
              props.bookAvgRating,
              props.bookCover,
              props.bookSubtitle,
              props.bookDescription
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
              props.bookAvgRating,
              props.bookCover,
              props.bookSubtitle,
              props.bookDescription
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
              props.bookAvgRating,
              props.bookCover,
              props.bookSubtitle,
              props.bookDescription
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
