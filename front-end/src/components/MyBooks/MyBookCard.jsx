import BookCard from "../AllBooks/BookCard";
import MyBooks from "../../pages/MyBooks.jsx";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const MyBookContainerCard = (props) => {
  const [search, setSearch] = useState("");

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
        Search
      </Button>

      <BookCard
        allBooks={props.myBooksData}
        showDelete={true}
        refreshFunction={props.refreshFunction}
      />
    </div>
  );
};

export default MyBookContainerCard;
