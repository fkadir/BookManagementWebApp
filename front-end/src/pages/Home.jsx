import CrSideBar from "../components/MyBooks/CrSideBar";
import BooksList from "../components/AllBooks/BooksList";
import "../components/AllBooks/books.css";

function Home() {
  return (
    <div className="comps">
      <CrSideBar />
      <BooksList />
    </div>
  );
}

export default Home;
