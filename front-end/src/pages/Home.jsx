import CrSideBar from "../components/MyBooks/CrSideBar";
import BooksList from "../components/AllBooks/BooksList";
// import SearchAllBooks from "../components/AllBooks/SearchAllBook";

function Home() {
  return (
    <div>
      <CrSideBar />
      {/* <SearchAllBooks /> */}
      <BooksList />
    </div>
  );
}

export default Home;
