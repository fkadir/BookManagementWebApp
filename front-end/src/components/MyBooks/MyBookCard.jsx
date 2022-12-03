import BookCard from "../AllBooks/BookCard";
import MyBooks from "../../pages/MyBooks.jsx";

const MyBookContainerCard = (props) => {
  return (
    <div className="book-card-container">
      <BookCard allBooks={props.myBooksData} />
    </div>
  );
};

export default MyBookContainerCard;
