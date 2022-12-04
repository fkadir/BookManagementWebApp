import BookCard from "../AllBooks/BookCard";
import MyBooks from "../../pages/MyBooks.jsx";
import { Button } from "react-bootstrap";
// import ReactStars from "react-rating-stars-component";

const MyBookContainerCard = (props) => {
  return (
    <div className="book-card-container">
      <BookCard
        allBooks={props.myBooksData}
        showDelete={true}
        refreshFunction={props.refreshFunction}
      />
    </div>
  );
};

export default MyBookContainerCard;
