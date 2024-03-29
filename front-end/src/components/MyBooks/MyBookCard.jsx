import BookCard from "../AllBooks/BookCard";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const MyBookContainerCard = (props) => {
  const [search, setSearch] = useState("");

  // search bar for the user to search a book in their "my books"
  return (
    <div className="book-card-container">
      <Form className="d-flex">
        <Form.Control
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for book title"
          className="me-2"
          id="search"
          aria-label="Search"
        />
      </Form>
      <Button className="btnn" onClick={() => props.refreshFunction(search)}>
        {" "}
        {/* when this gets called, goes back to MyBooks; and calls FetchData*/}
        Search
      </Button>

      {/* show user books & delete button (so they can remove a book from "my books" */}
      <BookCard
        allBooks={props.myBooksData}
        showDelete={true}
        refreshFunction={props.refreshFunction}
      />
    </div>
  );
};

export default MyBookContainerCard;
