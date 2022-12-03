import BookCard from "../AllBooks/BookCard";
import MyBooks from "../../pages/MyBooks.jsx";
// import ReactStars from "react-rating-stars-component";

const MyBookContainerCard = (props) => {
  const starRating = () => {};
  return (
    <div className="book-card-container">
      <BookCard allBooks={props.myBooksData} />
    </div>
  );
};

export default MyBookContainerCard;
