import { Form, Button } from "react-bootstrap/";
import { useState } from "react";

const SearchAllBooks = () => {
  const [searchBooksResults, setSearchBooksResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchBooks = (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      fetch("http://localhost:9000/books")
        .then((response) => response.json())
        .then((data) => {
          setSearchBooksResults(data);
        });
    } catch (err) {
      // Remediation logic
      setErrorMessage("There was an error searching for the book");
    }
  };

  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search for book"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-success" onClick={<handSearch />}>
        Search
      </Button>
    </Form>
  );
};

export default SearchAllBooks;
